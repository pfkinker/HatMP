﻿//Modification
//hormone level: 75!!
//sissy transform: 95!!

//add false transformations - like got an inch shorter / feet shrunk / skin smoother / hair more radiant, hair is finer
var room28 = {};
room28.main = function () {
    let transformationOrder = [0, 1, 2, 3, 4, 24, 7, 11, 16, 5, 8, 12, 17, 25, 13, 18, 21, 6, 9, 23, 14, 19, 10, 15, 20, 22];
    let sissySchoolDream = false;
    var pjRoom = [7, 10]
    if (pjRoom.includes(g.pass)) {
        cl.wearSavedOutfit(5);
    }
    missy.daily();
    var i;
    var hormoneLevel;

    cl.c.cumface = false;

    menu.save("HatMP_9", true);
    if (g.dt.getHours() > 6)
        g.dt.setDate(g.dt.getDate() + 1);
    g.dt = new Date(g.dt.getFullYear(), g.dt.getMonth(), g.dt.getDate(), 7, 0, 0, 0);
    nav.buildclock();

    var txtDisplay = room28.dreams();
    var chastityTransformation = false;
    let trasnformationSetting = null;
    let breastSelect, assSelect;
    breastSelect = [11, 12, 13, 14, 15];
    assSelect = [16, 17, 18, 19, 20];
    cl.hairgrowth();
    var maxE = gv.get("maxenergy");
    var thisautohormone, hix, tix;
    tix = daily.get("tookHormonePill");
    //var sissyTrans = gv.get("oncase");
    var arousal, energyIndex;
    var message;
    var milkLevel;
    
    for (i = 0; i < gv.st.length; i++) {
        switch (gv.st[i].n) {
            case "energy":
                energyIndex = i;
                //gv.st[i].t = Math.floor(maxE * .75);
                break;
            case "arousal":
                arousal = gv.st[i].t;
                break;
            case "hormone":
                hix = i;
                hormoneLevel = gv.st[i].t;
                if (gv.st[i].t > 15)
                    gv.st[i].t -= 2;
                break;
            case "breastSelect":
                breastSelect.splice(gv.st[i].t);
                break;
            case "assSelect":
                assSelect.splice(gv.st[i].t);
                break;
            case "autohormone":
                thisautohormone = gv.st[i].t;
                break;
            case "pill":
                if (gv.st[i].t !== null) {
                    gv.st[i].t = null;
                }
                break;
            case "milk":
                milkLevel = gv.st[i].t;
                break;
            case "transformation":
                trasnformationSetting = gv.st[i].t;
                break;
            case "beer":
                gv.st[i].t = 0;
                break;
            case "sissySchoolDream":
                sissySchoolDream = gv.st[i].t;
                break;
        }
    }
    
    //cl.c.butthole -= .05;
    //if (cl.c.butthole < 0)
    //    cl.c.butthole = 0;
    //energy as propotion to horny
    if (arousal > 90) {
        gv.st[energyIndex].t = maxE * .5;
        message = "You're so horny you didn't recover much energy. ";
    }
    else if (arousal > 50) {
        gv.st[energyIndex].t = maxE * .75;
        message = "You're starting to get horny and are a little restless.";
    }
    else {
        gv.st[energyIndex].t = maxE;
        message = "You got a good night's sleep. ";
    }
    g.popUpNotice(message);

    //growhair
    var initHairGrowth = 4;
    if (hormoneLevel > 50)
        initHairGrowth += Math.floor(hormoneLevel / 12) - 2;
    if (initHairGrowth < 5)
        initHairGrowth = 5;

    if (isNaN(cl.c.lastHairCut))
        cl.c.lastHairCut = 0;
    cl.c.lastHairCut += initHairGrowth;

    if (cl.c.lastHairCut > 99) {
        if (cl.c.hairLength === null)
            cl.c.hairLength = 0;
        else if (cl.c.hairLength < 4)
            cl.c.hairLength++;
        cl.c.lastHairCut = 0;
    }

    //milk
    if (milkLevel > -1) {
        var levelsMilk = levels.get("milk").l;
        var levelMult = 1 + ((levelsMilk + 1) / 5);
        milkLevel += ((hormoneLevel / 100) / 5) * levelMult;
        if (milkLevel > 1)
            milkLevel = 1;
        else if (milkLevel < 0)
            milkLevel = 0;

        gv.set("milk", milkLevel);
        cl.display();
    }


    //chastity
    if (cl.c.cock < 5) {
        if (cl.c.chastity !== null) {
            var minDick = 0;
            switch (cl.c.chastity) {
                case "pink": minDick = 1; break;
                case "pinkx2": minDick = 2; break;
                case "metal": minDick = 3; break;
                case "flat": minDick = 4; break;
            }
            if (cl.c.cock < minDick) {
                var chastityCounter = gv.get("chastityCounter");
                if (chastityCounter > 20) {
                    chastityTransformation = true;
                }
                else {
                    if (hormoneLevel > 75)
                        gv.mod("chastityCounter", 3);
                    else
                        gv.mod("chastityCounter", 2);
                }
            }
        }
        else {
            gv.mod("chastityCounter", -1);
        }
    }

    daily.newday();
    room28.future();

    if (thisautohormone) {
        var hx = inv.getIndex("hormone");
        if (inv.master[hx].count > 0) {
            inv.master[hx].count--;
            if (inv.master[hx].count < 1) {
                inv.master[hx].entry = false;
                inv.master[hx].count = 0;
            }
            gv.st[hix].t += 30;
            if (gv.st[hix].t > 100)
                gv.st[hix].t = 100;
            daily.set("tookHormonePill");
            g.popUpNotice("Took your hormone pill" + (inv.master[hx].entry ? "" : " - Out of pills"));
        }
    }

    //start events
    if (sissy.st[0].ach && !sissySchoolDream) {
        gv.set("sissySchoolDream", true);
        nav.kill();
        nav.bg("28_transformation/q_background.jpg");
        nav.button({
            "type": "clickthrough",
            "name": "xd",
            "left": 0,
            "top": 0,
            "width": 1920,
            "height": 1080,
            "title": "xdress",
            "image": "28_transformation/q_forground.png"
        }, 28);
        for (i = 0; i < qdress.st.length; i++) {
            let qdressIconx = qdress.st[i].ach ? qdress.st[i].icon : qdress.st[i].icon + "_x";
            nav.button({
                "type": "btn",
                "name": "qxdress_" + qdress.st[i].id,
                "left": qdress.st[i].x,
                "top": qdress.st[i].y,
                "width": i === 3 ? 200 : 100,
                "height": i === 3 ? 200 : 100,
                "title": "xdress",
                "image": "28_transformation/" + qdressIconx + ".png"
            }, 28);
        }
        chat(23, 28);
        return;
    }
    else if (!qdress.st[0].ach && cl.hasClothingTypeSex("panties", "f")) {
        nav.kill();
        qdress.st[0].ach = true;
        if (cl.hasClothing("panties", "w")) {
            nav.bg("28_transformation/d_panties.jpg");
        }
        else if (cl.hasClothing("panties", "missy")) {
            nav.bg("28_transformation/d_panties_missy.jpg");
        }
        else if (cl.hasClothing("panties", "j")) {
            nav.bg("28_transformation/d_panties_janice.jpg");
        }
        else if (cl.hasClothing("panties", "c")) {
            nav.bg("28_transformation/d_panties_landlord.jpg");
        }
        else {
            nav.bg("28_transformation/d_panties_bill.jpg");
        }
        chat(28, 28);
        return;
    }
    else if (chastityTransformation) {
        nav.killall();
        gv.set("chastityCounter", 0);
        cl.c.cock++;
        nav.bg("28_transformation/cock_" + cl.c.cock + ".gif");
        cl.display();
        g.roomTimeout = setTimeout(function () {
            if (cl.c.cock === 4)
                chat(17, 28);
            else if (cl.c.cock === 1)
                chat(20, 28);
            else if (cl.c.chastity === "flat")
                chat(18, 28);
            else
                chat(19, 28);
        }, 6000);
        return;
    }
    if (cl.c.chest === 0 && levels.st[12].l > 0) {
        chat(0, 28);
        return;
    }
    else if (!txtDisplay && sissy.st[0].ach) {
        //check Transformation
        let transformationPoints = levels.get("xdress").l;
        let validTransformationHormone = hormoneLevel > 75;
        if (transformationPoints > 0 && cl.c.chest > 0) {
            let validForcedTransformation = false;

            if (trasnformationSetting === "forced") {
                for (let i = 0; i < transformationOrder.length; i++) {
                    if (!qdress.st[transformationOrder[i]].ach) {
                        if (transformationOrder[i] > 10 && transformationOrder[i] < 16) {
                            if (breastSelect.includes(transformationOrder[i]))
                                validForcedTransformation = true;
                        }
                        else if (transformationOrder[i] > 15 && transformationOrder[i] < 21) {
                            if (assSelect.includes(transformationOrder[i]))
                                validForcedTransformation = true;
                        }
                        else
                            validForcedTransformation = true;

                        if (validForcedTransformation) {
                            if (qdress.st[transformationOrder[i]].p <= transformationPoints) {
                                if ((qdress.st[transformationOrder[i]].h && validTransformationHormone) || !qdress.st[transformationOrder[i]].h) {
                                    room28.btnclick("qgrow_" + transformationOrder[i]);
                                    return;
                                }
                                else {
                                    g.popUpNotice("Need to increase your Sissy Hormones.");
                                }
                            }
                            i = 999;
                            break;
                        }
                    }
                }
                room28.endSleepyTime(true);
            }
            else if (trasnformationSetting === "voluntary") {
                qdress.stx = new Array();
                qdress.getPoints(0, transformationPoints, validTransformationHormone);
                for (let i = qdress.stx.length - 1; i > 0; i--) {
                    if (breastSelect.includes(qdress.stx[i]) || assSelect.includes(qdress.stx[i])) {
                        qdress.stx.splice(i, 1);
                    }
                }
                if (qdress.stx.length > 0) {
                    nav.button({
                        "type": "img",
                        "name": "xd",
                        "left": 0,
                        "top": 0,
                        "width": 1920,
                        "height": 1080,
                        "title": "xdress",
                        "image": "28_transformation/q_background.jpg"
                    }, 28);
                    for (i = 0; i < qdress.st.length; i++) {
                        var qdressIcon = qdress.st[i].ach ? qdress.st[i].icon : qdress.st[i].icon + "_x";
                        nav.button({
                            "type": "btn",
                            "name": "qxdress_" + qdress.st[i].id,
                            "left": qdress.st[i].x,
                            "top": qdress.st[i].y,
                            "width": i === 3 ? 200 : 100,
                            "height": i === 3 ? 200 : 100,
                            "title": "xdress",
                            "image": "28_transformation/" + qdressIcon + ".png"
                        }, 28);
                    }
                    nav.button({
                        "type": "btn",
                        "name": "qquit",
                        "left": 1434,
                        "top": 64,
                        "width": 100,
                        "height": 100,
                        "image": "28_transformation/q_quit.png"
                    }, 28);

                    nav.button({
                        "type": "clickthrough",
                        "name": "xd",
                        "left": 0,
                        "top": 0,
                        "width": 1920,
                        "height": 1080,
                        "title": "xdress",
                        "image": "28_transformation/q_forground.png"
                    }, 28);

                    if (hormoneLevel < 75) {
                        nav.t({
                            type: "img",
                            name: "noop",
                            left: 850,
                            top: 500,
                            font: 40,
                            hex: "#def8ff",
                            text: "Estrogen level low. "
                        }, 28);
                        if (!qdress.st[15].ach) {
                            nav.t({
                                type: "img",
                                name: "noop",
                                left: 850,
                                top: 550,
                                font: 20,
                                hex: "#def8ff",
                                text: "Progress in the game till you can take the FEM 201 Sissy Class"
                            }, 28);
                        }
                        else {
                            nav.t({
                                type: "img",
                                name: "noop",
                                left: 850,
                                top: 550,
                                font: 20,
                                hex: "#def8ff",
                                text: "Take your pills sissy"
                            }, 28);
                        }
                    }
                    return;
                }
                else {
                    room28.endSleepyTime(true);
                }
            }
        }
        
    }
    room28.endSleepyTime(true);
};

