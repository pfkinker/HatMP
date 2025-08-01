﻿//Truth or Dare
var room23 = {};

room23.main = function () {
    room23.buildInternal();

    room23.drawLola("talk");
    room23.drawEva("sit");
    if (sc.getMissionTask("eva", "games", 2).notStarted) {
        sc.completeMissionTask("eva", "games", 2);
        sc.completeMissionTask("lola", "games", 2);
    }
    else {
        chat(38, 23);
    }
};

room23.nextTurn = function () {
    nav.killall();
    nav.bg("24_spinTheBottle/013_spinBG.jpg");
    if (g.internal.gamephase > 1) {
        gv.mod("arousal", 3);
    }

    if (g.internal.prevGamephase !== g.internal.gamephase) {
        g.internal.prevGamephase = g.internal.gamephase;
        g.internal.gamephaseCounter = 0;
    }
    g.internal.gamephaseCounter++;

    //var myDaresLeft = g.internal.myDare[g.internal.gamephase].length;
    var myTruthsLeft = g.internal.myTruth.length;
    var truthsLeft = g.internal.truths[g.internal.gamephase].length;
    var daresLeft = g.internal.dares[g.internal.gamephase].length;

    if (myTruthsLeft < 1 || truthsLeft < 1 || daresLeft < 1 || g.internal.gamephaseCounter > 15) {
        room23.drawLola("sit");
        room23.drawEva("talk");
        chat(122, 23);
        return;
    }

    if (g.internal.lolaWine === 0 || g.internal.evaWine === 0) {
        if (g.internal.lolaWine === 0) {
            room23.drawLola("talk");
            room23.drawEva("sit");
            chat(127, 23);
        }
        else {
            room23.drawLola("sit");
            room23.drawEva("talk");
            chat(126, 23);
        }
    }

    //keep lola and eva in the same phase
    if (g.internal.evaphase !== g.internal.lolaphase) {
        if (g.internal.nextTurn === "lola") {
            g.internal.nextTurn = "eva";
            g.internal.whoTurn = "lola";
            room23.drawLola("talk");
            room23.drawEva("sit");
            chat(3, 23);
        }
        else {
            g.internal.nextTurn = "lola";
            g.internal.whoTurn = "eva";
            room23.drawLola("sit");
            room23.drawEva("talk");
            chat(3, 23);
        }
    } //keep MC in same phase
    else if (g.internal.myphase !== g.internal.lolaphase) {
        
        g.internal.whoTurn = g.internal.nextTurn;
        g.internal.nextTurn = "me";
        g.internal.gamephase = g.internal.lolaphase;
        if (g.internal.whoTurn === "lola") {
            room23.drawLola("talk");
            room23.drawEva("sit");
        }
        else {
            room23.drawLola("sit");
            room23.drawEva("talk");
        }
        chat(117, 23);
    }
    else {
        g.internal.whoTurn = g.internal.nextTurn;
        g.internal.nextTurn = null;

        //determin if game can continue
        if (g.internal.whoTurn === "lola") {
            room23.drawLola("talk");
            room23.drawEva("sit");
            var evaNext = g.rand(0, 3) === 0;
            if (evaNext) {
                g.internal.nextTurn = "eva";
                chat(3, 23);
            }
            else {
                g.internal.nextTurn = "me";
                chat(4, 23);
            }
        }
        else if (g.internal.whoTurn === "eva") {
            room23.drawLola("sit");
            room23.drawEva("talk");
            var lolaNext = g.rand(0, 3) === 0;
            if (lolaNext) {
                g.internal.nextTurn = "lola";
                chat(3, 23);
            }
            else {
                g.internal.nextTurn = "me";
                chat(4, 23);
            }
        }
        else {
            room23.drawLola("sit");
            room23.drawEva("sit");
            sc.selectCancel("quitGame", .5);
        }
    }
};

room23.drawLola = function(position){
    nav.killbutton("lola");
    switch (position) {
        case "lolatalk":
        case "talk":
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_" + g.internal.lolaphase + "_t.png"
            }, 23);
            break;
        case "sit":
        case "lolasit":
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_" + g.internal.lolaphase + "_nt.png"
            }, 23);
            break;
        case "lolahappy":
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_" + g.internal.lolaphase + "_nt.png"
            }, 23);
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_happy.png"
            }, 23);
            break;
        case "lolasad":
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_" + g.internal.lolaphase + "_nt.png"
            }, 23);
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 1192,
                "top": 0,
                "width": 728,
                "height": 1071,
                "image": "24_spinTheBottle/sit_lola_sad.png"
            }, 23);
            break;
        case "twerk":
            nav.button({
                "type": "img",
                "name": "lola",
                "left": 1169,
                "top": 0,
                "width": 650,
                "height": 1080,
                "image": "24_spinTheBottle/twerk_lola.gif"
            }, 23);
            break;
        case "bothkiss":
            nav.button({
                "type": "btn",
                "name": "lola",
                "left": 283,
                "top": 24,
                "width": 1355,
                "height": 1056,
                "image": "24_spinTheBottle/kiss_" + g.internal.lolaphase + ".png"
            }, 23);
            break;
    }

    nav.killbutton("lolaWine");
    nav.button({
        "type": "img",
        "name": "lolaWine",
        "left": 1796,
        "top": 871,
        "width": 75,
        "height": 200,
        "image": "24_spinTheBottle/wine_" + g.internal.lolaWine + ".png"
    }, 13);
};

room23.drawEva = function (position) {
    nav.killbutton("eva");
    switch (position) {
        case "evatalk":
        case "talk":
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_" + g.internal.evaphase + "_t.png"
            }, 23);
            break;
        case "evasit":
        case "sit":
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_" + g.internal.evaphase + "_nt.png"
            }, 23);
            break;
        case "evascared":
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_" + g.internal.evaphase + "_nt.png"
            }, 23);
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_scared.png"
            }, 23);
            break;
        case "evagiggle":
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_" + g.internal.evaphase + "_nt.png"
            }, 23);
            nav.button({
                "type": "btn",
                "name": "eva",
                "left": 300,
                "top": 44,
                "width": 711,
                "height": 1036,
                "image": "24_spinTheBottle/sit_eva_giggle.png"
            }, 23);
            break;
        case "twerk":
            nav.button({
                "type": "img",
                "name": "lola",
                "left": 462,
                "top": 0,
                "width": 650,
                "height": 1080,
                "image": "24_spinTheBottle/twerk_eva.gif"
            }, 23);
            break;
        case "bothkiss":
            nav.killbutton("eva");
            break;
    }

    nav.killbutton("evaWine");
    nav.button({
        "type": "img",
        "name": "evaWine",
        "left": 1074,
        "top": 871,
        "width": 90,
        "height": 191,
        "image": "24_spinTheBottle/wine_" + g.internal.evaWine + ".png"
    }, 13);
};

room23.tord = function () {
    var doTruth = g.rand(0, 3) === 0;
    if (g.internal.lolaphase !== g.internal.evaphase)
        doTruth = false;

    else if (!(g.internal.whoTurn === "me" || g.internal.nextTurn === "me"))
        doTruth = true;

    else if (g.internal.nextTurn === "me" && !doTruth) {
        var mp = g.internal.gamephase;
        var darepointer = null;
        for (var gdare = 0; gdare < g.internal.myDare[mp].length; gdare++) {
            if (g.internal.whoTurn === "eva") {
                if (g.internal.myDare[mp][gdare].e !== null) {
                    darepointer = gdare;
                    break;
                }
            }
            else {
                if (g.internal.myDare[mp][gdare].l !== null) {
                    darepointer = gdare;
                    break;
                }
            }
        }
        if (darepointer === null)
            doTruth = true;
    }

    if (doTruth)
        chat(400, 23);
    else
        chat(401, 23);
};

room23.btnclick = function (name) {
    switch (name) {
        case "quitGame":
            nav.killbutton("quitGame");
            g.internal.nextTurn = "me";
            chat(128, 23); 
            break;
        case "eva":
            sc.modLevel("eva", 10, 6);
            g.internal.whoTurn = "me";
            g.internal.nextTurn = "eva";
            room23.drawEva("evasit");
            room23.drawLola("sit");
            nav.killbutton("quitGame");
            chat(3, 23);
            break;
        case "lola":
            sc.modLevel("lola", 10, 6);
            g.internal.whoTurn = "me";
            g.internal.nextTurn = "lola";
            room23.drawEva("evasit");
            room23.drawLola("sit");
            nav.killbutton("quitGame");
            chat(3, 23);
            break;
        case "t_0":
        case "t_1":
        case "t_2":
        case "t_3":
        case "t_4":
        case "t_5":
        case "t_6":
        case "t_7":
        case "t_8":
        case "t_9":
        case "t_10":
        case "t_11":
        case "t_12":
        case "t_13":
            for (i = 0; i < 14; i++)
                nav.killbutton("t_" + i);
            nav.killbutton("tordbg");
            g.internal.gamepointer = parseInt(name.replace("t_", ""));
            chat(999, 23);
            break;
        case "d_0":
        case "d_1":
        case "d_2":
        case "d_3":
        case "d_4":
        case "d_5":
        case "d_6":
        case "d_7":
        case "d_8":
        case "d_9":
        case "d_10":
        case "d_11":
            for (i = 0; i < 12; i++)
                nav.killbutton("d_" + i);
            nav.killbutton("tordbg");
            g.internal.gamepointer = parseInt(name.replace("d_", ""));
            chat(500, 23);
            break;
        case "nextTurn":
            room23.nextTurn();
            break;
        case "meDogtreat":
            nav.killbutton("meDogtreat");
            chat(109, 23);
            break;
        case "melicklola":
            nav.kill();
            switch (g.internal.reuseCounter) {
                case 0: nav.bg("24_spinTheBottle/melicklola1.jpg"); nav.next("melicklola"); break;
                case 1: nav.bg("24_spinTheBottle/melicklola2.jpg"); nav.next("melicklola"); break;
                case 2: nav.bg("24_spinTheBottle/melicklola3.jpg"); nav.next("melicklola"); break;
                case 3: nav.bg("24_spinTheBottle/013_spinBG.jpg"); room23.drawLola("talk"); room23.drawEva("sit"); chat(111, 23); break;
            }
            g.internal.reuseCounter++;
            break;
        case "melickbutthole":
            nav.kill();
            if (g.internal.reuseCounter === 0) {
                nav.bg("24_spinTheBottle/melickbutthole.jpg");
                nav.button({
                    "type": "tongue",
                    "name": "melickbutthole",
                    "left": 987,
                    "top": 428,
                    "width": 152,
                    "height": 152,
                    "image": "24_spinTheBottle/melickbutthole.png"
                }, 23);
            }
            else {
                nav.kill();
                nav.bg("24_spinTheBottle/melickbutthole1.jpg");
                chat(113, 23);
            }
            g.internal.reuseCounter++;
            break;
        default:
            break;
    }
};

