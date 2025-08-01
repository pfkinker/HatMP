﻿var nav = {};

nav.setRatio = function () {
    var width = $(window).width();
    var height = $(window).height();
    g.setRatio();
    $('#room-videoBox').css({ height: height, width: width });
};

nav.buildRoom = function () {
    nav.killvideo();
    var vList = null;

    if (g.roomTimeout !== null) {
        clearTimeout(g.roomTimeout);
        g.roomTimeout = null;
    }
    if (g.roomTimeout2 !== null) {
        clearTimeout(g.roomTimeout2);
        g.roomTimeout2 = null;
    }
    $('#room-animationFront').html('');
    $('#room-animationStandby').html('');

    $.each(g.rooms, function (i, v) {
        if (v.roomID === g.roomID) {
            vList = v;
            return false;
        }
    });
    if (vList === null)
        g.error("nav.buildRoom_1", g.roomID);
    else {
        nav.bg(vList.image, vList.nightImage);

        $('#room-buttons').html("");
        $('#room_footer').html('');
        try {
            window[g.room(vList.roomID)]["main"]();
        }
        catch (ex) {
            console.log(ex);
            g.error("buildRoom function not found or prob in main", "roomID: " + vList.roomID);
        }
    }
    //$('#char_money').text('$' + gv.get("money"));
    nav.bars();
    nav.buildclock();
};

nav.killall = function () {
    if (g.roomTimeout !== null) {
        clearTimeout(g.roomTimeout);
        g.roomTimeout = null;
    }
    if (g.roomTimeout2 !== null) {
        clearTimeout(g.roomTimeout2);
        g.roomTimeout2 = null;
    }
    $('#room-buttons').html("");
    $('#room_footer').html("");
};

nav.kill = function () {
    if (g.roomTimeout !== null) {
        clearTimeout(g.roomTimeout);
        g.roomTimeout = null;
    }
    if (g.roomTimeout2 !== null) {
        clearTimeout(g.roomTimeout2);
        g.roomTimeout2 = null;
    }
    $('#room-buttons').html("");
};

nav.bg = function (image, night) {
    if (night === undefined)
        night = image;
    var gameWidth = 1920 * g.ratio;
    var gameHeight = 1080 * g.ratio;
    if (g.isNight())
        $('#room-background').html('<img src="./images/room/' + night + '" style="width:' + gameWidth + 'px; height:' + gameHeight + ';"/>');
    else
        $('#room-background').html('<img src="./images/room/' + image + '" style="width:' + gameWidth + 'px; height:' + gameHeight + ';"/>');
};

nav.button = function (btn, roomNum) {
    var top = btn.top * g.ratio;
    var left = btn.left * g.ratio;
    var btnWidth = btn.width * g.ratio;
    var btnHeight = btn.height * g.ratio;

    if (btn.type === "video") {
        $('#room-videoBox').show();
        $('#room-videoBox').find('div').css('width', btn.width + 'px');
        $('#room-video').html('<source src="./images/room/' + btn.image + '" type="video/mp4">').attr('autoplay', 'autoplay').attr('loop', 'loop');
        $('#room_closeVideo').data('name', btn.name).data('room', roomNum);
        $("#room-video")[0].load();
    }
    else {
        var classes = "room-img";
        var charAttr = "";
        var thisImage = btn.image;
        if (g.isNight() && (typeof btn.night !== "undefined"))
            thisImage = btn.night;

        if (btn.type === "dark")
            classes = "room-img img-dark";
        else if (btn.type === "btn")
            classes = "room-btn rom-event";
        else if (btn.type === "btnNoHover")
            classes = "room-btnNoHover rom-event";
        else if (btn.type === "kiss")
            classes = "room-btn-lips rom-event";
        else if (btn.type === "tongue")
            classes = "room-btn-tongue rom-event";
        else if (btn.type === "dick")
            classes = "room-btn-dick rom-event";
        else if (btn.type === "brush")
            classes = "room-btn-brush rom-event";
        else if (btn.type === "hand")
            classes = "room-btn-hand rom-event";
        else if (btn.type === "grab")
            classes = "room-btn-grab rom-event";
        else if (btn.type === "vib")
            classes = "room-btn-vib rom-event";
        else if (btn.type === "btnflat")
            classes = "room-btnflat room-btn rom-event";
        else if (btn.type === "zimg")
            classes = "room-img room-zindex";
        else if (btn.type === "zbtn")
            classes = "room-btn rom-event room-zindex";
        else if (btn.type === "btnhover")
            classes = "room-btn rom-event fight-hover";
        else if (btn.type === "imghover")
            classes = "room-img fight-hover-element";
        else if (btn.type === "clickthrough") {
            classes = "room-img click-thru";
        }
        if ("char" in btn)
            charAttr = ' data-char="' + btn.char + ' "';
        line = '<img src="./images/room/' + thisImage + '" class="' + classes + '" data-name="' + btn.name + '" data-room="' + roomNum + '" title="' + (("title" in btn) ? btn.title : "") + charAttr + '" style="width:' + btnWidth + 'px; height:' + btnHeight + 'px; top:' + top + 'px; left:' + left + 'px;" />';

        $('#room-buttons').append(line);
    }
    $('img').on('dragstart', function (event) { event.preventDefault(); });
};