room28.future = function () {
    let i;
    for (i = 0; i < future.st.length; i++) {
        future.st[i].daysleft--;
        if (future.st[i].daysleft < 1) {
            switch (future.st[i].name) {
                case "janicevacation":
                    sc.completeMission("dog", "vacation", true);
                    break;
                case "envytest":
                    if (sc.getMissionTask("envy", "gf", 6).notStarted) {
                        sc.completeMission("envy", "gf", false);
                        sc.completeMissionTask("envy", "gf", 6, false);
                        sc.startMission("envy", "breakup");
                        sc.completeMissionTask("envy", "breakup", 0, true);
                    }
                    break;
                case "practiceDate0":
                    sc.completeMissionTask("lola", "date", 1);
                    break;
                case "j-mike": gv.set("janiceDatr", "mike"); break;
                case "j-jarome": gv.set("janiceDatr", "jarome"); break;
                case "j-jabari": gv.set("janiceDatr", "jabari"); break;
                case "j-brad": gv.set("janiceDatr", "brad"); break;
                case "lolaboy":
                    sc.completeMissionTask("lola", "sissy", 5, false);
                    sc.completeMission("lola", "tom", false); 
                    break;
                case "case_dam":
                    if (missy.get("activeCaseComplete") === 0) {
                        missy.set("activeCaseComplete", 2);
                    }
                    break;
                case "sissyfinal":
                    if (gv.get("sissyfinal_pageant") === null)
                        gv.set("sissyfinal_pageant", false);
                    break;
            }
            future.st.splice(i, 1);
        }
    }
};