room23.chatcatch = function (callback) {
    switch (callback) {
        case "resetbg":
            nav.bg("24_spinTheBottle/013_spinBG.jpg");
            break;
        case "killbutton":
            nav.killbutton("killbutton");
            break;
        case "myDare":
            if (g.internal.gamephase > g.internal.myphase) {
                if (g.internal.nextTurn === "lola")
                    room23.chatcatch("lolatalk evasit");
                else
                    room23.chatcatch("evatalk lolasit");
                chat(701, 23);
            }
            else {
                if (g.internal.nextTurn === "lola")
                    room23.chatcatch("lolatalk evasit");
                else
                    room23.chatcatch("evatalk lolasit");
                chat(702, 23);
            }
            break;
        case "killme":
            zcl.kill();
            break;
        case "nextTurn":
            room23.nextTurn();
            break;
        case "setPhaseNextTurn":
            if (g.internal.lolaphase > g.internal.evaphase) {
                g.internal.evaphase = g.internal.lolaphase;
            }
            else {
                g.internal.lolaphase = g.internal.evaphase;
            }
            room23.nextTurn();
            break;
        case "mestrip":
            switch (g.internal.myphase) {
                case -1:
                    //set initial phase
                    break;
                case 0:
                    cl.c.shirt = null;
                    cl.display();
                    if (cl.c.bra !== null) {
                        sc.modSecret("eva", 100);
                        sc.modSecret("lola", 100);
                        room23.chatcatch("lolasad evagiggle");
                        chat(84, 23);
                    }
                    else {
                        nav.kill();
                        nav.bg("24_spinTheBottle/meShirt.jpg");
                        chat(81, 23);
                    }
                    break;
                case 1:
                    cl.c.socks = null;
                    cl.c.shoes = null;
                    cl.c.pants = null;
                    cl.display();
                    if (cl.getEntry("panties", cl.c.panties).sex === "f") {
                        sc.modSecret("eva", 100);
                        sc.modSecret("lola", 100);
                        room23.chatcatch("lolasad evagiggle");
                        chat(85, 23);
                    }
                    else {
                        nav.kill();
                        nav.bg("24_spinTheBottle/mePants.jpg");
                        chat(82, 23);
                    }
                    break;
                case 2:
                    cl.c.panties = null;
                    cl.display();
                    if (cl.c.chastity !== null) {
                        sc.modSecret("eva", 100);
                        sc.modSecret("lola", 100);
                        room23.chatcatch("lolasad evagiggle");
                        chat(86, 23);
                    }
                    else {
                        nav.kill();
                        nav.bg("24_spinTheBottle/mebg.jpg");
                        zcl.displayMain(-600, 500, .3, "", false);
                        chat(87, 23);
                    }
                    break;
            }
            if (cl.c.shirt !== null) {
                g.internal.myphase = 0;
            }
            else if (cl.c.pants !== null) {
                g.internal.myphase = 1;
            }
            else if (cl.c.panties !== null) {
                g.internal.myphase = 2;
            }
            else {
                g.internal.myphase = 3;
            }
            break;
        case "truth":
            if (g.internal.whoTurn === "me") {
                nav.button({
                    "type": "img",
                    "name": "tordbg",
                    "left": 0,
                    "top": 0,
                    "width": 1920,
                    "height": 1080,
                    "image": "1001_rand/black_25.png"
                }, g.roomID);
                for (i = 0; i < g.internal.truths[g.internal.gamephase].length; i++) {
                    sc.select("t_" + i, "24_spinTheBottle/" + g.internal.truths[g.internal.gamephase][i].i + ".png", i);
                }
            }
            else {
                chat(800, 23);
            }
            break;
        case "dare":
            if (g.internal.whoTurn !== "me") {
                if (g.internal.lolaphase !== g.internal.evaphase) {
                    if (g.internal.whoTurn === "eva") {
                        switch (g.internal.evaphase) {
                            case 1: chat(37, 23); break;
                            case 2: chat(57, 23); break;
                            case 3: chat(71, 23); break;
                        }
                    }
                    else {
                        switch (g.internal.lolaphase) {
                            case 1: chat(34, 23); break;
                            case 2: chat(56, 23); break;
                            case 3: chat(66, 23); break;
                        }
                    }
                }
                else {
                    chat(851, 23);
                }
            }
            else {
                nav.button({
                    "type": "img",
                    "name": "tordbg",
                    "left": 0,
                    "top": 0,
                    "width": 1920,
                    "height": 1080,
                    "image": "1001_rand/black_25.png"
                }, g.roomID);
                for (i = 0; i < g.internal.dares[g.internal.gamephase].length; i++) {
                    sc.select("d_" + i, "24_spinTheBottle/" + g.internal.dares[g.internal.gamephase][i].i + ".png", i);
                }
            }
            break;
        case "secretOut":
            sc.modSecret("lola", 100);
            sc.modSecret("eva", 100);
            room23.drawEva("evagiggle");
            room23.drawLola("lolasad");
            chat(120, 23);
            break;
        case "lolatalk":
        case "lolasit":
        case "lolahappy":
        case "lolasad":
            room23.drawLola(callback);
            break;
        case "evatalk":
        case "evasit":
        case "evascared":
        case "evagiggle":
            room23.drawEva(callback);
            break;
        case "bothkiss":
            room23.drawLola(callback);
            room23.drawEva(callback);
            break;
        case "tord":
            room23.tord();
            break;
        case "dareKissOther":
            nav.killbutton("lola");
            nav.killbutton("eva");
            nav.button({
                "type": "img",
                "name": "lola",
                "left": 283,
                "top": 24,
                "width": 1355,
                "height": 1056,
                "image": "24_spinTheBottle/kiss_" + g.internal.gamephase + ".png"
            }, g.roomID);
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(26, 23);
            break;
        case "dareKissMe":
            nav.killbutton(g.internal.nextTurn);
            var kissMeLevel = g.internal.gamephase === 0 ? "0" : "1";
            nav.button({
                "type": "btn",
                "name": g.internal.nextTurn,
                "left": g.internal.nextTurn === "eva" ? 190 : 990,
                "top": 0,
                "width": 830,
                "height": 1080,
                "image": "24_spinTheBottle/dareKissMe_" + kissMeLevel + "_" + g.internal.nextTurn + ".png"
            }, 23);
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(26, 23);
            break;
        case "bjface":
            nav.killall();

            if (g.internal.nextTurn === "lola") {
                nav.bg("24_spinTheBottle/darebjface_lola.jpg");
                chat(52, 23);
            }
            else {
                nav.bg("24_spinTheBottle/darebjface_eva.jpg");
                chat(53, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);

            break;
        case "dareSpin1":
            nav.killall();
            nav.bg("24_spinTheBottle/dareSpin_" + g.internal.nextTurn + ".jpg");
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(28, 23);
            break;
        case "dareSmellArmpits":
            if (g.internal.nextTurn === "eva") {
                nav.killbutton("eva");
                nav.button({
                    "type": "img",
                    "name": "eva",
                    "left": 198,
                    "top": 0,
                    "width": 916,
                    "height": 1080,
                    "image": "24_spinTheBottle/pitsniff_eva.png"
                }, 23);
            }
            else {
                nav.killbutton("lola");
                nav.button({
                    "type": "img",
                    "name": "lola",
                    "left": 1040,
                    "top": 0,
                    "width": 880,
                    "height": 1080,
                    "image": "24_spinTheBottle/pitsniff_lola.png"
                }, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(39, 23);
            break;
        case "dareDrinkWine":
            if (g.internal.nextTurn === "lola") {
                g.internal.lolaWine--;
                nav.killbutton("lola");
                nav.button({
                    "type": "img",
                    "name": "lola",
                    "left": 1192,
                    "top": 0,
                    "width": 728,
                    "height": 1071,
                    "image": "24_spinTheBottle/sit_lola_" + g.internal.gamephase + "_drink.png"
                }, 13);
                //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
                nav.killbutton("lolaWine");
            }
            else {
                g.internal.evaWine--;
                nav.killbutton("eva");
                nav.button({
                    "type": "img",
                    "name": "eva",
                    "left": 300,
                    "top": 44,
                    "width": 711,
                    "height": 1036,
                    "image": "24_spinTheBottle/sit_eva_" + g.internal.gamephase + "_drink.png"
                }, 13);
                nav.killbutton("evaWine");
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(40, 23);
            break;
        case "dareSpin2":
            nav.bg("24_spinTheBottle/dareSpin2_" + g.internal.nextTurn + ".jpg");
            break;
        case "dareKissHand":
            nav.killall();
            nav.bg("24_spinTheBottle/dareKissHand_" + g.internal.nextTurn + ".jpg");
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            chat(27, 23);
            break;
        case "dareTalent":
            if (g.internal.nextTurn === "lola") {
                nav.killbutton("eva");
                nav.killbutton("lola");
                nav.button({
                    "type": "img",
                    "name": "lola",
                    "left": 936,
                    "top": 348,
                    "width": 984,
                    "height": 732,
                    "image": "24_spinTheBottle/talent_lola.png"
                }, 13);
                room23.chatcatch("lolaWine");
                room23.chatcatch("evatalk");
                chat(42, 23);
            }
            else {
                nav.killbutton("eva");
                nav.button({
                    "type": "img",
                    "name": "eva",
                    "left": 450,
                    "top": 0,
                    "width": 648,
                    "height": 732,
                    "image": "24_spinTheBottle/talent_eva.png"
                }, 13);
                room23.chatcatch("evaWin");
                chat(42, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            break;
        case "dareTopless":
            if (sc.getLevel(g.internal.nextTurn) >= 3) {
                g.internal.gamephase = 1;
                if (g.internal.nextTurn === "lola") {
                    g.internal.lolaphase = 1;
                    room23.drawLola("talk");
                    chat(30, 23);
                }
                else {
                    g.internal.evaphase = 1;
                    room23.drawEva("talk");
                    chat(31, 23);
                }
            }
            else {
                g.internal.levelDisplay = 3;
                if (g.internal.nextTurn === "lola")
                    chat(44, 23);
                else
                    chat(45, 23);
            }
            break;
        case "dareTopless2":
            if (sc.getLevel(g.internal.nextTurn) >= 4) {
                g.internal.gamephase = 2;
                if (g.internal.nextTurn === "lola") {
                    g.internal.lolaphase = 2;
                    room23.chatcatch("lolatalk");
                    chat(54, 23);
                }
                else {
                    g.internal.evaphase = 2;
                    room23.chatcatch("evatalk");
                    chat(55, 23);
                }
            }
            else {
                g.internal.levelDisplay = 4;
                if (g.internal.nextTurn === "lola")
                    chat(44, 23);
                else
                    chat(45, 23);
            }
            break;
        case "dareMast":
            if (g.internal.nextTurn === "lola") {
                nav.killbutton("lola");
                nav.button({
                    "type": "img",
                    "name": "lola",
                    "left": 877,
                    "top": 0,
                    "width": 1043,
                    "height": 1080,
                    "image": "24_spinTheBottle/sit_lola_" + g.internal.gamephase + "_mast.png"
                }, 13);
                if (g.internal.gamephase === 2)
                    chat(58, 23);
                else
                    chat(59, 23);
            }
            else {
                nav.killbutton("eva");
                nav.button({
                    "type": "img",
                    "name": "eva",
                    "left": 177,
                    "top": 57,
                    "width": 1065,
                    "height": 1023,
                    "image": "24_spinTheBottle/sit_eva_" + g.internal.gamephase + "_mast.png"
                }, 13);
                if (g.internal.gamephase === 2)
                    chat(60, 23);
                else
                    chat(61, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            break;
        case "dareButthole":
            nav.kill();
            nav.bg("24_spinTheBottle/" + g.internal.nextTurn + "_butthole.jpg");
            if (g.internal.nextTurn === "eva")
                chat(77, 23);
            else
                chat(78, 23);
            break;
        case "dareSitOnFace":
            nav.killbutton("eva");
            nav.killbutton("lola");

            nav.button({
                "type": "img",
                "name": "eva",
                "left": 573,
                "top": 0,
                "width": 1196,
                "height": 1080,
                "image": "24_spinTheBottle/" + g.internal.nextTurn + "_sitFace.png"
            }, 13);
            if (g.internal.nextTurn === "eva")
                chat(75, 23);
            else
                chat(76, 23);
            break;
        case "dareButtholeFinger":
            nav.killbutton("eva");
            nav.killbutton("lola");
            nav.button({
                "type": "img",
                "name": "eva",
                "left": 650,
                "top": 3,
                "width": 1156,
                "height": 1077,
                "image": "24_spinTheBottle/" + g.internal.nextTurn + "_fingerbutt.png"
            }, 13);
            if (g.internal.nextTurn === "eva")
                chat(73, 23);
            else
                chat(74, 23);
            break;

        case "dareLickCock":
            if (g.internal.nextTurn === "lola") {
                room23.chatcatch("evagiggle lolahappy");
                chat(79, 23);
            }
            else {
                room23.chatcatch("evascared lolasad");
                chat(80, 23);
            }
            nav.button({
                "type": "img",
                "name": g.internal.nextTurn,
                "left": 0,
                "top": 599,
                "width": 1920,
                "height": 481,
                "image": "24_spinTheBottle/mydick.png"
            }, 23);
            break;
        case "dareWedgie":
            nav.killall();
            nav.bg("24_spinTheBottle/dareWedge_" + g.internal.nextTurn + "0.jpg");
            chat(62, 23);
            break;
        case "darePantiesOff":
            if (sc.getLevel(g.internal.nextTurn) >= 5) {
                g.internal.gamephase = 3;
                if (g.internal.nextTurn === "eva") {
                    nav.killbutton("eva");
                    g.internal.evaphase = 3;
                    nav.button({
                        "type": "img",
                        "name": "eva",
                        "left": 720,
                        "top": 0,
                        "width": 316,
                        "height": 1080,
                        "image": "24_spinTheBottle/013_evaRemovePanties.png"
                    }, 23);
                    chat(64, 23);
                }
                else {
                    nav.killbutton("lola");
                    g.internal.lolaphase = 3;
                    nav.button({
                        "type": "img",
                        "name": "lola",
                        "left": 1392,
                        "top": 0,
                        "width": 316,
                        "height": 1080,
                        "image": "24_spinTheBottle/013_lolaRemovePanties.png"
                    }, 23);
                    chat(65, 23);
                }
            }
            else {
                g.internal.levelDisplay = 5;
                if (g.internal.nextTurn === "lola")
                    chat(44, 23);
                else
                    chat(45, 23);
            }
            
            break;
        case "dareMotoboat":
            nav.killall();
            nav.bg("24_spinTheBottle/daremotorboat.jpg");
            if (g.internal.nextTurn === "lola") {
                chat(48, 23);
            }
            else {
                chat(49, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            break;
        case "dareLickNipple":
            nav.killall();
            if (g.internal.nextTurn === "lola") {
                nav.bg("24_spinTheBottle/darelick_lola.jpg");
                chat(46, 23);
            }
            else {
                nav.bg("24_spinTheBottle/darelick_eva.jpg");
                chat(47, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            break;
        case "dareClothesPin":
            nav.killall();
            if (g.internal.nextTurn === "lola") {
                nav.bg("24_spinTheBottle/darepin_lola.jpg");
                chat(50, 23);
            }
            else {
                nav.bg("24_spinTheBottle/darepin_eva.jpg");
                chat(51, 23);
            }
            //g.internal.dares[g.internal.gamephase].splice(g.internal.gamepointer, 1);
            break;
        case "askMe":
            chat(25, 23);
            break;
        case "lolalike":
            sc.modLevel("lola", 5, 5);
            break;
        case "evalike":
            sc.modLevel("eva", 5, 5);
            break;
        case "lolahate":
            sc.modLevel("lola", -15, 5);
            break;
        case "evahate":
            sc.modLevel("eva", -5, 5);
            break;
        case "secret10":
            sc.modSecret("lola", 10);
            sc.modSecret("eva", 10);
            break;
        case "charisma":
            levels.mod("charisma", 10, 999);
            break;
        case "arousal":
            gv.mod("arousal", 10);
            break;
        case "dareWedgie1":
            nav.bg("24_spinTheBottle/dareWedge_" + g.internal.nextTurn + ".jpg");
            break;
        case "lickDick":
            nav.kill();
            nav.bg("24_spinTheBottle/" + g.internal.nextTurn + "_lick.gif");
            nav.next("nextTurn");
            break;
        case "medoggytongue":
            nav.kill();
            nav.bg("24_spinTheBottle/meBeg.jpg");
            chat(88, 23);
            break;
        case "medoggyroll":
            nav.kill();
            nav.bg("24_spinTheBottle/meRollover.jpg");
            chat(89, 23);
            break;
        case "mejump":
            nav.kill();
            nav.bg("24_spinTheBottle/meJump.jpg");
            chat(90, 23);
            break;
        case "mepushup":
            nav.kill();
            nav.bg("24_spinTheBottle/mepushup.jpg");
            chat(91, 23);
            break;
        case "meflex":
            nav.kill();
            nav.bg("24_spinTheBottle/meflex.jpg");
            if (g.internal.nextTurn === "eva")
                chat(92, 23);
            else
                chat(93, 23);
            break;
        case "meairguitare":
            nav.kill();
            nav.bg("24_spinTheBottle/meairguitare.jpg");
            chat(94, 23);
            break;
        case "meNipplelick":
            nav.kill();
            nav.bg("24_spinTheBottle/meNipplelick.jpg");
            chat(95, 23);
            break;
        case "meSuckToes":
            nav.kill();
            nav.bg("24_spinTheBottle/meSuckToes1.jpg");
            chat(97, 23);
            break;
        case "meSuckToes2":
            nav.bg("24_spinTheBottle/meSuckToes2.jpg");
            break;
        case "meDrink":
            nav.button({
                "type": "img",
                "name": "medrink",
                "left": 364,
                "top": 40,
                "width": 1297,
                "height": 1040,
                "image": "24_spinTheBottle/meDrink.png"
            }, 23);
            chat(502, 23);
            break;
        case "mebow":
            nav.kill();
            nav.bg("24_spinTheBottle/mebow.jpg");
            chat(99, 23);
            break;
        case "meStripdance":
            nav.kill();
            nav.bg("24_spinTheBottle/meStripdance.jpg");
            break;
        case "mepanties":
            nav.killall();
            levels.mod("xdress", 25, 999);
            nav.bg("24_spinTheBottle/mepanties.jpg");
            cl.c.panties = "w";
            cl.display();
            break;
        case "meButttouch":
            nav.kill();
            nav.bg("24_spinTheBottle/meButttouch.jpg");
            break;
        case "meHeli":
            nav.kill();
            nav.bg("24_spinTheBottle/meHeli.jpg");
            break;
        case "meDogtreat":
            nav.kill();
            nav.bg("24_spinTheBottle/meDogtreat.jpg");
            nav.button({
                "type": "tongue",
                "name": "meDogtreat",
                "left": 925,
                "top": 599,
                "width": 124,
                "height": 136,
                "image": "24_spinTheBottle/meDogtreat.png"
            }, 23);
            break;
        case "melicklola":
            nav.kill();
            g.internal.reuseCounter = 0;
            nav.bg("24_spinTheBottle/melicklola.jpg");
            nav.button({
                "type": "tongue",
                "name": "melicklola",
                "left": 1070,
                "top": 736,
                "width": 154,
                "height": 154,
                "image": "24_spinTheBottle/melicklola.png"
            }, 23);
            break;
        case "melickbutthole":
            g.internal.reuseCounter = 0;
            nav.killbutton("eva");
            nav.button({
                "type": "tongue",
                "name": "melickbutthole",
                "left": 214,
                "top": 135,
                "width": 943,
                "height": 945,
                "image": "24_spinTheBottle/sit_eva_butthole.png"
            }, 23);
            break;
        case "melickbutthole2":
            nav.kill();
            nav.bg("24_spinTheBottle/melickbutthole2.jpg");
            break;
        case "melickbutthole3":
            nav.bg("24_spinTheBottle/melickbutthole3.jpg");
            break;
        case "roomblack":
            nav.killall();
            nav.bg("999_phone/black.jpg");
            break;
        case "mequitPassout":
            g.pass = 7;
            char.room(28);
            break;
        case "dareTwerk":
            if (g.internal.nextTurn === "eva") {
                room23.drawEva("twerk");
                chat(125, 23);
            }
            else {
                room23.drawLola("twerk");
                chat(124, 23);
            }
            break;
        case "endGame":
            if (g.internal.lolaWine < 2)
                daily.set("lolaDrunk");
            if (g.internal.evaWine < 2)
                daily.set("evaDrunk");

            char.settime(22, 17);
            char.room(11);
            break;
        default:
            console.log("not found: " + callback);
            break;
    }
};

room23.chat = function (chatID) {
    if (chatID === 1000) {
        return {
            chatID: 1000,
            speaker: g.internal.nextTurn,
            text: "That's too much. I don't feel comfortable removing that. I think that's enough " +
                "for today. ",
            button: [
                { chatID: -1, text: "Ok. I guess that's the game. ", callback: "endGame" }
            ]
        };
    }
    else if (chatID === 999) {
        return {
            chatID: 999,
            speaker: "me",
            text: g.internal.truths[g.internal.gamephase][g.internal.gamepointer].q,
            button: [
                { chatID: 998, text: "...", callback: (g.internal.nextTurn === "eva" ? "evatalk lolasit" : "evasit lolatalk") }
            ]
        };
    }
    else if (chatID === 998) {
        var c998 = {
            chatID: 998,
            speaker: g.internal.nextTurn,
            text: g.internal.nextTurn === "lola" ? g.internal.truths[g.internal.gamephase][g.internal.gamepointer].l : g.internal.truths[g.internal.gamephase][g.internal.gamepointer].e,
            button: [
                { chatID: -1, text: "...", callback: "nextTurn" }
            ]
        };
        g.internal.truths[g.internal.gamephase].splice(g.internal.gamepointer, 1);
        return c998;
    }
    else if (chatID === 800) { //lola asks eva
        return room23.getTheirQuestion();
    }
    else if (chatID === 801) {
        return {
            chatID: 801,
            speaker: g.internal.nextTurn,
            text: g.internal.reply,
            button: [
                {
                    chatID: -1, text: "...", callback: "nextTurn"
                }
            ]
        };
    }
    else if (chatID === 802) { //eva dares lola
        g.internal.gamepointer = -1;
        for (i = 0; i < g.internal.dares[g.internal.gamephase].length; i++) {
            if (g.internal.dares[g.internal.gamephase][i].u !== null) {
                g.internal.gamepointer = i;
                break;
            }
        }
        if (g.internal.gamepointer < 0) {
            return {
                chatID: 802,
                speaker: g.internal.whoTurn,
                text: "I can't think of anything. Maybe I'm just tired. Let's get some sleep. ",
                button: [
                    { chatID: -1, text: "Awwww. ok. ", callback: "endGame" }
                ]
            };
        }
        else {
            return {
                chatID: 802,
                speaker: "lola",
                text: sc.n("eva") + ", " + g.internal.dares[g.internal.gamephase][g.internal.gamepointer].u,
                button: [
                    { chatID: -1, text: "...", callback: g.internal.dares[g.internal.gamephase][g.internal.gamepointer].dCallback }
                ]
            };
        }
    }
    else if (chatID === 851) { //eva dares lola
        g.internal.gamepointer = -1;
        for (i = 0; i < g.internal.dares[g.internal.gamephase].length; i++) {
            if (g.internal.dares[g.internal.gamephase][i].u !== null) {
                g.internal.gamepointer = i;
                break;
            }
        }
        if (g.internal.gamepointer < 0) {
            return {
                chatID: 851,
                speaker: g.internal.nextTurn,
                text: "I can't think of anything. Maybe I'm just tired. Let's get some sleep. ",
                button: [
                    { chatID: -1, text: "Awwww. ok. ", callback: "endGame" }
                ]
            };
        }
        else {
            return {
                chatID: 851,
                speaker: "eva",
                text: sc.n("lola") + ", " + g.internal.dares[g.internal.gamephase][g.internal.gamepointer].u,
                button: [
                    { chatID: -1, text: "...", callback: g.internal.dares[g.internal.gamephase][g.internal.gamepointer].dCallback }
                ]
            };
        }
    }
    else if (chatID === 701) {//strip dare
        var stripDare = [
            {
                e: "Take your shirt off. Show us your man nipples. ",
                l: "I dare you to take your shirt off and show off your chest!",
                b: [{ chatID: -1, text: "Awww Really? [Take Shirt off]", callback: "mestrip" },
                    { chatID: -1, text: "It's getting late. I think this is enough.", callback: "endGame" },]
            },
            {
                e: "If we're going to sit here in our panties, so are you. Strip off those pants. ",
                l: "Take your pants off. Show me your legs! ",
                b: [{ chatID: -1, text: "Awww yea! [Take pants off]", callback: "mestrip" },
                { chatID: -1, text: "It's getting late. I think this is enough.", callback: "endGame" },]
            },
            {
                e: "Take off your underwear and show us your dick. ",
                l: "Oh my. Hehehe. Uhhhh. Strip it off mister. ",
                b: [{ chatID: -1, text: "Awww yea! [Take your panties off]", callback: "mestrip" },
                { chatID: -1, text: "It's getting late. I think this is enough.", callback: "endGame" },]
            },
        ]
        
        return  {
            chatID: 701,
            speaker: g.internal.nextTurn,
            text: g.internal.nextTurn === "eva" ? stripDare[g.internal.myphase].e : stripDare[g.internal.myphase].l,
            button: stripDare[g.internal.myphase].b
        }; 
    }
    else if (chatID === 702) {
        var darepointer = null;
        var mp = g.internal.myphase;
        for (var gdare = 0; gdare < g.internal.myDare[mp].length; gdare++) {
            if (g.internal.whoTurn === "eva") {
                if (g.internal.myDare[mp][gdare].e !== null) {
                    darepointer = gdare;
                    break;
                }
            }
            else {
                if (g.internal.myDare[mp][gdare].l !== null) {
                    darepointer = gdare;
                    break;
                }
            }
        }
        if (darepointer === null) {
            return {
                chatID: 702,
                speaker: g.internal.nextTurn,
                text: "I can't think of anything. Maybe I'm just tired. Let's get some sleep. ",
                button: [
                    { chatID: -1, text: "Awwww. ok. ", callback: "endGame" }
                ]
            }; 
        }
        else {
            var mblist = g.internal.myDare[mp][darepointer].b;
            mblist.push({ chatID: -1, text: "I'm not doing that. That's enough for tonight.", callback: "endGame" });
            //var mbtxt = g.internal.nextTurn === "eva" ? g.internal.myDare[mp][darepointer].e : g.internal.myDare[mp][darepointer].l;
            var mbtxt = g.internal.whoTurn === "eva" ? g.internal.myDare[mp][darepointer].e : g.internal.myDare[mp][darepointer].l;

            g.internal.myDare[mp].splice(darepointer, 1);

            return {
                chatID: 702,
                speaker: g.internal.whoTurn,
                text: mbtxt,
                button: mblist
            }; 
        }
    }
    else if (chatID === 500) {
        room23.drawEva("sit");
        room23.drawLola("sit");
        var otherSpeaker = g.internal.nextTurn === "lola" ? sc.n("eva") : sc.n("lola");
        return {
            chatID: 500,
            speaker: "me",
            text: sc.n(g.internal.nextTurn) + ", " + g.internal.dares[g.internal.gamephase][g.internal.gamepointer].txt.replace("#other#", otherSpeaker),
            button: [
                { chatID: 501, text: "...", callback: "" }
            ]
        }; 
    }
    else if (chatID === 501) {
        if (g.internal.nextTurn === "eva") {
            room23.drawEva("talk");
            room23.drawLola("sit");
        }
        else {
            room23.drawEva("sit");
            room23.drawLola("talk");
        }
        return {
            chatID: 500,
            speaker: g.internal.nextTurn,
            text: (g.internal.nextTurn === "eva" ? g.internal.dares[g.internal.gamephase][g.internal.gamepointer].e : g.internal.dares[g.internal.gamephase][g.internal.gamepointer].l),
            button: [
                { chatID: -1, text: "...", callback: g.internal.dares[g.internal.gamephase][g.internal.gamepointer].dCallback }
            ]
        }; 
    }
    else if (chatID === 502) {
        if (g.internal.meWine === 0) {
            return {
                chatID: 0,
                speaker: "me",
                text: "I think I'm a bit too drunk. The room is really spinning.....",
                button: [
                    { chatID: 116, text: "...", callback: "roomblack" }
                ]
            };
        }
        else {
            var meWineChat;
            if (g.internal.meWine === 3)
                meWineChat = "Yummy!";
            else if (g.internal.meWine === 2)
                meWineChat = "Oh wow. I'm starting to feel it.";
            else if (g.internal.meWine === 1)
                meWineChat = "I'm really feeling a bit drunk. ";

            g.internal.meWine--;
            return {
                chatID: 0,
                speaker: "me",
                text: meWineChat,
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" }
                ]
            };
        }
        
    }
    else if (chatID === 400) { //eva / lola truth
        var truthchat = "";
        if (g.internal.nextTurn === "lola") {
            switch (g.internal.gamephase) {
                case 0: truthchat = "I guess I'll take truth"; break;
                case 1: truthchat = "Ask me anything. "; break;
                case 2: truthchat = "I'm going to play safe and take truth. "; break;
                case 3: truthchat = "This is getting out of control. Truth. "; break;
            }
        }
        else if (g.internal.nextTurn === "eva") {
            switch (g.internal.gamephase) {
                case 0: truthchat = "Truth!"; break;
                case 1: truthchat = "Truth, you pervert. "; break;
                case 2: truthchat = "Truth. I want to keep my panties on. "; break;
                case 3: truthchat = "Truth. Don't want to hear your dirty dares. "; break;
            }
        }
        return {
            chatID: 400,
            speaker: g.internal.nextTurn,
            text: truthchat,
            button: [
                { chatID: -1, text: "...", callback: "truth" }
            ]
        };
    }
    else if (chatID === 401) { //eva / lola dare
        var dareChat = "";
        if (g.internal.nextTurn === "lola") {
            switch (g.internal.gamephase) {
                case 0: dareChat = "Dare, but be nice."; break;
                case 1: dareChat = "I'll do what ever you want. Dare "; break;
                case 2: dareChat = "I'm feeling naughty. Dare me "; break;
                case 3: dareChat = "Dare. Tell me what to do to you. hehehe "; break;
            }
        }
        else if (g.internal.nextTurn === "eva") {
            switch (g.internal.gamephase) {
                case 0: dareChat = "Dare me pussy."; break;
                case 1: dareChat = "Dare. "; break;
                case 2: dareChat = "Let's see what you've got pervert. Dare me."; break;
                case 3: dareChat = "Nothing gross, but I'll take a dare. "; break;
            }
        }
        return {
            chatID: 400,
            speaker: g.internal.nextTurn,
            text: dareChat,
            button: [
                { chatID: -1, text: "...", callback: "dare" }
            ]
        };
    }
    else {
        var cArray = [
            {
                chatID: 0,
                speaker: "lola",
                text: "I'm so excited. I've never played Truth or Dare before, but I've heard so " +
                    "much about it. I hope you don't make us do anything perverted... *wink* ",
                button: [
                    { chatID: 1, text: "...", callback: "lolasit evatalk" }
                ]
            },
            {
                chatID: 1,
                speaker: "eva",
                text: "Whatever " + sc.n("lola") + ", you know your inner slut wants " + sc.n("me") + " to go full pervert!",
                button: [
                    { chatID: 2, text: "Don't worry " + sc.n("eva") + ", I'll make sure to include you too.", callback: "" }
                ]
            },
            {
                chatID: 2,
                speaker: "eva",
                text: "Hahah you better creep-o!",
                button: [
                    { chatID: -1, text: "So I'll start this game!", callback: "evasit lolaSit" }
                ]
            },
            {
                chatID: 3,
                speaker: g.internal.whoTurn,
                text: sc.n(g.internal.nextTurn) + " truth or dare? ",
                button: [
                    { chatID: -1, text: "...", callback: "tord" }
                ]
            },
            {
                chatID: 4,
                speaker: g.internal.whoTurn,
                text: sc.n("me") + " truth or dare?",
                button: [
                    { chatID: 702, text: "Dare", callback: "" },
                    { chatID: 800, text: "Truth", callback: "" }
                ]
            },
            {
                chatID: 5,
                speaker: "eva",
                text: "Truth!",
                button: [
                    { chatID: -1, text: "...", callback: "evasit evaTruth" }
                ]
            },
            {
                chatID: 6,
                speaker: "eva",
                text: "Dare me pussy! ",
                button: [
                    { chatID: -1, text: "...", callback: "evasit evaDare" }
                ]
            },
            {
                chatID: 7,
                speaker: "lola",
                text: "Ask me anything you want. ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit lolaTruth" }
                ]
            },
            {
                chatID: 8,
                speaker: "lola",
                text: "I guess I'll take a dare.  ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit lolaDare" }
                ]
            },
            {
                chatID: 9,
                speaker: "eva",
                text: sc.n("lola") + " truth or dare? ",
                button: [
                    { chatID: -1, text: "...", callback: "tord" }
                ]
            },
            {
                chatID: 10,
                speaker: "lola",
                text: "Truth! ",
                button: [
                    { chatID: 800, text: "...", callback: "lolasit evatalk" }
                ]
            },
            {
                chatID: 11,
                speaker: "lola",
                text: sc.n("eva") + " truth or dare? ",
                button: [
                    { chatID: 12, text: "...", callback: "tord" }
                ]
            },
            {
                chatID: 12,
                speaker: "eva",
                text: "Truth! ",
                button: [
                    { chatID: 800, text: "...", callback: "lolatalk evasit" }
                ]
            },
            {
                chatID: 13,
                speaker: "lola",
                text: "Awwww. You're the sweetest ever! ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit" }
                ]
            },
            {
                chatID: 14,
                speaker: "eva",
                text: "Blech! Gross. Not in a million years! ",
                button: [
                    { chatID: -1, text: "...", callback: "evasit" }
                ]
            },
            {
                chatID: 15,
                speaker: "eva",
                text: "She totally does!",
                button: [
                    { chatID: 16, text: "...", callback: "evasit lolatalk" }
                ]
            },
            {
                chatID: 16,
                speaker: "lola",
                text: "Oh hahaha. *blush* ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit" }
                ]
            },
            {
                chatID: 17,
                speaker: "eva",
                text: "I always knew you were one of those weird feet guys. Blech! ",
                button: [
                    { chatID: -1, text: "...", callback: "" }
                ]
            },
            {
                chatID: 18,
                speaker: "eva",
                text: "Gross. You know we discharge in them, right! Some days it's a total snot canoe in there. ",
                button: [
                    { chatID: -1, text: "...", callback: "evasit" }
                ]
            },
            {
                chatID: 19,
                speaker: "lola",
                text: "I know someone... Errr. oh. I mean gross. ",
                button: [
                    { chatID: -1, text: "...", callback: "lolatalk" }
                ]
            },
            {
                chatID: 20,
                speaker: "lola",
                text: "That's not true! I've never peed in a pool. So gross. That water goes in my mouth. ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit" }
                ]
            },
            {
                chatID: 21,
                speaker: "eva",
                text: sc.n("lola") + " just took a shower! Do you want to eat her asshole? ",
                button: [
                    { chatID: 22, text: "...", callback: "evasit lolatalk" }
                ]
            },
            {
                chatID: 22,
                speaker: "lola",
                text: "Shut up! You always gotta try to be funny and take it too far. ",
                button: [
                    { chatID: -1, text: "...", callback: "lolasit" }
                ]
            },
            {
                chatID: 23,
                speaker: "eva",
                text: "Wait. For real? Do you wear girl's panties? Like all the time? ",
                button: [
                    { chatID: 24, text: "Yeah. They're so so soft and smooth ", callback: "secret10 lolahate lolatalk" },
                    { chatID: -1, text: "Oh no, that was a joke. ", callback: "evasit" },
                ]
            },
            {
                chatID: 24,
                speaker: "lola",
                text: "Wouldn't you rather wear boy's underwear? Boxers would look super cute on you. ",
                button: [
                    { chatID: -1, text: "I love what I love ", callback: "lolasit" },
                ]
            },
            {
                chatID: 25,
                speaker: g.internal.whoTurn,
                text: sc.n("me") + " truth or dare? ",
                button: [
                    { chatID: -1, text: "Dare", callback: "myDare" },
                    { chatID: -1, text: "Truth", callback: "myTruth" },
                ]
            },
            {
                chatID: 26,
                speaker: g.internal.nextTurn,
                text: "MMMmmmmuah",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]

            },
            {
                chatID: 27,
                speaker: g.internal.nextTurn,
                text: "MMMmmmmuah",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 28,
                speaker: g.internal.nextTurn,
                text: "Weeeeeeeeee!!!!",
                button: [
                    { chatID: 29, text: "...", callback: "dareSpin2" },
                ]
            },
            {
                chatID: 29,
                speaker: g.internal.nextTurn,
                text: "OOooffff! So dizzy.",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 30,
                speaker: "lola",
                text: "Hehehe, What do you think? ",
                button: [
                    { chatID: 32, text: "Stunning! ", callback: "lolalike" },
                    { chatID: 32, text: "Nice titties!  ", callback: "" },
                ]
            },
            {
                chatID: 31,
                speaker: "eva",
                text: "I bet you're going to masturbate to this later. Just don't scream out my name when you cum! ",
                button: [
                    { chatID: -1, text: "If you hear me yell Butthead, then you know I screamed your name", callback: "nextTurn" },
                    { chatID: -1, text: "I don't jack off to boogers", callback: "nextTurn" },
                ]
            },
            {
                chatID: 32,
                speaker: "lola",
                text: sc.n("eva") + " truth or dare? ",
                button: [
                    { chatID: 33, text: "...", callback: "" },
                ]
            },
            {
                chatID: 33,
                speaker: "eva",
                text: "Dare me!",
                button: [
                    { chatID: (g.internal.gamephase === 1 ? 34 : 56), text: "...", callback: "" },
                ]
            },
            {
                chatID: 34,
                speaker: "lola",
                text: "I dare you to be topless too! I can't be the only one showing boobs around here! ",
                button: [
                    { chatID: 25, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 35,
                speaker: "eva",
                text: sc.n("lola") + " truth or dare? ",
                button: [
                    { chatID: 36, text: "...", callback: "" },
                ]
            },
            {
                chatID: 36,
                speaker: "lola",
                text: "Dare me!",
                button: [
                    { chatID: (g.internal.gamephase === 1 ? 37 : 57) , text: "...", callback: "" },
                ]
            },
            {
                chatID: 37,
                speaker: "eva",
                text: "Take your top off! Show us those titties! ",
                button: [
                    { chatID: -1, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 38,
                speaker: "me",
                text: "Ok! Since I asked for the game I'll start!  ",
                button: [
                    { chatID: -1, text: "...", callback: "" },
                ]
            },
            {
                chatID: 39,
                speaker: g.internal.nextTurn,
                text: "Ewwww. I need a shower. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 40,
                speaker: g.internal.nextTurn,
                text: "*glug* ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 41,
                speaker: "eva",
                text: "That's how she get's all the guys. With her weird random humor. ",
                button: [
                    { chatID: 43, text: "...", callback: "" },
                ]
            },
            {
                chatID: 42,
                speaker: "eva",
                text: "You all can hold your applause. I know how awesome I am! ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 43,
                speaker: "lola",
                text: "Oh " + sc.n("eva") + ". You're just jealous of my flexability. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 44,
                speaker: "lola",
                text: "Oh my. I hate to be a big ol' chicken, but I don't think I feel comfortable " +
                    "doing that right now. I think it's time for bed. ",
                button: [
                    { chatID: -1, text: "Oh. ok. [Need level " + g.internal.levelDisplay + "]", callback: "endGame" },
                ]
            },
            {
                chatID: 45,
                speaker: "eva",
                text: "Oh so that's why you want to play truth or dare? To look at my small, but " +
                    "perky tits? Pervert. We're going to bed! ",
                button: [
                    { chatID: -1, text: "Oh. ok. [Need level " + g.internal.levelDisplay + "]", callback: "endGame" },
                ]
            },
            {
                chatID: 46,
                speaker: "eva",
                text: "Did you just moan while licking my nipple? You really need to get laid! ",
                button: [
                    { chatID: -1, text: "hahaha", callback: "nextTurn" },
                ]
            },
            {
                chatID: 47,
                speaker: "lola",
                text: "Ooooo. That makes me feel kinda funny.  ",
                button: [
                    { chatID: -1, text: "hahaha", callback: "nextTurn" },
                ]
            },
            {
                chatID: 48,
                speaker: "lola",
                text: "Oh hahaha. You look so silly with your face burried in my chest.   ",
                button: [
                    { chatID: -1, text: "blub blub blub blub", callback: "nextTurn" },
                ]
            },
            {
                chatID: 49,
                speaker: "eva",
                text: "Ok, ok. That's enough. My nipples are sensative. ",
                button: [
                    { chatID: -1, text: "Bwa hahaha", callback: "nextTurn" },
                ]
            },
            {
                chatID: 50,
                speaker: "lola",
                text: "Ow ow ow. Poop! Ow. I need to take this off it hurts too much..",
                button: [
                    { chatID: -1, text: "Oh sure. Yes. You can take them off. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 51,
                speaker: "eva",
                text: "FUCK ME IN THE ASS! This hurts like a mother fucker! That's enough. " +
                    "My nipples! I'm taking these off!  ",
                button: [
                    { chatID: -1, text: "Hahaha ok", callback: "nextTurn" },
                ]
            },
            {
                chatID: 52,
                speaker: "lola",
                text: "I feel so silly holding my mouth like this. ",
                button: [
                    { chatID: -1, text: "But you do look sexy! ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 53,
                speaker: "eva",
                text: "Awwww! I have the best BJ face here! ",
                button: [
                    { chatID: -1, text: "Yes you do", callback: "nextTurn" },
                ]
            },
            {
                chatID: 54,
                speaker: "lola",
                text: "Hehehe, I feel funny sitting here in just my panties. ",
                button: [
                    { chatID: -1, text: "Your swimming has given you great legs. ", callback: "nextTurn" },
                    { chatID: -1, text: "Cute panties. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 55,
                speaker: "eva",
                text: "I hope my panties don't shift and my pussy falls out. ",
                button: [
                    { chatID: -1, text: "I hope it does. ", callback: "nextTurn" },
                    { chatID: -1, text: "It won't", callback: "nextTurn" },
                ]
            },
            {
                chatID: 56,
                speaker: "lola",
                text: "I dare you take your pants off too! Show him your cute panties! ",
                button: [
                    { chatID: -1, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 57,
                speaker: "eva",
                text: "Take your pants off! I know you want him to see you naked! ",
                button: [
                    { chatID: -1, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 58,
                speaker: "lola",
                text: "oh hahaha. My panties are getting wet! ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 59,
                speaker: "lola",
                text: "Hehehe. My little clitty is starting to get hard! ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 60,
                speaker: "eva",
                text: "I bet you want to see what's behind these panties. You'll have to earn " +
                    "that. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 61,
                speaker: "eva",
                text: "This is the greatest day of your perverted life. Seeing a hot girl playing " +
                    "with her pussy. I wouldn't be surprise if you started jacking off right now. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 62,
                speaker: g.internal.nextTurn === "eva" ? "lola": "eva",
                text: "Stand up. I'm going to give you a real wedgie! ",
                button: [
                    { chatID: 63, text: "...", callback: "dareWedgie1" },
                ]
            },
            {
                chatID: 63,
                speaker: g.internal.nextTurn,
                text: "OOOoooofffff! I can taste my panties. That really gets into the folds! ",
                button: [
                    { chatID: 63, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 64,
                speaker: "eva",
                text: "Usually I only take my panties off for sexy boys. ",
                button: [
                    { chatID: 71, text: "Hey! I'm sexy! ", callback: "evatalk" },
                ]
            },
            {
                chatID: 65,
                speaker: "lola",
                text: "Hehehe. I feel so dirty taking my panties off in front of everyone.",
                button: [
                    { chatID: 66, text: "...", callback: "lolatalk" },
                ]
            },
            {
                chatID: 66,
                speaker: "lola",
                text: "Since we always do everything together, there's no way I'm sitting here naked " +
                    "by myself. " + sc.n("eva") + " you have to be naked too! ",
                button: [
                    { chatID: 67, text: "...", callback: "" },
                ]
            },
            {
                chatID: 67,
                speaker: "eva",
                text: "You didn't ask me truth or dare! How did you know I wouldn't say truth? ",
                button: [
                    { chatID: 68, text: "...", callback: "" },
                ]
            },
            {
                chatID: 68,
                speaker: "lola",
                text: "Would you say truth? ",
                button: [
                    { chatID: 69, text: "...", callback: "" },
                ]
            },
            {
                chatID: 69,
                speaker: "eva",
                text: "No.",
                button: [
                    { chatID: 70, text: "...", callback: "" },
                ]
            },
            {
                chatID: 70,
                speaker: "lola",
                text: "Then strip slut! ",
                button: [
                    { chatID: -1, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 71,
                speaker: "eva",
                text: "Haha! Not sexy. Maybe awkward! " + sc.n("lola") + " truth or dare. " +
                    "Awww screw it. Take your panties off too. I don't want to spend the " +
                    "rest of the game with him staring at my pussy. ",
                button: [
                    { chatID: 72, text: "...", callback: "lolatalk evasit" },
                ]
            },
            {
                chatID: 72,
                speaker: "lola",
                text: "I guess we have to stick together. I'll just sit here with my vagina " +
                    "hanging out too. ",
                button: [
                    { chatID: -1, text: "...", callback: "setPhaseNextTurn" },
                ]
            },
            {
                chatID: 73,
                speaker: "eva",
                text: "Hey stop clenching your butthole. This is weird enough as is!",
                button: [
                    { chatID: 72, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 74,
                speaker: "lola",
                text: "It's so squishy and warm. I want to crawl inside and take a nap hehe. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 75,
                speaker: "lola",
                text: "Oh, oh oh. I've got to get off or I'm going to cum all over your face. ",
                button: [
                    { chatID: 72, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 76,
                speaker: "eva",
                text: "Hehe. I'm getting so wet! " + sc.n("lola") + " really is a great rug muncher! ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 77,
                speaker: "eva",
                text: "No weird stuff! ... ok that's enough of looking up my asshole perv! ",
                button: [
                    { chatID: 72, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 78,
                speaker: "lola",
                text: "I'm so embarrased! Does it look good. I hope it looks good. ",
                button: [
                    { chatID: -1, text: "...", callback: "nextTurn" },
                ]
            },
            {
                chatID: 79,
                speaker: "lola",
                text: "Yum... I mean oh no. It's a penis",
                button: [
                    { chatID: -1, text: "...", callback: "lickDick" },
                ]
            },
            {
                chatID: 80,
                speaker: "eva",
                text: "You better have washed your dick. ",
                button: [
                    { chatID: -1, text: "...", callback: "lickDick" },
                ]
            },
            {
                chatID: 81,
                speaker: "lola",
                text: "Oh my. My heart's a flutter. ",
                button: [
                    { chatID: -1, text: "You're welcome. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 82,
                speaker: "lola",
                text: "Did anyone say you have such a pretty smile. ",
                button: [
                    { chatID: 83, text: "Not till now. ", callback: "" },
                ]
            },
            {
                chatID: 83,
                speaker: "eva",
                text: "Whatever. I can tell you're not staring at his smile. You're both perverts. ",
                button: [
                    { chatID: -1, text: "Yes we are. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 84,
                speaker: "eva",
                text: "Hahaha! You're wearing a girl's bra! I didn't know you were a cross dresser! ",
                button: [
                    { chatID: -1, text: "I uhhh.. no. ", callback: "secretOut" },
                ]
            },
            {
                chatID: 85,
                speaker: "eva",
                text: "Hahaha! You're wearing a girl's panties! I didn't know you were a cross dresser! ",
                button: [
                    { chatID: -1, text: "I uhhh.. no. ", callback: "secretOut" },
                ]
            },
            {
                chatID: 86,
                speaker: "eva",
                text: "Oh My God! I know what that is! That's a chastity thingy. A boy at my school wears one " +
                    "of those 'cause he's like a sissy and stuff. I didn't know you were a sissy! ",
                button: [
                    { chatID: -1, text: "I uhhh.. no. ", callback: "secretOut" },
                ]
            },
            {
                chatID: 87,
                speaker: "lola",
                text: "Oh my. That is a penis. ",
                button: [
                    { chatID: -1, text: "Yes it is. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 88,
                speaker: "eva",
                text: "That's my good doggy. I might just give you a doggy treat later. ",
                button: [
                    { chatID: -1, text: "*arf*", callback: "nextTurn" },
                ]
            },
            {
                chatID: 89,
                speaker: "eva",
                text: "Who's my good pathetic doggy!  ",
                button: [
                    { chatID: -1, text: "*arf*", callback: "nextTurn" },
                ]
            },
            {
                chatID: 90,
                speaker: "lola",
                text: "Hehehe. You did it. I made you jump for joy ",
                button: [
                    { chatID: -1, text: "I'd do anything for my " + sc.n("el") + ". ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 91,
                speaker: "lola",
                text: "Oh my. You're so strong! If you were a fireman you could totally rescure me. ",
                button: [
                    { chatID: -1, text: "I would carry you in my arms. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 92,
                speaker: "eva",
                text: "Hahaha. Those are girl muscles!  ",
                button: [
                    { chatID: -1, text: "Better than your manly hips! ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 93,
                speaker: "lola",
                text: "My heart is a flutter. You really are sexy. I mean strong! You're strong.  ",
                button: [
                    { chatID: -1, text: "It's ok. I am sexy ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 94,
                speaker: "lola",
                text: "*swoon* You really make a sexy rock star!  ",
                button: [
                    { chatID: -1, text: "Rock on baby! ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 95,
                speaker: "lola",
                text: "*moan* ",
                button: [
                    { chatID: 96, text: "....so. You've been licking my nipple for a few minutes. Are you done? ", callback: "" },
                ]
            },
            {
                chatID: 96,
                speaker: "lola",
                text: "Shhhh. Almost done. ",
                button: [
                    { chatID: -1, text: "....", callback: "nextTurn" },
                ]
            },
            {
                chatID: 97,
                speaker: "eva",
                text: "Hehehe. Your tongue feels funny on the bottom of my toe. It's so slimy. ",
                button: [
                    { chatID: 98, text: "*suck*", callback: "meSuckToes2" },
                ]
            },
            {
                chatID: 98,
                speaker: "eva",
                text: "Gross. I have your slobber all over my toes. You have to wear your slobber for the rest " +
                    "of the game! ",
                button: [
                    { chatID: -1, text: "ugh. ok", callback: "nextTurn" },
                ]
            },
            {
                chatID: 99,
                speaker: "me",
                text: "*sigh* I'm such your bitch " + sc.n("eva") + ". There are you happy. ",
                button: [
                    { chatID: 100, text: "...", callback: "" },
                ]
            },
            {
                chatID: 100,
                speaker: "eva",
                text: "Totally. Now that you know you're my bitch you can get up. ",
                button: [
                    { chatID: -1, text: "I was getting up anyways. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 101,
                speaker: "lola",
                text: "I don't know if I want a...",
                button: [
                    { chatID: 102, text: "Too bad. Gotta do the dare! ", callback: "meStripdance" },
                ]
            },
            {
                chatID: 102,
                speaker: "lola",
                text: "OOooo. Shake that money maker.. I mean. Good dancing. ",
                button: [
                    { chatID: 103, text: "Oh yeah", callback: "evalike" },
                ]
            },
            {
                chatID: 103,
                speaker: "lola",
                text: "He's a boy. Why would he wear girl's panties? That's really weird.  ",
                button: [
                    { chatID: 104, text: "Yeah. I would never wear panties. ", callback: "evalike" },
                ]
            },
            {
                chatID: 104,
                speaker: "eva",
                text: "You can always quit. ",
                button: [
                    { chatID: 105, text: "I'm no quitter. " + sc.n("lola") + " give me a pair of your panties. ", callback: "mepanties" },
                    { chatID: -1, text: "I'm not doing that. That's enough for tonight.", callback: "endGame" }
                ]
            },
            {
                chatID: 105,
                speaker: "lola",
                text: "You better not get your gross stuff on my panties. ",
                button: [
                    { chatID: -1, text: "Hey. If it happens, it happens. Try not being so sexy. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 106,
                speaker: "lola",
                text: "Hehehehe. butt ",
                button: [
                    { chatID: -1, text: "Your fingers are cold. ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 107,
                speaker: "eva",
                text: "Why do the loser perverts always get such big dicks?",
                button: [
                    { chatID: -1, text: "Hey! ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 108,
                speaker: "eva",
                text: sc.n("landlord") + " promised me a puppy, but like always she changed her mind, but " +
                    "only after I bought a bunch of stuff for my new little puppy. Now eat it doggy boy! ",
                button: [
                    { chatID: -1, text: "Hrumph. ", callback: "" },
                ]
            },
            {
                chatID: 109,
                speaker: "eva",
                text: "Hahaha you totally ate it! Good doggy. Now bark my good doggy. ",
                button: [
                    { chatID: -1, text: "*arf* ", callback: "nextTurn" },
                ]
            },
            {
                chatID: 110,
                speaker: "lola",
                text: "Why are you staring at it? Is it ugly? ",
                button: [
                    { chatID: -1, text: "No, It's the most beautiful thing I've seen. ", callback: "lolalike" },
                    { chatID: -1, text: "Meh. I've seen better. ", callback: "lolahate" },
                ]
            },
            {
                chatID: 111,
                speaker: "lola",
                text: "Oh wow, wow, wow, wow. I really needed that. oh my. I'm a bit dizzy. I think we should " +
                    "go to bed. You were amazing. I love you. er... I mean I loved what you did. ",
                button: [
                    { chatID: -1, text: "I love you too. I mean I loved it. ", callback: "endGame" },
                    { chatID: -1, text: "No problem. ", callback: "endGame" }
                ]
            },
            {
                chatID: 112,
                speaker: "eva",
                text: "I've always wondered what it feels like. Start licking doggy. ",
                button: [
                    { chatID: -1, text: "Sigh, ok. ", callback: "" }
                ]
            },
            {
                chatID: 113,
                speaker: "me",
                text: "*gag* aaak. You just farted inside my mouth! I can taste it! ",
                button: [
                    { chatID: 114, text: "...", callback: "melickbutthole2" }
                ]
            },
            {
                chatID: 114,
                speaker: "eva",
                text: "Hahaha! I can't stop farting! Hahahaha! You totally ate my fart! hahahahaha",
                button: [
                    { chatID: 115, text: "*blech!*", callback: "melickbutthole3" }
                ]
            },
            {
                chatID: 115,
                speaker: "lola",
                text: "Oh " + sc.n("eva") + ". So gross. I'm done. Lets open the window so you can put " +
                    "your ass outside and air it out. This game's so over. ",
                button: [
                    { chatID: -1, text: "Yeah. It stinks in here I'm out too. ", callback: "endGame" }
                ]
            },
            {
                chatID: 116,
                speaker: "lola",
                text: sc.n("me") + ".....",
                button: [
                    { chatID: -1, text: "...", callback: "mequitPassout" }
                ]
            },
            {
                chatID: 117,
                speaker: g.internal.whoTurn,
                text: sc.n("me") + ", truth or dare? ",
                button: [
                    { chatID: 701, text: "Dare", callback: "" },
                    { chatID: 118, text: "Truth", callback: "" }
                ]
            },
            {
                chatID: 118,
                speaker: g.internal.whoTurn,
                text: "Chicken. We both have stripped down and you choose truth? Pick " +
                    "dare. ",
                button: [
                    { chatID: 701, text: "Ok. Dare me. ", callback: "" },
                    { chatID: 119, text: "I'm sticking with truth. ", callback: "" },
                ]
            },
            {
                chatID: 119,
                speaker: "eva",
                text: "We're not going to play with a little sissy wimp. We're done!",
                button: [
                    { chatID: -1, text: "oh. ok", callback: "endGame" },
                ]
            },
            {
                chatID: 120,
                speaker: "eva",
                text: "See, I told you " + sc.n("lola") + " he was a sissy. No one is " +
                    "that weirdly perverted. You're a sissy girl! Hehehe! Sissy girl, " +
                    "sissy girl! ",
                button: [
                    { chatID: 121, text: "I am not! ", callback: "" },
                ]
            },
            {
                chatID: 121,
                speaker: "lola",
                text: "That's not nice, but it is a shock. I think I'm going to need " +
                    "to lay down. You need to go. now. ",
                button: [
                    { chatID: -1, text: "oh. sorry ", callback: "endGame" },
                ]
            },
            {
                chatID: 122,
                speaker: "eva",
                text: "This game is taking too long! I'm done. Let's go to bed " + 
                    sc.n("lola") + ". ",
                button: [
                    { chatID: -1, text: "awww ", callback: "endGame" },
                ]
            },
            {
                chatID: 123,
                speaker: "lola",
                text: "Yeah. I guess it is a bit long. Night night! ",
                button: [
                    { chatID: -1, text: "Good night. ", callback: "endGame" },
                ]
            },
            {
                chatID: 124,
                speaker: "lola",
                text: "Is this sexy. I've never tried this before. Do I look silly?",
                button: [
                    { chatID: -1, text: "You look great!", callback: "nextTurn" },
                ]
            },
            {
                chatID: 125,
                speaker: "eva",
                text: "Take a good look 'cause you'll never see me bound like this on you! ",
                button: [
                    { chatID: -1, text: "Gross. I would never let you bounce on me. Bleck!", callback: "nextTurn" },
                ]
            },
            {
                chatID: 126,
                speaker: "eva",
                text: "I totally can't keep going. I'm feeling so drunk. ",
                button: [
                    { chatID: -1, text: "ok. Night", callback: "endGame" },
                ]
            },
            {
                chatID: 127,
                speaker: "eva",
                text: "That wine really got to me. I'm feeling a bit dizzy. I've got to " +
                    "go lay down. ",
                button: [
                    { chatID: -1, text: "ok. Night", callback: "endGame" },
                ]
            },
            {
                chatID: 128,
                speaker: "me",
                text: "It's getting late. I'm going to call it. ",
                button: [
                    { chatID: -1, text: "ok. Night", callback: "endGame" },
                ]
            },
        ]; 
        retEntry = cArray[chatID];
        return retEntry;
    }
};

room23.buildInternal = function () {
    g.prevview = null;
    char.changeMenu("body", false, true);
    var truths = new Array();
    var dares = new Array();
    var myDare = new Array();
    truths.push([
        {
            q: "Have you ever kissed a boy?",
            l: "Ewwww, never!",
            e: "I dunno, probably not as many as you butthead!",
            i: "q_1_1"
        },
        {
            q: "Have you ever eaten a booger?",
            l: "Hahaha, once when i was little!",
            e: "You're so disgusting " + sc.n("me") + ". Never.",
            i: "q_1_2"
        },

        {
            q: "Who is your secret crush?",
            l: "[BLUSH] It's a secret, but they're in this room...",
            e: "The School's quarterback Utah makes my panties soooo wet.",
            i: "q_1_3"
        },
        {
            q: "What's your favorite color of panties?",
            l: "White. So simple, I guess like me.",
            e: "Red, I like the attention it gets.",
            i: "q_1_4"
        },
        {
            q: "Have you tasted your own sweat?",
            l: "hmmmm, maybe, yes? I don't know, that's a weird question.",
            e: "ooohhh, gross no.",
            i: "q_1_5"
        },
        {
            q: "Describe your perfect date.",
            l: "Oh gosh, I guess he would bring me flowers and take me out to the Pasta Place, then walk me home.",
            e: "He'd take me to the mall and buy me everything and anything I want!",
            i: "q_1_6"
        },
        {
            q: "If your mom hated your boyfriend would you dump him?",
            l: "Maybe, it depends on who it is.",
            e: "Not a chance, my mom doesn't have good taste in boys.",
            i: "q_1_7"
        },
        {
            q: "Who is the hottest in this group?",
            l: sc.n("eva") + ", of course!",
            e: "Me!",
            i: "q_1_8"
        },
        {
            q: "What's your dream job?",
            l: "I've always wanted to be kindergarten teacher. It would be so great to help so many kids.",
            e: "A world traveler. I want to go on adventures around the world!",
            i: "q_1_11"
        },
        {
            q: "What's the most food you've eaten in a single sitting?",
            l: "OMG I totally ate 3 big bowls of pasta and so many bread sticks... It hurt for a full day!",
            e: "I had and entire large pizza. I felt like a huge pig.",
            i: "q_1_12"
        },
    ]);
    truths.push([
        {
            q: "What is something no else knows about you?",
            l: "I hate, hate having my feet touched. I sends chills down my spine!",
            e: "I like having my butthole licked. It's weird I know, but there's just something to it that I love.",
            i: "q_2_1"
        },
        {
            q: "What's your favorite hobby?",
            l: "I love swimming. You'll probably catch me at the pool in the afternoons.",
            e: "Playing phone games I guess.",
            i: "q_2_2"
        },
        {
            q: "What is the sexiest thing about a boy?",
            l: "His shoulders. Nothing better than big strong shoulders.",
            e: "I'm a leg girl. I hate when guys have a muscular body and tiny little skinny little legs.",
            i: "q_2_3"
        },
        {
            q: "Have you ever fantasized about a girl?",
            l: "[BLUSH] yea...",
            e: "Oh yes, Girls are just so sexy and soft.",
            i: "q_2_4"
        },
        {
            q: "Have you ever cheated on a test?",
            l: "Never! I study too hard to cheat.",
            e: "If you're not cheating you're not trying!",
            i: "q_2_5"
        },
        {
            q: "What is the worst grade you received for a class in school/college?",
            l: "I got a C once. I tried taking dance class and I was so bad at it!",
            e: "Psssh, you know it's an F. I got the looks, " + sc.n("lola") + " got the brains. ",
            i: "q_2_6"
        },
        {
            q: "What is your biggest turn-off?",
            l: "A smelly boy, ewwww.",
            e: "A small penis. It's just so disappointing.",
            i: "q_1_9"
        },
        {
            q: "Would you go out with an older man?",
            l: "hmmm, maybe a couple years older, but not too much; that's gross.",
            e: "Yes, and I have",
            i: "q_1_10"
        },
    ]);
    truths.push([
        {
            q: "Have you ever sent a naked selfie?",
            l: "Maybeeee.....",
            e: "hehehe yeah, a few times. ",
            i: "q_3_1"
        },
        {
            q: "Have you ever peed yourself?",
            l: "sigh; yes, last month when " + sc.n("eva") + " was tickling me and wouldn't let me go to the bathroom.. I peed just a little squirt in my panties.",
            e: "My Ex boyfriend asked me to pee my panties, so I did.",
            i: "q_3_2"
        },
        {
            q: "Are you a virgin?",
            l: sc.getEvent("lola", 1) ? "Ummmm, you know I can't say. Why would you ask that? " : "OMG YES!",
            e: "Nope! There isn't a hole on me that is!",
            i: "q_3_3"
        },
        {
            q: "Do you sleep in the nude?",
            l: "Yes, we both do sometimes. It's no big deal.",
            e: "Oh yea. Clothes are so uncomfortable when you're trying to sleep. I don't know why people do it.",
            i: "q_3_4"
        },
        {
            q: "Have you ever faked an orgasm?",
            l: "No. Do people do that? ",
            e: "Sigh.. yes. Small dicks do nothing for me. Such a disappointment, but I don't want to the boy to know how bad they are. ",
            i: "q_3_5"
        },
        {
            q: "Do you have any fetishes?",
            l: "Fetish? No. Maybe. I think just normal sex. Is that a fetish? ",
            e: "OOoooo. I love being watched when I have sex. It just brings it to another level. ",
            i: "q_3_6"
        },
        {
            q: "What is your 'I'm getting laid tonight' outfit?",
            l: "Hmm. I borrowed " + sc.n("eva") + "'s thong once when I went on a date. I don't know why, I totally wasn't going to sleep with him. ",
            e: "A skrit with no panties. I love bending over and catching them peeking. Hehehe",
            i: "q_3_7"
        },
        {
            q: "When was the first time you came?",
            l: "Oh! I guess if I have to tell the truth it was when " + sc.n("eva") + " showed me how. ",
            e: "I was watching a porn and tried to do what the girl did. Totally worked. I was so scared everyone knew what I did the entire day, but no one said anything.",
            i: "q_3_8"
        },
    ]);
    truths.push([
        {
            q: "What’s your favorite fantasy to masturbate to?",
            l: "Don't tell him, but I've masturbated to the Utah the Quarterback. I would never date him because he gets around, but he's just so sexy. ",
            e: "Gangbang. Totally a gangbang. I tried it a couple times, but the fantasy is just so much more sexy. ",
            i: "q_4_1"
        },
        {
            q: "Have you ever been attracted to the same sex?",
            l: "Of course. I love the person, not what's between their legs. ",
            e: "Yeah. Girls are just softer. Sometimes I just want to be romanced and not just banged. ",
            i: "q_4_2"
        },
        {
            q: "What was the most embarrassing time you got turned on?",
            l: "Oh. Hmmmm. That's a real thinker. I don't really know. ",
            e: "I'm never embarrased when I'm turned on. I sometimes think that's the problem. ",
            i: "q_4_3"
        },
        {
            q: "Have you ever licked a pussy? ",
            l: "A girl never tells! ",
            e: "Hahaha. I've eatin' more pussy than cock! Right " + sc.n("lola") + "! ",
            i: "q_4_4"
        },
        {
            q: "Have you ever done anal? ",
            l: "No. Never had a man's penis in there. ",
            e: "Oh yeah. Why is it anytime I say put it where you want, they always shove it in my ass? ",
            i: "q_4_5"
        },
        {
            q: "Would you drink pee? ",
            l: "Oh. Only if I really loved the boy and they really wanted me to. Otherwise, no way! ",
            e: "Yeah. It's kinda gross. I usually just let it fall out of my mouth. ",
            i: "q_4_6"
        },
        {
            q: "Have you ever hooked up with more than one person in the same night? ",
            l: "No. I would never. Maybe as a fantasy, but not for real.  ",
            e: "You know I have. ",
            i: "q_4_7"
        },
        {
            q: "What is your favorite sex position? ",
            l: "MMmmmm. I'm going to go with missionary. I would love to look into his eyes while we're making love. ",
            e: "Starting out.. cowgirl. It lets me rub my clit on their belly. ",
            i: "q_4_8"
        },
    ]);
    var myTruth = [
        {
            q: "What's your biggest secret crush? You can tell us!",
            b: [
                { chatID: 13, text: sc.n("lola"), callback: "lolalike" },
                { chatID: 14, text: sc.n("eva"), callback: "evalike" },
                { chatID: -1, text: sc.n("janice"), callback: "lolahate" },
                { chatID: -1, text: "You wouldn't know her, she goes to another school", callback: "charisma" }
            ]
        },
        {
            q: "Which one of us is sexier?",
            b: [
                { chatID: 13, text: sc.n('lola') + "'s more attractive", callback: "lolalike" },
                { chatID: 14, text: sc.n('eva') + "'s sexier", callback: "evalike" }
            ]
        },
        {
            q: "Have you ever masturbated?",
            b: [{ chatID: -1, text: "Yes, everyone has", callback: "" },
            { chatID: -1, text: "No, that's gross", callback: "" }]
        },
        {
            q: "Have you ever peed in your pants?",
            b: [{ chatID: -1, text: "Yes, but it wasn't my fault!", callback: "evalike" },
            { chatID: -1, text: "No, I'm not a baby", callback: "" }]
        },
        {
            q: "Are you a virgin?",
            b: [
                { chatID: 15, text: "Yes, " + sc.n("lola") + " do you want to help me with that!", callback: "lolalike" },
                { chatID: -1, text: "I am.", callback: "" },
                { chatID: -1, text: "Nope!", callback: "lolahate" }
            ]
        },
        {
            q: "Have you ever seen a real naked guy before?",
            b: [
                { chatID: -1, text: "Yes I have", callback: "lolahate" },
                { chatID: -1, text: "Nope", callback: "" }
            ]
        },
        {
            q: "What's the sexiest thing on a girl's body?",
            b: [
                { chatID: -1, text: "Her eyes", callback: "lolalike" },
                { chatID: -1, text: "I'm a total boob guy. ", callback: "" },
                { chatID: -1, text: "Ass! A big fat ass!", callback: "" },
                { chatID: -1, text: "I have to say thier pussy. ", callback: "" },
                { chatID: 17, text: "Feet. Nothing better than a sexy pair of feet.", callback: "evalike" }
            ]
        },
        {
            q: "Have you ever touched a butthole?",
            b: [
                { chatID: -1, text: "Yes, and it wasn't even my own!", callback: "lolahate" },
                { chatID: -1, text: "Gross, no", callback: "" },
                { chatID: -1, text: "No, but I would love to. ", callback: "" },
            ]
        },
        {
            q: "Have you ever touched another penis?",
            b: [
                { chatID: -1, text: ".......Yes", callback: "lolahate" },
                { chatID: -1, text: "No", callback: "" }
            ]
        },
        {
            q: "How old were you when you got your first kiss?",
            b: [
                { chatID: -1, text: "When I was younger. ", callback: "" },
                { chatID: -1, text: "I haven't' been kissed.", callback: "lolalike" }
            ]
        },
        {
            q: "Do you want to lick our dirty panties?",
            b: [
                { chatID: 18, text: "The dirtier the better", callback: "evalike" },
                { chatID: -1, text: "Gross.. no", callback: "" }
            ]
        },
        {
            q: "Do you like big butts?",
            b: [
                { chatID: -1, text: "I like big butts and I cannot lie.", callback: "" },
                { chatID: -1, text: "I'm more of a flat butt kinda guy.", callback: "" }
            ]
        },
        {
            q: "Do you find farts sexy?",
            b: [
                { chatID: -1, text: "I would suck your fart through a garden hose!", callback: "evalike" },
                { chatID: -1, text: "Ew, gross", callback: "" }
            ]
        },
        {
            q: "Would you ever let someone lick your butthole?",
            b: [
                { chatID: 19, text: "oh yeah, do you know anyone?", callback: "lolalike" },
                { chatID: -1, text: "Hell no!", callback: "" }
            ]
        },
        {
            q: "Have you ever picked your nose?",
            b: [
                { chatID: -1, text: "Everyone does. ", callback: "" },
                { chatID: -1, text: "Not a chance", callback: "" }
            ]
        },
        {
            q: "Would you ever eat a girl out?",
            b: [
                { chatID: -1, text: "Yes! I love pussy! ", callback: "evalike" },
                { chatID: -1, text: "No, not my style. ", callback: "" }
            ]
        },
        {
            q: "Have you ever peed in a pool?",
            b: [
                { chatID: 20, text: "Sure, everyone has at least once.", callback: "evalike" },
                { chatID: -1, text: "No, gross", callback: "lolalike" }
            ]
        },
        {
            q: "Have you ever tasted your own cum?",
            b: [
                { chatID: -1, text: "Yes I have. It's not that weird.", callback: "evalike" },
                { chatID: -1, text: "Ewwww, no way", callback: "" }
            ]
        },
        {
            q: "Have you ever fallen in love at first sight?",
            b: [
                { chatID: -1, text: "No, it takes time for me to fall in love. ", callback: "lolalike" },
                { chatID: -1, text: "Yes, it was wonderful.", callback: "" }
            ]
        },
        {
            q: "Would you ever lick so butthole?",
            b: [{ chatID: 21, text: "mmm sure if he washed it first.", callback: "evalike" },
            { chatID: -1, text: "pffffffft gross", callback: "" }
            ]
        },
        {
            q: "Have you ever wanted to be tied up?",
            b: [
                { chatID: -1, text: "Oh yea!", callback: "evalike" },
                { chatID: -1, text: "not really; no", callback: "" }
            ]
        },
        {
            q: "Have you ever tasted your own pee?",
            b: [
                { chatID: -1, text: "It's not that bad, a bit warm and salty", callback: "evalike lolahate" },
                { chatID: -1, text: "No; Gross. No way.", callback: "lolalike" }
            ]
        },
        {
            q: "If you were forced to have sex with a man would you want him to put his dick in your mouth or butt? ",
            b: [
                { chatID: -1, text: "mouth", callback: "evalike" },
                { chatID: -1, text: "butt", callback: "evalike" }
            ]
        },
        {
            q: "Which movie to do you like more. Titanic or Predator? ",
            b: [
                { chatID: -1, text: "Titanic", callback: "lolalike" },
                { chatID: -1, text: "Predator", callback: "" },
                { chatID: -1, text: "I haven't seen either", callback: "" },
            ]
        },
        {
            q: "Boxers, or briefs? ",
            b: [
                { chatID: -1, text: "Boxers", callback: "lolalike" },
                { chatID: -1, text: "Breifs", callback: "" },
                { chatID: 23, text: "Panties", callback: "lolahate" },
                { chatID: -1, text: "Free ballin'!", callback: "" },
            ]
        },
        {
            q: "How often do you masturbate? ",
            b: [
                { chatID: -1, text: "Everyday! ", callback: "evalike" },
                { chatID: -1, text: "Sometimes. ", callback: "" },
                { chatID: -1, text: "I never would touch myself like that! ", callback: "evahate" },
            ]
        }
    ];
    myDare.push([ //0 clothing
        {
            e: "I want to you beg. Like a doggy with your tongue out! Then bark. ",
            l: null,
            b: [{ chatID: -1, text: "Weird, but ok.", callback: "medoggytongue" }]
        },
        {
            e: "Roll over doggy boy! ",
            l: null,
            b: [{ chatID: -1, text: "arf?", callback: "medoggyroll" }]
        },
        {
            e: null,
            l: "I dare you... to jump up and down! ",
            b: [{ chatID: -1, text: "Sure.", callback: "mejump" }]
        },
        {
            e: null,
            l: "Do a push up! No. Do 5 pushups! ",
            b: [{ chatID: -1, text: "I think I can do 5", callback: "mepushup" }]
        },
        {
            e: "Drink up doggy boy. ",
            l: "I dare you to take a drink of your wine. ",
            b: [{ chatID: -1, text: "Sure", callback: "meDrink" }]
        },
        //{
        //    e: null,
        //    l: "OOOoooo, uhhhhh. Pick your nose with your tongue ",
        //    b: [{ chatID: -1, text: "Awww yea! [Take pants off]", callback: "lolatalk removePants" }]
        //},
    ]);
    myDare.push([ //1 topless
        {
            e: "Show us how pathetic you are. Try flexing your puny muscles. ",
            l: "Flex your muscles! ",
            b: [{ chatID: -1, text: "You're in for a treat. ", callback: "meflex" }]
        },
        {
            e: null,
            l: "Play air guitare to your favorite song",
            b: [{ chatID: -1, text: "Get ready to be amazed by my awesome skills baby!", callback: "meairguitare" }]
        },
        {
            e: null,
            l: "Ummm. Let me lick your nipple. hehehe ",
            b: [{ chatID: -1, text: "Awww yea! ", callback: "meNipplelick" }]
        },
        {
            e: "I want you to suck my big toe like it's a thick tiny weiner! Suck " +
                "it pervert. ",
            l: null,
            b: [{ chatID: -1, text: "Ugh! Ok. ", callback: "meSuckToes" }]
        },
        {
            e: "Bow down and say that you're my bitch. Really bow. Put your face on the floor loser. ",
            l: null,
            b: [{ chatID: -1, text: "Aw crap. ok. ", callback: "mebow" }]
        },
        {
            e: "Drink up doggy boy. ",
            l: "I dare you to take a drink of your wine. ",
            b: [{ chatID: -1, text: "Sure", callback: "meDrink" }]
        },
    ]);
    myDare.push([ //2 underwear only
        {
            e: "Give " + sc.n("lola") + " a striptease dance. ",
            l: null,
            b: [{ chatID: 101, text: "Sexy! I love it. ", callback: "evasit lolatalk" }]
        },
        {
            e: "Put on a pair of " + sc.n("lola") + "'s panties! ",
            l: null,
            b: [{ chatID: 103, text: "Huh? ", callback: "lolatalk evasit" }]
        },
        {
            e: null,
            l: "Oh my... Let me touch your butt. ",
            b: [{ chatID: 106, text: "Oh hahaha. Sure. ", callback: "meButttouch" }]
        },
        {
            e: "Drink up doggy boy. ",
            l: "I dare you to take a drink of your wine. ",
            b: [{ chatID: -1, text: "Sure", callback: "meDrink" }]
        },
    ]);
    myDare.push([ //3 naked
        {
            l: "Do a helicopter with your penis. ",
            e: "Do a helicopter with your penis. ",
            b: [{ chatID: 107, text: "Buckle your seat belts ladies, cause we're about to lift off! ", callback: "meHeli" }]
        },
        {
            l: null,
            e: "Eat a doggy treat out of me.  ",
            b: [{ chatID: 108, text: "Why do you have a dog treat? ", callback: "meDogtreat" }]
        },
        {
            l: "I dare you to lick my vagina. But use only your tongue. I want to stay a virgin so this " +
                "doens't count. ",
            e: null,
            b: [{ chatID: 110, text: "Fuck Yeah! ", callback: "melicklola" }]
        },
        {
            l: null,
            e: "Well since we're all naked, I dare you lick my butthole like a doggy in heat. ",
            b: [{ chatID: 112, text: "huh?", callback: "melickbutthole" }]
        },
        {
            e: "Drink up doggy boy. ",
            l: "I dare you to take a drink of your wine. ",
            b: [{ chatID: -1, text: "Sure", callback: "meDrink" }]
        },
    ]);
    //----------------------------------their dares-----------------------------------------------------
    dares.push([
        {
            txt: "I dare you to make out with your hand. ",
            e: "Sure! Take some notes " + sc.n("lola"),
            l: "Sure. What a nice dare. ",
            u: "I dare you to make out with your hand. ",
            dCallback: "dareKissHand",
            i: "d_1_1"
        },
        {
            txt: "I dare you to kiss #other#. On the lips! ",
            e: "Yummy! My favorite person to make out with! ",
            l: "Sure! I love how soft her lips are. ",
            u: null,
            dCallback: "dareKissOther",
            i: "d_1_2"
        },
        {
            txt: "I dare you to give me a kiss.",
            e: "Ewwww. You're going to pay for this one! ",
            l: "Oh yes! If I must. ",
            u: "I dare you to kiss " + sc.n("me") + ". ",
            dCallback: "dareKissMe",
            i: "d_1_3"
        },
        {
            txt: "I dare you to spin around for 10 seconds and try to walk",
            e: "What! Ok. You better not mess with me butthead! ",
            l: "Ok. This sounds like fun.",
            u: "I dare you to spin around for 10 seconds and try to walk",
            dCallback: "dareSpin1",
            i: "d_1_4"
        },
        {
            txt: "Smell your own armpits",
            e: "What kind of weird fetishes are you into sick-o!",
            l: "Hehehe. ok. ",
            u: "Smell your own armpits",
            dCallback: "dareSmellArmpits",
            i: "d_1_5"
        },
        {
            txt: "Take a drink! ",
            e: "Trying to get me drunk. ",
            l: "Oooo fun. I do love the taste of wine. ",
            u: "Take a drink! ",
            dCallback: "dareDrinkWine",
            i: "d_1_6"
        },
        {
            txt: "Show us what secret talent you have. ",
            e: "Check this out! ",
            l: "I can touch my toe to my ear. ",
            u: "Show both of us your secret talent. ",
            dCallback: "dareTalent",
            i: "d_1_7"
        },
        {
            txt: " I dare you to take your shirt off! ",
            e: "Pervert! I knew you just wanted to see my tits. ",
            l: "Oh my. Show you my bare breasts? ",
            u: null,
            dCallback: "dareTopless",
            i: "icon_undress"
        },
    ]);
    dares.push([
        {
            txt: "Kiss #other#",
            e: "You like watching topless girls making out? ",
            l: "Hehe. I love it when our nipples touch. ",
            u: "Give me a kiss!",
            dCallback: "dareKissOther",
            i: "d_1_2"
        },
        {
            txt: "Make out with me. ",
            e: "Really. Just don't try to feel my tits pervert. ",
            l: "Hehe. Sure! ",
            u: "Make out with " + sc.n("me") + ". ",
            dCallback: "dareKissMe",
            i: "d_1_3"
        },
        {
            txt: "Give me your best blow job face. ",
            e: "Sure. My pinky is probably the size of your dick! ",
            l: "MMM. Ready for the show? ",
            u: null,
            dCallback: "bjface",
            i: "d_2_1"
        },
        {
            txt: "Let me motorboat your breasts. ",
            e: "I knew you were playing just to touch my boobies. ",
            l: "Oh. ok. Hehehe",
            u: null,
            dCallback: "dareMotoboat",
            i: "d_2_2"
        },
        {
            txt: "Lick #other#'s nipples.",
            e: "You better not get a boner watching us. ",
            l: "MMmmmm. She has the cutest nipples. ",
            u: "I dare you to lick my nipples. ",
            dCallback: "dareLickNipple",
            i: "d_2_3"
        },
        {
            txt: "Put clothes pins on your nipples.",
            e: "What! You total butthead! Fuck! ",
            l: "That's so evil. ",
            u: null,
            dCallback: "dareClothesPin",
            i: "d_2_4"
        },
        {
            txt: "Take a drink! ",
            e: "Trying to get me drunk. ",
            l: "Oooo fun. I do love the taste of wine. ",
            u: "Take a drink! ",
            dCallback: "dareDrinkWine",
            i: "d_1_6"
        },
        {
            txt: "Take your pants off. ",
            e: "Sure! It's only time you get to see a girl without her pants. ",
            l: "Sexy! hehe. I love this dare. ",
            u: null,
            dCallback: "dareTopless2",
            i: "d_2_5"
        },
    ]);
    dares.push([
        //{
        //    txt: "Kiss #other#",
        //    e: "",
        //    l: "",
        //    u: true,
        //    dCallback: "",
        //    i: "d_1_2"
        //},
        {
            txt: "Twerk for us. ",
            e: "I didn't think you were an ass boy. I thought you were more into feet. ",
            l: "I feel so silly shaking my butt, but ok. ",
            u: "I want to see your danicng moves. Twerk for us. ",
            dCallback: "dareTwerk",
            i: "d_3_1"
        },
        {
            txt: "Play with your vagina over your panties. ",
            e: "You're just trying to get me all horny so you can have sex with me. ",
            l: "I guess I can show you how I masturbate. It is my hand touching myself. ",
            u: true,
            dCallback: "dareMast",
            i: "d_3_2"
        },
        {
            txt: "Let #other# give you a wedgie. ",
            e: "Awww crap. ",
            l: "Hehehe. I love these hijinks you two come up with! ",
            u: null,
            dCallback: "dareWedgie",
            i: "d_3_3"
        },
        {
            txt: "Take a drink! ",
            e: "Trying to get me drunk. ",
            l: "Oooo fun. I do love the taste of wine. ",
            u: "Take a drink! ",
            dCallback: "dareDrinkWine",
            i: "d_1_6"
        },
        {
            txt: "Take your panties off. ",
            e: "I knew it! I knew you just played to get us naked! ",
            l: "Oh.... oh my. I suppose I have to since you dared me. hehehe",
            u: null,
            dCallback: "darePantiesOff",
            i: "d_3_4"
        },
    ]);
    dares.push([
        //{
        //    txt: "Kiss #other#",
        //    e: "Sure. Her lips are so soft.  ",
        //    l: "Oh yeah!  ",
        //    u: true,
        //    dCallback: "dareKissOther",
        //    i: "d_1_2"
        //},
        {
            txt: "Take a drink! ",
            e: "Trying to get me drunk. ",
            l: "Oooo fun. I do love the taste of wine. ",
            u: "Take a drink! ",
            dCallback: "dareDrinkWine",
            i: "d_1_6"
        },
        {
            txt: "Play with your pussy and let us watch. ",
            e: "I'm going to blow your dirty little brain. ",
            l: "Oh my. I guess I have to since it's a dare. ",
            u: null,
            dCallback: "dareMast",
            i: "d_3_2"
        },
        {
            txt: "I dare you to show me your butthole. ",
            e: "Ewwww. Boys are so gross. ",
            l: "Oh my. That's so personal. I guess I have to. ",
            u: null,
            dCallback: "dareButthole",
            i: "d_4_5"
        },
        {
            txt: "Have #other# sit on your face! ",
            e: "Take notes. She's about to show you how to properly eat pussy. ",
            l: "Oh. I guess it's ok that I show you how to do cunnilingus. ",
            u: "I dare you to sit on my face! ",
            dCallback: "dareSitOnFace",
            i: "d_4_1"
        },
        {
            txt: "Put your finger in #other#'s butthole. ",
            e: "What! I know you're weird, but you still surprise me by how really weird you are. ",
            l: "She hates it when I put my finger in... I mean what. Sure. ",
            u: null,
            dCallback: "dareButtholeFinger",
            i: "d_4_2"
        },
        {
            txt: "Lick my weiner. ",
            e: "Oh crap. I knew this was coming. You better not cum when I touch it. ",
            l: "Oh YES! I mean. Sure. That's cool. ",
            u: "I dare you to lick his weiner! ",
            dCallback: "dareLickCock",
            i: "d_4_3"
        },
        //{
        //    txt: "Suck my dick. ",
        //    e: "",
        //    l: "",
        //    u: true,
        //    dCallback: "",
        //    i: "d_4_4"
        //},
    ]);
    //truth = g.shuffleArray(truth);
    myTruth = g.shuffleArray(myTruth);
    for (i = 0; i < myDare.length; i++) {
        myDare[i] = g.shuffleArray(myDare[i]);
    }
    g.internal = {
        eva: 0,
        lola: 0,
        prevGamephase: 0,
        gamephaseCounter: 0,
        gamephase: 0,
        myphase: 0,
        lolaWine: 3,
        evaWine: 3,
        meWine: 3,
        lolaphase: 0,
        evaphase: 0,
        whoTurn: "me",
        nextTurn: "lola",
        theirTurn: false,
        holder: "",
        gamepointer: 0,
        pantyBoy: false,
        truths: truths,
        dares: dares,
        myTruth: myTruth,
        myDare: myDare,
        reply: "",
        reuseCounter: 0,
        levelDisplay: 0
    };
};

room23.getTheirQuestion = function () {
    var qlist = new Array();
    var selectedQustion;
    //lola asks eva
    if (g.internal.whoTurn === "lola" && g.internal.nextTurn === "eva") {
        room23.drawLola("talk");
        room23.drawEva("sit");
        qlist = [
            {
                q: "Did you really have sex with " + sc.n("chloe") + "? ",
                a: "Hahaha, Yeah, a while ago, but " + sc.n("river") + " was there too. "
            },
            {
                q: "Where did my red sweatshirt go?",
                a: "Oh haha, you got me. I forgot it at school when I borrowed it. "
            },
            {
                q: "When I asked why is my pillow wet and you said you didn't know, what it because you were humping it?",
                a: "Whaaaaa. You pillow is so much firmer than mine. I was going to change the pillow case, but you came in and started yelling at me. "
            },
            {
                q: "Did you really eat that entire pizza that one time? ",
                a: "I don't know why you don't believe me, but I totally did. "
            },
            {
                q: "What is one thing you'd change about your appearance if you could?",
                a: "My tits. Tottally going to go bigger some day. "
            },
            {
                q: "Who is the best teacher you've ever had and why?",
                a: "Mr. White. He was sexy, but in an intense kinda way that said he was in total control.  "
            },
            {
                q: "How many kids do you want to have one day?",
                a: "None kids. No kids. Kids are gross. "
            },
            {
                q: "When is the last time you apologized?",
                a: "Last week to " + sc.n("landlord") + ". She caught me stealing her dildo again. She really spanked me good. "
            },
            {
                q: "If you could pick one other person to take with you to a deserted island, who would it be?",
                a: "You, of course. So you could suffer with me!"
            },
            {
                q: "Have you ever stolen anything?",
                a: "Other than " + sc.n("landlord") + "'s dildo and your clothes, nothing. I don't steal. "
            },
            {
                q: "Who was your first celebrity crush?",
                a: "Idris Elba. He's just got this thing that makes me melt. "
            },
            {
                q: "What is your favorite book of all time?",
                a: "Reading's dumb! "
            },
            {
                q: "Are bigger penises better?",
                a: "Kinda. But more than 7 inches is too big! It hurts so much when it bangs against my cervix. A slighty bigger dick is just right. "
            },
            {
                q: "What does cum taste like to you?",
                a: "Like a mix of milk and boogers, most of the time. But sometimes it's just gross! I can't even explain it. Just gross. "
            },
            {
                q: "Do you think " + sc.n("me") + " is attractive? ",
                a: "Sexy like a baboon's butt! "
            },
            {
                q: "What guy would you never date?",
                a: "You know it's " + sc.n("me") + ". You're not assertive enough. I would make you my slave instead, hahaha."
            },
            {
                q: "Do you ever get a creepy vibe from " + sc.n("priest") + "?",
                a: "Totally! He's so creepy! Everytime I confess something sexual he asks for more details. Once I swear I heard him stoking his dick! "
            },
            {
                q: "Who did you lose your virginity to? ",
                a: "Malcom. He was awkward. You remember he used to always come over. But he was sweet. "
            },
        ];
        selectedQustion = qlist[g.rand(0, qlist.length)];
    }
    else if (g.internal.whoTurn === "eva" && g.internal.nextTurn === "lola") {
        room23.drawLola("sit");
        room23.drawEva("talk");
        qlist = [
            {
                q: "What is the first letter of your crushes name? ",
                a: "I guess I can say it. It's the letter " + sc.n("me")[0] + ", but you'll never guess who. "
            },
            {
                q: "What does your crush do for work? ",
                a: "Oh... That's too specific. I can't say... Oh ok, they catch bag guys! That's all I'll say! "
            },
            {
                q: "How many kids do you want to have one day?",
                a: "2 kids. A boy and girl so my husband and I each have our own little mini me's. "
            },
            {
                q: "What is the worst food you've ever tasted?",
                a: "Oh, I'm sorry, but when you tried to make chicken soup. That was the worst. "
            },
            {
                q: "What was your biggest childhood fear?",
                a: "Drowning. That's why I swim so much. I don't ever want to drown. "
            },
            {
                q: "What terrible movie or show is your guilty pleasure?",
                a: "Miss Congeniality. Sexy and smart, sign me up. "
            },
            {
                q: "Was that your poop in the pool?",
                a: "No! No way. That was that weird boy. But butt works just fine, I would never poop in a pool! "
            },
            {
                q: "Have you ever had a finger that wasn't yours in your vagina? ",
                a: sc.n("eva") + " shut up! That's isn't appropriate! You can't ask question you know the answer to! "
            },
            {
                q: "Who's a bigger butthead " + sc.n("me") + " or " + sc.n("chad") + "? ",
                a: "I hate " + sc.n("chad") + " so much. He tried to grab my ass, several times. " + sc.n("me") + " is not a butthead, he would never do that. "
            },
            {
                q: "Do you know what a weiner looks like? ",
                a: "Hrumph. You watched that porn with me. I hope real penises aren't that big. It was so huge! "
            },
            {
                q: "What secret have you never told " + sc.n("landlord") + "?",
                a: "Hmm. Nothing. I tell her everything. She's really understanding, even with the weird things. "
            },
            {
                q: "Have you ever farted?",
                a: "Psst. Everyone has farted. "
            },
            {
                q: "If you could only suck one dick for the rest of your life who's would it be? ",
                a: sc.n("eva") + "! You know I can't answer that! Stop! "
            },
            {
                q: "Would you ever try anal? ",
                a: "Oh my! I guess. Only if it didn't hurt. "
            },
            {
                q: "Would you lick " + sc.n("me") + "'s feet if he asked? ",
                a: "Gross. no. Maybe if he washed them really good. But who wants their feet licked? "
            },
            {
                q: "If you had to have " + sc.n("priest") + " fuck you to save the world, would you let him? ",
                a: "Oh gross! I guess to save the world, but I would hate every minute of it. "
            },
        ];
        selectedQustion = qlist[g.rand(0, qlist.length)];
    }
    else {
        var askMeTruth = {
            chatID: 400,
            speaker: g.internal.whoTurn,
            text: g.internal.myTruth[0].q,
            button: g.internal.myTruth[0].b
        };
        g.internal.myTruth.shift();
        return askMeTruth;
    }
    g.internal.reply = selectedQustion.a;

    return {
        chatID: 800,
        speaker: g.internal.whoTurn,
        text: sc.n(g.internal.nextTurn) + ", " + selectedQustion.q,
        button: [
            { chatID: 801, text: "...", callback: "" }
        ]
    };
};