nav.t = function (btn, roomNum) {
    var top = btn.top * g.ratio;
    var left = btn.left * g.ratio;

    var classes = "room-img";
    var thisHex = "#000000";
    if (g.isNight() && (typeof btn.night !== "undefined"))
        thisImage = btn.night;

    

    if (btn.type === "btn")
        classes = "room-btn rom-event";
    else if (btn.type === "kiss")
        classes = "room-btn-lips rom-event";
    else if (btn.type === "tongue")
        classes = "room-btn-tongue rom-event";
    else if (btn.type === "hand")
        classes = "room-btn-hand rom-event";
    else if (btn.type === "grab")
        classes = "room-btn-grab rom-event";
    else if (btn.type === "btnflat")
        classes = "room-btnflat room-btn rom-event";
    else if (btn.type === "zimg")
        classes = "room-img room-zindex";
    else if (btn.type === "zbtn")
        classes = "room-btn rom-event room-zindex";
    else if(btn.type === "btnhover")
        classes = "room-btn rom-event fight-hover";

    if (btn.font === 12)
        classes += " char-12 ";
    else if (btn.font === 20)
        classes += " char-20 ";
    if ("hex" in btn)
        thisHex = btn.hex;

    if (typeof btn.stroke !== "undefined") {
        if(btn.stroke === "white")
            classes += " txt-stroke-white";
        else
            classes += " txt-stroke-black";
    }

    line = '<div class="resize-font ' + classes + '" data-name="' + btn.name + '" data-room="' + roomNum + '" style="top:' + top + 'px; left:' + left + 'px; font-size: ' + btn.font * g.ratio + 'px; color: ' + thisHex + '; width: auto; height: auto;" >' + btn.text + '</div>';

    $('#room-buttons').append(line);

    
};

nav.tmod = function (name, text) {
    $(".resize-font[data-name='" + name + "']").text(text);
}