room28.dreams = function () {
    var getFirstDream = null;
    var hasText = false;
    if (dreams.st.length > 0) {
        getFirstDream = dreams.st[0];
        dreams.st.splice(0, 1);
    }
    if (g.dt.getDay() === 6 && sc.getMissionTask("landlord", "talk", 1).complete) {
        nav.bg("28_transformation/dream_spermbank.jpg");
    }
    if (g.dt.getDay() === 6 && sc.getMissionTask("bigguy", "rent", 0).complete) {
        gv.mod("pastRent", 75);
    }
    else if (getFirstDream !== null) {
        switch (getFirstDream) {
            case "work":
                if (gv.get("jobapplyconst") === 0) {
                    nav.bg("28_transformation/dream_job.jpg");
                }
                else {
                    nav.bg("28_transformation/dream_job2.jpg");
                }
                break;
            case "firstTimeInPanties":
                nav.bg("28_transformation/dream_firstTimeInPanties.jpg");
                hasText = true;
                chat(15, 28);
                break;
            case "dream_landlordHandjob":
                nav.bg("28_transformation/dream_landlordHandjob.jpg");
                hasText = true;
                chat(16, 28);
                break;
        }
    }
    else {
        if (g.pass === 502) {
            nav.bg("502_bedroom/sleepZoey.jpg");
            if (cl.c.chest > 2)
                nav.bg("502_bedroom/sleep_f.jpg");
            else
                nav.bg("502_bedroom/sleep_m.jpg");
        }
        else if (g.pass === 13)
            nav.bg("28_transformation/twin.jpg");
        else if (g.pass === 301)
            nav.bg("301_living/envy159.jpg");
        else if (g.pass === 701)
            nav.bg("701_hospitalroom/sleep.jpg");
        else if (g.pass === 181)
            nav.bg("181_black/bondage101_12.jpg");
        else if (g.pass === 318)
            nav.bg("28_transformation/318.jpg");
        else if (g.pass === 225)
            nav.bg("28_transformation/225.jpg");
        else if (g.pass === 376)
            nav.bg("28_transformation/376.jpg");
    }
    //console.log(hasText);
    return hasText;
};

