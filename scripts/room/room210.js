﻿//Room name
var room210 = {};
room210.main = function () {
    if (!$('#room_left_map').is(":visible"))
        char.changeMenu("hide", false, true);
    var enrolled = gv.get("sissySchoolClass");
    $.each(sissy.st, function (i, v) {
        if (v.active) {
            if (i === 10 || i === 21) {
                nav.button({
                    "type": "btn",
                    "name": v.icon,
                    "left": 45 + (v.x * 130),
                    "top": 40 + (v.y * 130),
                    "width": 1530,
                    "height": 100,
                    "image": "210_classSelection/" + (v.icon) + "_u.png"
                }, 210);
            }
            else {
                nav.button({
                    "type": "btn",
                    "name": v.icon,
                    "left": 45 + (v.x * 130),
                    "top": 40 + (v.y * 130),
                    "width": i === 10 ? 1530 : 100,
                    "height": 100,
                    "image": "210_classSelection/" + (v.icon) + "_u.png"
                }, 210);
            }
            
            if (v.ach) {
                nav.button({
                    "type": "clickthrough",
                    "name": v.icon,
                    "left": i === 10 ? (45 + (5.5 * 130)) : (45 + (v.x * 130)),
                    "top": 40 + (v.y * 130),
                    "width": 100,
                    "height": 100,
                    "image": "210_classSelection/complete_over.png"
                }, 210);
            }
            else if (v.icon === enrolled) {
                nav.button({
                    "type": "clickthrough",
                    "name": v.icon,
                    "left": 45 + (v.x * 130),
                    "top": 40 + (v.y * 130),
                    "width": 100,
                    "height": 100,
                    "image": "210_classSelection/enrolled_over.png"
                }, 210);
            }
        }
    });
    nav.buildnav([211]);
    //if (gv.get("sissySchoolClass") !== null) {
    //    chat(998, 210);
    //}
};

room210.btnclick = function (name) {
    var currentclass = gv.get("sissySchoolClass");
    if (name.startsWith("classselect_")) {
        if (currentclass === null) {
            nav.killbutton(name);
            var selectedId = parseInt(name.replace("classselect_", ""));
            g.internal = selectedClass = sissy.st[selectedId];
            gv.set("sissySchoolClass", g.internal.icon);
            gv.set("sissySchoolClassDays", 0);
            chat(999, 210);
        }
        else {
            char.room(sissy.get(gv.get("sissySchoolClass")).room);
        }
    }
    else {
        var id, pid;
        var prevToUnlock = "";
        nav.killbutton("bigDisplay");
        nav.button({
            "type": "img",
            "name": "bigDisplay",
            "left": 1645,
            "top": 153,
            "width": 250,
            "height": 400,
            "image": "210_classSelection/" + name + ".jpg"
        }, 210);

        xtop = 600 * g.ratio;
        xleft = 1634 * g.ratio;
        xwidth = 271 * g.ratio;

        for (i = 0; i < sissy.st.length; i++) {
            if (sissy.st[i].icon === name) {
                id = i;
                i = 9999;
            }
        }
        if (id === 21) {//final
            let finalcounter = 0;
            for (i = 0; i < sissy.st.length; i++) {
                if (sissy.st[i].y === 5 && sissy.st[i].active && sissy.st[i].ach)
                    finalcounter++;
            }
            if (finalcounter === 1)
                prevToUnlock = "You need to take one more 400 level class.";
            else if (finalcounter === 0)
                prevToUnlock = "You need to take 2 400 level classes.";
        }
        else {
            for (i = 0; i < sissy.st[id].pID.length; i++) {
                pid = sissy.st[id].pID[i];
                if (!sissy.st[pid].ach) {
                    if (prevToUnlock === "")
                        prevToUnlock = sissy.st[pid].name;
                    else
                        prevToUnlock += ", " + sissy.st[pid].name;
                }
            }
        }

        tText = '<div class="char-40" style="font-size: ' + 30 * g.ratio + 'px; margin-bottom:5px;">' + sissy.st[id].name + '</div><div class="char-20" style="font-size: ' + 20 * g.ratio + 'px;">' + sissy.st[id].description + '</div>';

        if (sissy.st[id].ach) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Completed</div>';
        }
        else if (currentclass === sissy.st[id].icon) {
            tText += '<img src="./images/room/210_classSelection/gotoclass.png" class="room-btn rom-event" data-name="classselect_' + id + '" data-room="210" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (20 * g.ratio) + 'px;" />';
        }
        else if (currentclass !== null) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">You\'re currently enrolled in ' + sissy.get(gv.get("sissySchoolClass")).name + '</div>';
        }
        else if (prevToUnlock === "") {
            tText += '<img src="./images/room/210_classSelection/enroll.png" class="room-btn rom-event" data-name="classselect_' + id + '" data-room="210" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (20 * g.ratio) + 'px;" />';
        }
        else
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Need to<br/>Unlock<br/>' + prevToUnlock + '</div>';

        xline = '<div class="room-img" data-name="bigDisplay" data-room="28" style="top:' + xtop + 'px; left:' + xleft + 'px; width:' + xwidth + 'px; color: #ffffff; text-align:center;" >' + tText + '</div>';
        $('#room-buttons').append(xline);
    }
};

room210.chatcatch = function (callback) {
    switch (callback) {
        case "gotoclass":
            char.room(sissy.get(gv.get("sissySchoolClass")).room);
            break;
        default:
            break;
    }
};

room210.chat = function (chatID) {
    if (chatID === 999) {
        return {
            chatID: 0,
            speaker: "thinking",
            text: "So exicited. I just signed up for " + g.internal.name + "!",
            button: [
                { chatID: -1, text: "Go directly to class ", callback: "gotoclass" },
                { chatID: -1, text: "Keep looking around ", callback: "" }
            ]
        };
    }
    else if (chatID === 998) {
        g.internal = sissy.get(gv.get("sissySchoolClass"));
        return {
            chatID: 0,
            speaker: "thinking",
            text: "So exicited. I just signed up for " + g.internal.name + "!",
            button: [
                { chatID: -1, text: "Go directly to class ", callback: "gotoclass" },
                { chatID: -1, text: "Keep looking around ", callback: "" }
            ]
        };
    }
    else {
        var cArray = [
            {
                chatID: 0,
                speaker: "me",
                text: "",
                button: [
                    { chatID: 1, text: "", callback: "" }
                ]
            }
        ];
        if (cArray.length > chatID && chatID > -1)
            return cArray[chatID];
        else
            return [];
    }
};