nav.inputbox = function (btn, roomNum) {
    var top = btn.top * g.ratio;
    var left = btn.left * g.ratio;
    var btnWidth = btn.width * g.ratio;
    var btnHeight = btn.height * g.ratio;
    var classes = "room-img";
    var charAttr = "";
    var thisImage = btn.image;
    if (g.isNight() && (typeof btn.night !== "undefined"))
        thisImage = btn.night;

    if (btn.type === "dark")
        classes = "room-img img-dark";
    else if (btn.type === "btn")
        classes = "room-btn rom-event";
    else if (btn.type === "btnNoHover")
        classes = "room-btnNoHover rom-event";
    else if (btn.type === "kiss")
        classes = "room-btn-lips rom-event";
    else if (btn.type === "tongue")
        classes = "room-btn-tongue rom-event";
    else if (btn.type === "brush")
        classes = "room-btn-brush rom-event";
    else if (btn.type === "hand")
        classes = "room-btn-hand rom-event";
    else if (btn.type === "grab")
        classes = "room-btn-grab rom-event";
    else if (btn.type === "btnflat")
        classes = "room-btnflat room-btn rom-event";
    else if (btn.type === "zimg")
        classes = "room-img room-zindex";
    else if (btn.type === "zbtn")
        classes = "room-btn rom-event room-zindex";
    else if (btn.type === "btnhover")
        classes = "room-btn rom-event fight-hover";
    else if (btn.type === "imghover")
        classes = "room-img fight-hover-element";

    line = '<input type="text" class="resize-font ' + classes + '" data-name="' + btn.name + '" data-room="' + roomNum + '" value="' + (("title" in btn) ? btn.title : "") + charAttr + '" style="width:' + btnWidth + 'px; height:' + btnHeight + 'px; top:' + top + 'px; left:' + left + 'px;" />';

    $('#room-buttons').append(line);
};

nav.modbutton = function (name, newImage, newName, newType) {
    if (newName === null)
        newName = name;
    if(newImage !== null)
        $('img[data-name="' + name + '"]').attr("src", "./images/room/" + newImage).attr("data-name", newName);
    else
        $('img[data-name="' + name + '"]').attr("data-name", newName);

    if (newType !== null) {
        $('img[data-name="' + name + '"]')
            .removeClass("room-btn")
            .removeClass("room-btn-grab")
            .removeClass("rom-event")
            .removeClass("rom-tongue")
            .removeClass("room-btn-lips");

        if (newType === "img")
            $('img[data-name="' + name + '"]').addClass("room-img");
        else if (newType === "btn")
            $('img[data-name="' + name + '"]').addClass("room-btn rom-event");
        else if (newType === "kiss")
            $('img[data-name="' + name + '"]').addClass("room-btn-lips rom-event");
        else if (newType === "tongue")
            $('img[data-name="' + name + '"]').addClass("room-btn-tongue rom-event");
    }
};

nav.flash = function (thisImage, length) {
    var btnWidth = 1920 * g.ratio;
    var btnHeight = 1080 * g.ratio;
    $('#room-buttons').append('<img src="./images/room/' + thisImage + '" class="room-img rom-event room-killFlash" data-name="zzzNOOPzzzIgnore" data-room="-9" style="width: ' + btnWidth + 'px; height: ' + btnHeight + 'px; top: 0px; left: 0px;" />');
    setTimeout(nav.killflash, length);
};

nav.killflash = function () {
    $('.room-killFlash').remove();
};

nav.killvideo = function () {
    $('#room-videoBox').hide();
    $('#room-video').html('').removeAttr('autoplay').removeAttr('loop');
    $('#room_closeVideo').data('name', '').data('room', '');
};

nav.killbutton = function (name) {
    $('[data-name="' + name + '"]').remove();
};

nav.killbuttonStartsWith = function (name) {
    $('[data-name^="' + name + '"]').remove();

};

nav.buildnav = function (roomIDList) {
    var i;
    if (!$('#room_footer').is(":visible") && !$(".room-speachGroup").is(":visible"))
        $('#room_footer').show();

    for (i = 0; i < roomIDList.length; i++) {
        $.each(g.rooms, function (j, u) {
            if (u.roomID === roomIDList[i]) {
                if ($('.room-changeRoomBtn[data-roomid="' + u.roomID + '"]').length === 0) {
                    var line = '<div class="room-changeRoomBtn" data-roomid="' + u.roomID + '"><img src="./images/room/navBtn/' + u.btn + '" /><span>' + u.name + '</span></div>';
                    $('#room_footer').append(line);
                }
                return false;
            }
        });
    }
};