room28.endSleepyTime = function (hasTimeout) {
    let returnRoomID = g.pass;
    g.pass = "endSleepyTime";

    if (hasTimeout) {
        g.roomTimeout = setTimeout(function () {
            char.room(returnRoomID);
        }, 1800);
    }
    else {
        char.room(returnRoomID);
    }
};

room28.btnclick = function (name) {
    let tText = "";
    let xline;
    let xtop = 600 * g.ratio;
    let xleft = 1634 * g.ratio;
    let xwidth = 271 * g.ratio;
    if (name === "qquit") {
        nav.button({
            "type": "img",
            "name": "bigDisplay",
            "left": 1645,
            "top": 153,
            "width": 250,
            "height": 400,
            "image": "28_transformation/qquit.png"
        }, 28);

        //qquit
        tText += '<img src="./images/room/28_transformation/qquit_close.png" class="room-btn rom-event" data-name="qquit_confirm" data-room="28" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (10 * g.ratio) + 'px;" />';

        tText += '<div class="char-20" style="font-size: ' + 20 * g.ratio + 'px; margin-top: ' + (50 * g.ratio) + 'px;">' +
            "Close and hide until you turn it back on in the settings. " +
            '</div>';

        tText += '<img src="./images/room/28_transformation/qquit_off.png" class="room-btn rom-event" data-name="qquit_hide" data-room="28" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (20 * g.ratio) + 'px;" />';

        xline = '<div class="room-img" data-name="bigDisplay" data-room="28" style="top:' + xtop + 'px; left:' + xleft + 'px; width:' + xwidth + 'px; color: #ffffff; text-align:center;" >' + tText + '</div>';

        $('#room-buttons').append(xline);
        //room28.endSleepyTime(false);
    }
    else if (name === "qquit_confirm") {
        room28.endSleepyTime(false);
    }
    else if (name === "qquit_hide") {
        gv.set("transformation", "voluntaryoff");
        room28.endSleepyTime(false);
    }
    else if (name.startsWith("qxdress_")) {
        var id = parseInt(name.replace("qxdress_", ""));
        var points = levels.get("xdress").l
        var parentAch = null;
        tText = "";
        
        if (qdress.st[id].pId !== null) {
            parentAch = qdress.st[qdress.st[id].pId].ach ? null : qdress.st[qdress.st[id].pId].name;
        }
        nav.killbutton("bigDisplay");

        nav.button({
            "type": "img",
            "name": "bigDisplay",
            "left": 1645,
            "top": 153,
            "width": 250,
            "height": 400,
            "image": "28_transformation/" + qdress.st[id].icon + "_d.png"
        }, 28);

        tText = '<div class="char-40" style="font-size: ' + 30 * g.ratio + 'px; margin-bottom:5px;">' + qdress.st[id].name + '</div><div class="char-20" style="font-size: ' + 20 * g.ratio + 'px;">' + qdress.st[id].desc + '</div>';
        tText += '<div class="char-20" style="color:#fedeff; font-size: ' + 20 * g.ratio + 'px;">' + qdress.st[id].p + (qdress.st[id].p === 1 ? " Point" : " Points") + '</div>';
        if (qdress.st[id].ach) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Completed</div>';
        }
        else if (parentAch !== null) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Need to complete: ' + parentAch + '</div>';
            //tText += '<img src="./images/room/210_classSelection/gotoclass.png" class="room-btn rom-event" data-name="classselect_' + id + '" data-room="210" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (20 * g.ratio) + 'px;" />';
        }
        else if (qdress.st[id].h && gv.get("hormone") < 75) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Need to raise Estrogen</div>';
        }
        else if (points < qdress.st[id].p) {
            tText += '<div style="color:#fedeff; font-size: ' + 25 * g.ratio + 'px; margin-top:' + (20 * g.ratio) + 'px;">Need ' + qdress.st[id].p + ' more ' + (qdress.st[id].p - points === 1 ? " Point" : " Points") + '</div>';
        }
        else {
            tText += '<img src="./images/room/28_transformation/q_grow.png" class="room-btn rom-event" data-name="qgrow_' + id + '" data-room="28" style="width:' + (271 * g.ratio) + 'px; height:' + (72 * g.ratio) + 'px; position:relative; margin-top:' + (20 * g.ratio) + 'px;" />';
        }
        xline = '<div class="room-img" data-name="bigDisplay" data-room="28" style="top:' + xtop + 'px; left:' + xleft + 'px; width:' + xwidth + 'px; color: #ffffff; text-align:center;" >' + tText + '</div>';
        $('#room-buttons').append(xline);
    }
    else if (name.startsWith("qgrow_")){
        var gid = parseInt(name.replace("qgrow_", ""));
        levels.st[1].l = levels.st[1].l - qdress.st[gid].p;
        qdress.st[gid].ach = true;
        switch (qdress.st[gid].icon) {
            case "qpanties":
                nav.killall();
                nav.bg("28_transformation/d_panties.jpg");
                chat(3, 28);
                break;
            case "qbra":
                nav.killall();
                nav.bg("28_transformation/d_bra.jpg");
                chat(4, 28);
                break;
            case "qdildo":
                nav.killall();
                nav.bg("28_transformation/d_dildo.jpg");
                chat(5, 28);
                break;
            case "qxdress":
                nav.killall();
                nav.bg("28_transformation/d_xdress.jpg");
                chat(6, 28);
                break;
            case "qearring":
                nav.killall();
                nav.bg("28_transformation/d_earring.jpg");
                chat(7, 28);
                break;
            case "qmakup":
                nav.killall();
                nav.bg("28_transformation/d_makeup.jpg");
                chat(8, 28);
                break;
            case "qtattoo":
                nav.killall();
                nav.bg("28_transformation/d_tattoo.jpg");
                chat(9, 28);
                break;
            case "qxdress1":
                nav.killall();
                nav.bg("28_transformation/d_xdress1.jpg");
                chat(11, 28);
                break;
            case "qxdress2":
                nav.killall();
                nav.bg("28_transformation/d_xdress2.jpg");
                chat(12, 28);
                break;
            case "qxdress3":
                nav.killall();
                nav.bg("28_transformation/d_xdress3.jpg");
                chat(13, 28);
                break;
            case "qxdress4":
                nav.killall();
                nav.bg("28_transformation/d_xdress4.jpg");
                chat(14, 28);
                break;
            case "qc2":
            case "qc3":
            case "qc4":
            case "qc5":
            case "qc6":
                nav.killall();
                cl.c.chest = parseInt(qdress.st[gid].icon.replace("qc", ""));
                nav.bg("28_transformation/chest_" + cl.c.chest + ".gif");
                cl.display();
                g.roomTimeout = setTimeout(function () {
                    room28.endSleepyTime(false);
                }, 6000);
                break;
            case "ql1":
            case "ql2":
            case "ql3":
            case "ql4":
            case "ql5":
                nav.killall();
                cl.c.leg = parseInt(qdress.st[gid].icon.replace("ql", ""));
                nav.bg("28_transformation/leg_" + cl.c.leg + ".gif");
                cl.display();
                g.roomTimeout = setTimeout(function () {
                    room28.endSleepyTime(false);
                }, 6000);
                break;
            case "qlip1":
            case "qlip2":
                nav.killall();
                cl.c.lips = parseInt(qdress.st[gid].icon.replace("qlip", ""));
                nav.bg("28_transformation/lip_" + cl.c.lips + ".gif");
                cl.display();
                g.roomTimeout = setTimeout(function () {
                    room28.endSleepyTime(false);
                }, 6000);
                
                break;
            case "qwhore":
                nav.killall();
                nav.bg("28_transformation/d_whore.jpg");
                chat(10, 28);
                break;
            case "qs":
                nav.killall();
                nav.bg("28_transformation/d_sed.jpg");
                chat(21, 28);
                break;
            case "qsed":
                nav.killall();
                nav.bg("28_transformation/d_stripper.jpg");
                chat(22, 28);
                break;
        }
    };
};

room28.chatcatch = function (callback) {
    switch (callback) {
        case "boobs":
            var tempChest = cl.c.chest + 1;
            if (tempChest < 7) {
                cl.c.chest = tempChest;
                nav.killall();
                nav.bg("28_transformation/chest_" + cl.c.chest + ".gif");
                g.roomTimeout = setTimeout(function () {
                    room28.endSleepyTime(false);
                }, 6000);
            }

            break;
        case "returnToRoom":
            char.room(g.pass);
            break;
        case "tinypp":
            nav.killall();
            cl.c.cock++;
            nav.bg("28_transformation/cock_" + cl.c.cock + ".gif");
            cl.display();
            g.roomTimeout = setTimeout(function () {
                room28.endSleepyTime(false);
            }, 6000);
            break;
        case "chest0":
            cl.c.chest = 1;
            nav.bg("28_transformation/chest_1.gif");
            cl.display();
            g.roomTimeout = setTimeout(function () {
                room28.endSleepyTime(false);
            }, 6000);
            break;
        case "endPills":
            gv.mod("energy", -100);
            scc.love("missy", 5);
            char.addtime(220);
            char.room(203);
            break;
        case "endDream":
            room28.endSleepyTime(false);
            break;
        case "sleepunlock":
            if (gv.get("transformation") === "forced") {
                chat(24, 28);
            }
            else if (gv.get("transformation") === "voluntary") {
                chat(26, 28);
            }
            else {
                chat(25, 28);
            }
            break;
        default:
            break;
    }
    
};