nav.buildclock = function () {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var timeDiff = Math.abs(g.dt.getTime() - g.startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    $('#char_clock_time').text(nav.friendlyTime());
    $('#char_clock_dow').text("Day: " + diffDays + ", " + weekday[g.dt.getDay()]);
};
nav.twodigits = function (n) {
    return n < 10 ? '0' + n : n;
};

nav.friendlyTime = function () {
    if(gv.get("clock24") === "12"){
        var newHour = g.dt.getHours() === 0 ? 12 : (g.dt.getHours() < 13 ? g.dt.getHours() : g.dt.getHours() - 12);
        var ampm = g.dt.getHours() < 12 ? " AM" : " PM";
        return nav.twodigits(newHour) + ":" + nav.twodigits(g.dt.getMinutes()) + ampm;
    }
    else {
        return nav.twodigits(g.dt.getHours()) + ":" + nav.twodigits(g.dt.getMinutes());
    }
};

nav.convertTime = function (hour, minute) {

    if (gv.get("clock24") === "12") {
        var newHour = hour === 0 ? 12 : (hour < 13 ? hour : hour - 12);
        var ampm = hour < 12 ? " AM" : " PM";
        return newHour + ":" + nav.twodigits(minute) + ampm;
    }
    else {
        return hour + ":" + nav.twodigits(minute);
    }
};

nav.progressBar = function (btn, roomId) {
    let maxVal = btn.maxVal;
    let val = btn.val;
    let bgColor, fgColor;
    let classes = "room-img";
    if (val > maxVal)
        val = maxVal;
    if (val < 0)
        val = 0;

    let valPercentage = (val / maxVal) * btn.width;
    let bgCss = g.makeCss(btn.height, btn.width, btn.top, btn.left);
    let fgCss = g.makeCss(btn.height, valPercentage, btn.top, btn.left);
    switch (btn.color) {
        case "blue":
            bgColor = "#333333";
            fgColor = "#4E99E0";
            break;
        case "pink":
            bgColor = "#333333";
            fgColor = "#FF5ED1";
            break;
        case "purple":
            bgColor = "#333333";
            fgColor = "#CF25C9";
            break;
        case "bluepink":
            bgColor = "#4E99E0";
            fgColor = "#FF5ED1";
            break;
        case "green":
            bgColor = "#333333";
            fgColor = "#20C000";
            break;
        case "red":
            bgColor = "#333333";
            fgColor = "#e02626";
            break;
        default:
            bgColor = "#333333";
            fgColor = "#FF5ED1";
            break;
    }

    if (btn.type === "dark")
        classes = "room-img img-dark";
    else if (btn.type === "btn")
        classes = "room-btn rom-event";
    else if (btn.type === "btnNoHover")
        classes = "room-btnNoHover rom-event";
    else if (btn.type === "kiss")
        classes = "room-btn-lips rom-event";
    else if (btn.type === "tongue")
        classes = "room-btn-tongue rom-event";
    else if (btn.type === "dick")
        classes = "room-btn-dick rom-event";
    else if (btn.type === "brush")
        classes = "room-btn-brush rom-event";
    else if (btn.type === "hand")
        classes = "room-btn-hand rom-event";
    else if (btn.type === "grab")
        classes = "room-btn-grab rom-event";
    else if (btn.type === "vib")
        classes = "room-btn-vib rom-event";
    else if (btn.type === "btnflat")
        classes = "room-btnflat room-btn rom-event";
    else if (btn.type === "zimg")
        classes = "room-img room-zindex";
    else if (btn.type === "zbtn")
        classes = "room-btn rom-event room-zindex";
    else if (btn.type === "btnhover")
        classes = "room-btn rom-event fight-hover";
    else if (btn.type === "imghover")
        classes = "room-img fight-hover-element";
    else if (btn.type === "clickthrough") {
        classes = "room-img click-thru";
    }
    nav.killbutton(btn.name);
    $('#room-buttons').append('<div class="resize ' + classes + '" data-name="' + btn.name + '" data-room="' + roomId + '" style=" ' + bgCss + '  background: ' + bgColor + '; border-radius:100px;" ></div>');
    $('#room-buttons').append('<div class="resize ' + classes + '" data-name="' + btn.name + '" data-room="' + roomId + '" style=" ' + fgCss + '  background: ' + fgColor + '; border-radius:100px;" ></div>');
    if ("title" in btn) {
        nav.t({
            type: btn.type,
            name: btn.name,
            left: btn.left,
            top: btn.top - 25,
            font: 20,
            hex: ("titleColor" in btn ) ? btn.titleColor : "#ffffff",
            text: btn.title
        }, roomId)
    }
};

nav.bars = function () {
    var tempArousal = gv.get("arousal");
    var tempEnergy = gv.get("energy");
    $('#char-arousal').css('width', gv.get("arousal") + '%');
    $('#char-energy').css('width', Math.floor((tempEnergy / gv.get("maxenergy")) * 100) + '%');

    if (tempArousal < 25)
        $('#char-arousal-label').html("Not Horny");
    else if (tempArousal < 50)
        $('#char-arousal-label').html("A lil' Horny");
    else if (tempArousal < 75)
        $('#char-arousal-label').html("Horny");
    else
        $('#char-arousal-label').html("Hump Anything!");

    if (tempEnergy < 25)
        $('#char-energy-label').html("Dead Tired");
    else if (tempEnergy < 50)
        $('#char-energy-label').html("Getting Tired");
    else if (tempEnergy < 75)
        $('#char-energy-label').html("Fine");
    else
        $('#char-energy-label').html("Energized!");

};

nav.input = function (roomId, txt) {
    var xtop = 524;
    var xleft = 710;
    nav.button({
        "type": "img",
        "name": "char_input",
        "left": 0,
        "top": 0,
        "width": 1920,
        "height": 1080,
        "image": "1_startScreen/transblack.png"
    }, roomId);
    nav.t({
        type: "zimg",
        name: "char_input",
        left: (960 - (txt.length * 10)),
        top: xtop - 100,
        font: 20,
        hex: "#ffffff",
        text: txt
    }, roomId);
    nav.button({
        "type": "btn",
        "name": "char_input",
        "left": 50,
        "top": xtop + 100,
        "width": 1820,
        "height": 50,
        "image": "1_startScreen/enter.png"
    }, roomId);
    var xline = '<input type="text" id="nav_inputText" class="room-img" style="top:' + (xtop * g.ratio) + 'px; left:' + (xleft * g.ratio) + 'px; font-size: ' + 32 * g.ratio + 'px; width: ' + (500 * g.ratio) +'px; position:absolute;"/>';
    $('#room-buttons').append(xline);
}

nav.inputGet = function () {
    return $('#nav_inputText').val();
};

nav.inputKill = function () {
    nav.killbutton("char_input");
    $("#nav_inputText").remove();
};

nav.room = function (roomID) {
    char.room(roomID);
};

nav.suck = function (btnClickName) {
    nav.drawButton("1001_rand/suck.png", btnClickName);
};

nav.cancel = function (btnClickName) {
    nav.drawButton("1001_rand/cancel.png", btnClickName);
};

nav.close = function (btnClickName) {
    nav.drawButton("1001_rand/close.png", btnClickName);
};

nav.next = function (btnClickName) {
    nav.drawButton("1001_rand/next.png", btnClickName);
};

nav.back = function (btnClickName) {
    nav.drawButton("1001_rand/back.png", btnClickName);
};

nav.takeit = function (btnClickName) {
    nav.drawButton("1001_rand/takeit.png", btnClickName);
};

nav.cum = function (btnClickName) {
    nav.drawButton("1001_rand/cum.png", btnClickName);
};


nav.drawButton = function (image, btnClickName) {
    nav.button({
        "type": "zbtn",
        "name": btnClickName,
        "left": 1695,
        "top": 920,
        "width": 225,
        "height": 75,
        "image": image
    }, g.roomID);
};

nav.wait = function (btnClickName) {
    nav.button({
        "type": "zbtn",
        "name": btnClickName,
        "left": 1695,
        "top": 920,
        "width": 225,
        "height": 75,
        "image": "1001_rand/wait.png"
    }, g.roomID);
};