room28.chat = function (chatID) {
    if (chatID === 999) {
        return {
            chatID: 999,
            speaker: "me",
            text: "You've unlocked <span class='hl-pink'>" + g.sissy[g.internal].name + "</span>.",
            button: [
                { chatID: -1, text: "Sweet", callback: "returnToRoom" }
            ]
        };
    }
    else if (chatID > 999) {
        var thisChat = "";
        if (chatID === 1000)
            thisChat = "Take one of these experimental pills and you'll see some growth in your chest my little sissy in training.";
        else if (chatID === 1001)
            thisChat = "Take one of these experimental pills and you'll wake up with a more feminine butt my little sissy in training.";
        else if (chatID === 1002)
            thisChat = "So my little sissy in training wants to shrink their little clitty so they'll be forced to only use her " +
                "sissy pussy. Take this pill tonight my slut.";
        else
            thisChat = "You'll look so pretty with dick sucking lips! I'm so glad you know what a slut you are. ";
        return {
            chatID: 998,
            speaker: "missy",
            text: thisChat,
            button: [
                { chatID: 3, text: "Sweet", callback: "" }
            ]
        };
    }
    else {
        var cArray = [
            {
                chatID: 0,
                speaker: "me",
                text: "All that working out has given me a sexier body! Things " +
                    "are going to be changing for me! ",
                button: [
                    { chatID: -1, text: "You feel more in shape", callback: "chest0" }
                ]
            },
            {
                chatID: 1,
                speaker: "me",
                text: "Oh no! I can feel that pee pee shrinking cream working! My penis is getting smaller!",
                button: [
                    { chatID: -1, text: "[Shrink my pee pee]", callback: "tinypp" }
                ]
            },
            {
                chatID: 2,
                speaker: "me",
                text: "I must be dreaming.... I can feel as though my body wants to change.......",
                button: [
                    { chatID: -1, text: ".....", callback: "" }
                ]
            },
            {
                chatID: 3,
                speaker: "thinking",
                text: "I wonder what it feels like to wear panties. They're so soft and feminine. I wonder " +
                    "what I would look like if I was more girly. I bet I would make a hot chick. I would so love " +
                    "to have a dominate girlfriend. Maybe she dresses me up as her girlfriend. Maybe she'll make me " +
                    "wear her panties. I should try on some panties. Just to see what they feel like. I wonder where " +
                    "I can get some panties...",
                button: [
                    { chatID: -1, text: "[You can now wear panties]", callback: "endDream" }
                ]
            },
            {
                chatID: 4,
                speaker: "thinking",
                text: "I don't really feel like I belong in my own body. I really feel like I'm far too " +
                    "feminine for who I am, but I'm afraid to change. Maybe I should start wearing a bra. Just to " +
                    "see what it's like to be a secret girl. That's what I'll do. I'll make it a point to always wear " +
                    "a bra. ",
                button: [
                    { chatID: -1, text: "[If you have a bra you have to wear it]", callback: "endDream" }
                ]
            },
            {
                chatID: 5,
                speaker: "thinking",
                text: "I wonder what having a pussy feels like? It's so not fair that girls can have so " +
                    "many orgasms, but I only get one. I wonder if my butt can orgasm like a girl. They're " +
                    "both holes. I'll have to try it. Maybe I'll get a dildo. Something small and fun. Nothing " +
                    "crazy. I'm not a whore. ",
                button: [
                    { chatID: -1, text: "[You can buy dildos and plugs]", callback: "endDream" }
                ]
            },
            {
                chatID: 6,
                speaker: "thinking",
                text: "You know what! I'm tired of living a lie. I'm going to wear girly clothes. In " +
                    "public. Maybe I'll even buy clothes. But nothing too crazy. Pretty girly clothes. " +
                    "Are you ready world! Here I come. Maybe. ",
                button: [
                    { chatID: -1, text: "[You can buy and wear girly clothing]", callback: "endDream" }
                ]
            },
            {
                chatID: 7,
                speaker: "thinking",
                text: "I would really like some earrings. Maybe a cute little belly ring. I don't know. " +
                    "It would be so cute on me!",
                button: [
                    { chatID: -1, text: "[You can get piercings]", callback: "endDream" }
                ]
            },
            {
                chatID: 8,
                speaker: "thinking",
                text: "I REALLY need to look pretty! I should get some makeup! ",
                button: [
                    { chatID: -1, text: "[You can get makeup]", callback: "endDream" }
                ]
            },
            {
                chatID: 9,
                speaker: "thinking",
                text: "Tattoos are so hot. Words here ",
                button: [
                    { chatID: -1, text: "[You can get tattoos]", callback: "endDream" }
                ]
            },
            {
                chatID: 10,
                speaker: "thinking",
                text: "I need to get some cash. Perhaps I could do a little whoring on the street " +
                    "corner. 'cause I'm like a giant whore. and a slut. ",
                button: [
                    { chatID: -1, text: "[You can be a whore on the street corner]", callback: "endDream" }
                ]
            },
            {
                chatID: 11,
                speaker: "thinking",
                text: "Words here",
                button: [
                    { chatID: -1, text: "[You can wear sexy clothing]", callback: "endDream" }
                ]
            },
            {
                chatID: 12,
                speaker: "thinking",
                text: "Words here ",
                button: [
                    { chatID: -1, text: "[You can wear bimbo clothing]", callback: "endDream" }
                ]
            },
            {
                chatID: 13,
                speaker: "thinking",
                text: "Words here. bimbo whore slut bla bla  ",
                button: [
                    { chatID: -1, text: "[Bra and panties are optional]", callback: "endDream" }
                ]
            },
            {
                chatID: 14,
                speaker: "thinking",
                text: "Words here. bimbo whore slut bla bla  ",
                button: [
                    { chatID: -1, text: "[You can wear anything, or nothing]", callback: "endDream" }
                ]
            },
            {
                chatID: 15,
                speaker: "thinking",
                text: "That was so exhilarating wearing panties outside! I wonder if anyone " +
                    "could tell I was wearing them. I hope I didn't have panty lines. I " +
                    "did see that one girl looking at me strangely. I bet she knew. I wonder " +
                    "if she thinks I'm some sort of sick weird-o. Crap. She probably did think " +  
                    "I'm a pervert. ",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 16,
                speaker: "thinking",
                text: "Holy fuck that was hot. Her wet slippery tongue twisting around my mouth " +
                    "and tongue while she played with my dick. Fuck!! This is so wrong! I really " +
                    "shouldn't keep pushing it with my " + sc.n("landlord") + ". What would people " +
                    "think. I should stop. I'm taking advantage of her just so I can nut, but I don't " +
                    "know if I can stop. I need her. I need to be inside her.",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 17,
                speaker: "thinking",
                text: "Perfect, well almost. I no longer have a penis, I have a cute " +
                    "tiny sissy clitty. I'll never be able to penetrate anyone ever " +
                    "again with such a small clitty. ",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 18,
                speaker: "thinking",
                text: "I love this chastity cage! If I keep wearing it I'll have just a " +
                    "tiny little clitty where my penis once was. ",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 19,
                speaker: "thinking",
                text: "This chastity cage is so tight and I've been wearing it so long " +
                    "I can actually feel my penis literally shrinking. If I want to " +
                    "turn my penis into a real clit I need to get an even smaller cage!",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 20,
                speaker: "thinking",
                text: "Oh no! Wearing that tight cramped chastity cage shrunk my dick! " +
                    "At least my dick is still pretty big, and now there's more room in " +
                    "the cage. I better not get a small cage or it might just keep shrinking. ",
                button: [
                    { chatID: -1, text: "...", callback: "endDream" }
                ]
            },
            {
                chatID: 21,
                speaker: "thinking",
                text: "I'm really turning into a sexy girl. I bet some men even " +
                    "might even think I was born a girl. I bet I could totally " +
                    "secude a man that's only into girls....",
                button: [
                    { chatID: -1, text: "[You can now try to seduce men]", callback: "endDream" }
                ]
            },
            {
                chatID: 22,
                speaker: "thinking",
                text: "I would be so hot to strip in front of a bunch of horny men! They " +
                    "would want to touch me so bad, but they can't and empty their wallets " +
                    "just for the chance to smell me as I rub my ass all over them!",
                button: [
                    { chatID: -1, text: "[You can work at the strip club]", callback: "endDream" }
                ]
            },
            {
                chatID: 23,
                speaker: "thinking",
                text: "I'm so excited for this new school. I don't know what changes are coming, " +
                    "but I can feel my mind and body wanting to change to something I'm currently " +
                    "not. But I'm scared to change. ",
                button: [
                    { chatID: -1, text: "...", callback: "sleepunlock" }
                ]
            },
            {
                chatID: 24,
                speaker: "thinking",
                text: "As you gain sissy points you'll be able to trade them in to unlock " +
                    "achievements from this menu. When you sleep this menu will appear if you " +
                    "have enough points to unlock any choice. Just select the transformation you " +
                    "wish to unlock. ",
                button: [
                    { chatID: 27, text: "...", callback: "" }
                ]
            },
            {
                chatID: 25,
                speaker: "thinking",
                text: "As you gain sissy points you'll be able to trade them in to unlock " +
                    "achievements from this menu. When you sleep this menu will appear if you " +
                    "have enough points to unlock a choice. Your setting " +
                    "is currently set to OFF. You probably want to set that to ON.",
                button: [
                    { chatID: 27, text: "...", callback: "" }
                ]
            },
            {
                chatID: 26,
                speaker: "thinking",
                text: "You're currently set to auto transformation. So when you go to sleep, if " +
                    "you have enough points the transformations will happen on their own and you " +
                    "will naturally transform into the sissy slut you were meant to be. ",
                button: [
                    { chatID: 27, text: "...", callback: "" }
                ]
            },
            {
                chatID: 27,
                speaker: "thinking",
                text: "In the phone settings you can change how the transformations work at any time. " +
                    "To make your own choices set transformations to ON. To let the game decide swith it " +
                    "to AUTO. If you have all the transformations you want switch it to off. You can see your " +
                    "current status anytime by selecting your own avatar in your phone CHARACTERS page. ",
                button: [
                    { chatID: -1, text: "[Sissy transformations unlocked]", callback: "endDream" }
                ]
            },
            {
                chatID: 28,
                speaker: "thinking",
                text: "I can't believe I have panties! I know they're dirty, but that makes them " +
                    "so much better! I should wear them! I need to wear them out in public. But " +
                    "under my clothes so no one knows. It will be my little secret that no one " +
                    "will ever know about! I do so much love wearing girl panties!",
                button: [
                    { chatID: -1, text: "[Wearing panties in public is now unlocked]", callback: "endDream" }
                ]
            },
        ];
        if (cArray.length > chatID && chatID > -1)
            return cArray[chatID];
        else
            return [];
    }
};