

var undo = document.getElementById("undo");
        //var localFolder = Windows.Storage.ApplicationData.current.localFolder;
		var aut = document.getElementById("aut");
        var right = document.getElementById("right");
        var left = document.getElementById("left");
        var menuBox = document.getElementById("menuBox");
        var addSymbol = document.getElementById("addSymbol");
        var clearScreen = document.getElementById("clearScreen");
        var deleteFile = document.getElementById("deleteFile");
        var exxit = document.getElementById("exxit");
        var category = document.getElementById("category");
        var minder = document.getElementById("minder");
        var minder2 = document.getElementById("minder2");
        var swap = document.getElementById("swap");
        var name1 = document.getElementById("name1");
        var name2 = document.getElementById("name2");
        var player1 = document.getElementById("player1");
        var player2 = document.getElementById("player2");

        var selImage = document.createElement("input");
        selImage.type = "file";
        selImage.id = "selImage";
        selImage.addEventListener("change", handleFileSelection, false);
        menuBox.appendChild(selImage);

        var imageName = document.getElementById("imageName");
        var fake = document.getElementById("fake");
        var ok = document.getElementById("ok");
        var no = document.getElementById("no");
        var conversations = [];
        var symbols = [];
        var table = document.getElementById("tableBox");
        var symIndex = 1, conIndex = 1, tempData, jsonData, dataIndex = 0;
        var backToHome, homeIcon, backPage;
		var curDir, inSub = -99;

        ok.addEventListener("mouseup", accept, false);
        no.addEventListener("mouseup", cancel, false);
        right.addEventListener("mouseup", showit, false);
        left.addEventListener("mouseup", hiddit, false);
        exxit.addEventListener("mouseup", quitt, false);
        addSymbol.addEventListener("mouseup", addit, false);
        swap.addEventListener("mouseup", swapRole, false);
       // clearScreen.addEventListener("mouseup", clearAll, false);
        menuBox.addEventListener('animationend', stoppu, false);
		menuBox.addEventListener('webkitAnimationEnd', stoppu, false);
        undo.addEventListener('mousedown', UndoMove, false);
        undo.addEventListener('mouseup', Undo, false);

        document.onselectstart = function () { return false; }

        //var audio = new Audio();
       // var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();
		
		jsonData = { "home": [] }
                   curDir = jsonData.home;

        function UndoMove() {
            this.style.left = "92%";
        }

        function swapRole() {

            var vvv = player1.innerHTML;
            player1.innerHTML = player2.innerHTML;
            player2.innerHTML = vvv;

            var aaa = sentence.player1.role;
            sentence.player1.role = sentence.player2.role
            sentence.player2.role = aaa;

            if (turn === "player1") {
                turn = "player2";
                player1.style.background = "radial-gradient(#FF4500, #8B0000)";
                player2.style.background = "radial-gradient(#00FF00, #006400)";
            }
            else {
                turn = "player1";
                player2.style.background = "radial-gradient(#FF4500, #8B0000)";
                player1.style.background = "radial-gradient(#00FF00, #006400)";
            }

            clearAll();

        }

        function powerup() {
            localFolder.getFileAsync("saves.txt")
               .done(function (sampleFile) {
                   return Windows.Storage.FileIO.readTextAsync(sampleFile).then(function (data) {
                       jsonData = JSON.parse(data);;
                       curDir = jsonData.home;
                       loopJson(jsonData.home, 0)
                   });
               }, function () {
                   jsonData = { "home": [] }
                   curDir = jsonData.home;
               }
            );
        }

        function loopJson(js, inin) {
            for (var ff = 1 ; ff < 47 ; ff += 1) {
                symbols[ff].innerHTML = "";
            }
            symbols[47].style.display = "none";
            symIndex = 1;
            for (var i = inin; i < js.length; i += 1) {
                if (symIndex === 47) {
                    symbols[symIndex].style.display = "inline";
                    return;
                }
                if (js[i].type === "symbol") {
                    symbols[symIndex].appendChild(createSub(js[i].name, js[i].content, "sym"));
                }
                else {
                    symbols[symIndex].appendChild(createSub(js[i].name, "images/folder.png", "fol"));
                }
                symIndex += 1;
            }
        }

        function nextPage() {
            if (dataIndex == 0) {
                symbols[0].removeChild(symbols[0].childNodes[0]);
                symbols[0].appendChild(backPage);
            }
            dataIndex += 46;
            loopJson(curDir, dataIndex);
        }
		
        function previousPage() {
            dataIndex -= 46;
            if (dataIndex == 0) {
                symbols[0].removeChild(symbols[0].childNodes[0]);
                if (inSub != -99) {
                    symbols[0].appendChild(backToHome);
                }
                else {
                    symbols[0].appendChild(homeIcon);
                }
            }
            loopJson(curDir, dataIndex);
        }
        function toHome() {
            inSub = -99;
            curDir = jsonData.home;
            symbols[0].removeChild(symbols[0].childNodes[0]);
            symbols[0].appendChild(homeIcon);
            loopJson(curDir, dataIndex);
        }

        function quitt() {
            alert(JSON.stringify(jsonData));
        }

        function Undo() {

            if (sentence[turn].senten.length > 0) {
                conIndex -= 1;
                conversations[conIndex - 1].innerHTML = "";
                conversations[conIndex - 1].style.border = "2px #191970 dotted";
                sentence[turn].senten.pop();

                if (sentence[turn].senten.length == 0) {
                    if (sentence[turn].role === "Q") {

                        swap.style.border = "2px double #FFC680";
                        swap.style.background = "linear-gradient(#FFB459 50%, #FF9D26 50%)";
                        swap.style.color = "blue";
                        swap.style.opacity = "1";
                        swap.disabled = false;

                    }
                }
            }

            this.style.left = "94%";

        }
        function showit() {
            menuBox.style.animationName = 'bringUp';		
			menuBox.style.webkitAnimationName = 'bringUp';
        }
        function hiddit() {
            menuBox.style.animationName = 'bringOut';
			menuBox.style.webkitAnimationName  = 'bringOut';
        }
        function stoppu() {
            if (this.style.animationName === "bringUp" || this.style.webkitAnimationName === "bringUp") {
                this.style.top = "0%";
                this.style.left = "0%";
                right.style.display = "none";
                left.style.display = "inline";
            }
            else {
                this.style.top = "-40.5%";
                this.style.left = "-13%";
                left.style.display = "none";
                right.style.display = "inline";
            }
            this.style.animationName = '';
			this.style.webkitAnimationName  = '';
        }
        function addit() {
            deleteFile.style.display = "none";
            exxit.style.display = "none";
            addSymbol.style.display = "none";
            clearScreen.style.display = "none";
            category.style.display = "inline";
            selImage.style.display = "inline";
            imageName.style.display = "inline";
            fake.style.display = "inline";
            ok.style.display = "inline";
            no.style.display = "inline";
            minder.style.display = "inline";
            minder2.style.display = "inline";
        }

        function handleFileSelection(evt) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var tempimg = document.createElement("img");
                tempData = e.target.result;
                tempimg.src = tempData;
                tempimg.style.width = "100%";
                tempimg.style.height = "100%";
                fake.innerHTML = "";
                fake.appendChild(tempimg);
            }
            reader.readAsDataURL(evt.target.files[0]);
        }

        function accept() {
            var symblName = imageName.value.trim();
            var cate = category.value.trim(), cateI;
            if (symblName === "" && tempData === "") {
                //warning.style.display = "inline";
                return;
            }
            if (cate === "") {
                jsonData.home.push({ "name": symblName, "content": tempData, "type": "symbol" });
                if (inSub != -99) {
                    return;
                }
                if (symIndex > 46) {
                    symbols[47].style.display = "inline";
                    return;
                }
                symbols[symIndex].appendChild(createSub(symblName, tempData, "sym"));
                symIndex += 1;
            }
            else {
                cateI = dontExist(cate);
                if (cateI === "skull") {        
					jsonData.home.push({ "name": cate, "content": [{ "name": symblName, "content": tempData, "type": "symbol" }], "type": "folder" });
                    if (inSub != -99) {
                        return;
                    }
                    if (symIndex > 46) {
                        symbols[47].style.display = "inline";
                        return;
                    }
                    symbols[symIndex].appendChild(createSub(cate, "images/folder.png", "fol"));
                    symIndex += 1;
                }
                else {
                    jsonData.home[cateI].content.push({ "name": symblName, "content": tempData, "type": "symbol" });
                    if (inSub === cate) {
                        if (symIndex > 46) {
                            symbols[47].style.display = "inline";
                            return;
                        }
                        symbols[symIndex].appendChild(createSub(symblName, tempData, "sym"));
                        symIndex += 1;
                    }
                }
            }
            //tempData = "";
            //fake.innerHTML = "";
            //imageName.value = "";
            //cate.value = "";

            /*menuBox.removeChild(selImage);
			selImage = document.createElement("input");
			selImage.type = "file";
			selImage.id = "selImage";
			selImage.addEventListener("change", handleFileSelection, false);
			menuBox.appendChild(selImage);*/
        }
        function dontExist(cate) {
            for (var i = 0; i < jsonData.home.length; i += 1) {
                if (jsonData.home[i].name === cate && jsonData.home[i].type === "folder") {
                    return i;
                }
            }
            return "skull";
        }
        function changeBorder() {
            this.style.border = "1.5px green solid";
        }
        function backBorder() {
            this.style.border = "0px white solid";
        }
        function cancel() {
            deleteFile.style.display = "inline";
            exxit.style.display = "inline";
            addSymbol.style.display = "inline";
            clearScreen.style.display = "inline";

            selImage.style.display = "none";
            imageName.style.display = "none";
            fake.style.display = "none";
            ok.style.display = "none";
            no.style.display = "none";
            minder.style.display = "none";
            minder2.style.display = "none";
            category.style.display = "none";
        }

        function createSub(name, pic, type) {
            var sub = document.createElement("div");
            var txt = document.createElement("div");
            var img = document.createElement("img");
            sub.title = name;
            txt.innerHTML = "<span>" + name + "</span>";
            sub.className = "sub";
            txt.className = "symTxt";
            img.className = "symImg";
            if (type === "fol") {
                txt.className = "folTxt";
                img.className = "folImg";
                sub.addEventListener('mouseup', downIn, false);
                sub.addEventListener('mousedown', changeBorder, false);
                sub.style.webkitAnimationName = "zoom";
                sub.style.animationName = "zoom";
            }
            else if (type === "sym") {
                sub.addEventListener('mousedown', down, false);
                sub.className += " symSub";
                sub.style.webkitAnimationName = "flip";
                sub.style.animationName = "flip";
            }
            else if (type === "backhome") {
                sub.addEventListener("mouseup", toHome, false);
                sub.addEventListener('mousedown', changeBorder, false);
                sub.addEventListener('mouseup', backBorder, false);
            }
            else if (type === "back") {
                sub.addEventListener("mouseup", previousPage, false);
                sub.addEventListener('mousedown', changeBorder, false);
                sub.addEventListener('mouseup', backBorder, false);
            }
            else if (type === "sock") {
                sub.style.webkitAnimationName = "flop";
                sub.style.animationName = "flop";
                sub.style.left = "0px";
                sub.style.top = "0px";
            }
            img.src = pic;
            sub.appendChild(img);
            sub.appendChild(txt);
            return sub;
        }

        function setUp() {
            var i, j, imb;
            for (j = 1; j < 3; j += 1) {
                for (i = 1; i < 11; i += 1) {
                    imb = document.createElement("div");
                    imb.style.left = 14.2 + i * 0.6 + (i - 1) * 6.5 + "%";
                    imb.style.top = j + (j - 1) * 10 + "%";
                    imb.className = "box";
                    symbols.push(imb);
                    aut.appendChild(imb);
                }
            }
            for (j = 1; j < 3; j += 1) {
                for (i = 1; i < 15; i += 1) {
                    imb = document.createElement("div");
                    imb.style.left = 0.6 * i + (i - 1) * 6.5 + "%";
                    imb.style.top = 22 + j + (j - 1) * 10 + "%";
                    imb.className = "box";
                    symbols.push(imb);
                    aut.appendChild(imb);
                }
            }
		
			homeIcon = createSub("HOME", "view/Graphics/home.png", "home");			
            symbols[0].appendChild(homeIcon);		
			backPage = createSub("Previous page", "view/Graphics/back.png", "back");
			backToHome = createSub("Back to home", "view/Graphics/back.png", "backhome");		
            symbols[47].appendChild(createSub("Next page", "view/Graphics/more.png", "more"));		
            symbols[47].addEventListener("mouseup", nextPage, false);
            symbols[47].addEventListener('mousedown', changeBorder, false);
            symbols[47].addEventListener('mouseup', backBorder, false);
            symbols[47].style.display = "none";

            for (j = 1; j < 11; j += 1) {
                for (i = 1; i < 13; i += 1) {
                    imb = document.createElement("div");
                    imb.style.left = i * 0.8 + (i - 1) * 7.2 + "%";
                    imb.style.top = j * 2.5 + (j - 1) * 20 + "%";
                    imb.className = "socket";
                    conversations.push(imb);
                    table.appendChild(imb);
                }
            }
            swap.className = "swapEnable";
            swap.disabled = false;
        }

        var sentence = { "player1": { "role": "Q", "senten": [] }, "player2": { "role": "A", "senten": [] } }, turn = "player1", conStop = 1;

        //audio.defaultPlaybackRate = 0.7;

        function compuletu() {
            this.parentNode.removeChild(this);
        }

        function swapColor() {
            var speak = "", starImg;
            this.style.boxShadow = "";
            if (turn === "player1") {
                if (sentence.player1.senten.length == 0) {
                    return;
                }

                for (var jojo = 0; jojo < sentence[turn].senten.length; jojo += 1) {
                    speak += sentence[turn].senten[jojo] + " ";

                    starImg = document.createElement("img");
                    starImg.className = "starImg";
                    starImg.src = "view/Graphics/twinkle4.gif";
                    starImg.style.webkitAnimationName = "twinkle";
                    starImg.style.animationName = "twinkle";
                    starImg.addEventListener('animationend', compuletu, false);
                    conversations[conIndex - sentence[turn].senten.length + jojo - 1].appendChild(starImg);

                }
                

                player1.style.background = "radial-gradient(#FF4500, #8B0000)";
                player2.style.background = "radial-gradient(#00FF00, #006400)";
                turn = "player2";

                if (sentence.player2.role === "Q") {
                    sentence.player1.senten = [];
                    sentence.player2.senten = [];

                    swap.className = "swapEnable";
                    swap.disabled = false;
                }

            }
            else {
                if (sentence.player2.senten.length == 0) {
                    return;
                }

                for (var jojo = 0; jojo < sentence[turn].senten.length; jojo += 1) {
                    speak += sentence[turn].senten[jojo] + " ";

                    starImg = document.createElement("img");
                    starImg.className = "starImg";
                    starImg.src = "view/Graphics/twinkle4.gif";
                    starImg.style.webkitAnimationName = "twinkle";
                    starImg.style.animationName = "twinkle";
                    starImg.addEventListener('animationend', compuletu, false);
                    conversations[conIndex - sentence[turn].senten.length + jojo - 1].appendChild(starImg);

                }
               

                player1.style.background = "radial-gradient(#00FF00, #006400)";
                player2.style.background = "radial-gradient(#FF4500, #8B0000)";
                turn = "player1";

                if (sentence.player1.role === "Q") {
                    sentence.player1.senten = [];
                    sentence.player2.senten = [];

                    swap.className = "swapEnable";
                    swap.disabled = false;
                }

            }
            if (conColor === "orange") {
                conColor = "purple";
            }
            else {
                conColor = "orange";
            }

            conIndex = conIndex + (13 - conIndex % 12);
        }

        function ballshade() {
            this.style.boxShadow = "0px 0px 25px blue";
        }
        setUp();

        player1.style.background = "radial-gradient(#00FF00, #006400)";
        player1.style.height = player1.clientWidth + "px";
        player1.style.borderRadius = player1.clientWidth / 2 + "px";
        player1.addEventListener("mouseup", swapColor, false);
        player1.addEventListener("mousedown", ballshade, false);

        player2.style.background = "radial-gradient(#FF4500, #8B0000)";
        player2.style.height = player2.clientWidth + "px";
        player2.style.borderRadius = player2.clientWidth / 2 + "px";
        player2.addEventListener("mouseup", swapColor, false);
        player2.addEventListener("mousedown", ballshade, false);

        function clearAll() {
            for (var t = 0; t < 120; t += 1) {
                conversations[t].innerHTML = "";
                conversations[t].style.border = "2px #191970 dotted";
            }
            conIndex = 1;
            conColor = "purple";
            sentence.player1.senten = [];
            sentence.player2.senten = [];
        }

        var dragIds = {}, idd = 0;
        var conColor = "purple";
		var tableLeft = table.offsetLeft;
		var tableTop = table.offsetTop;
		var tableWidth = table.clientWidth;
		var tableHeight = table.clientHeight;
		var symWidth = symbols[0].clientWidth/2;
		var symHeight = symbols[0].clientHeight/2;
        function down() {
            var puss = document.createElement("img");
            puss.src = this.childNodes[0].src;
            puss.name = this.title;
            puss.id = idd + "d";
            idd += 1;
            puss.style.position = "absolute";
            puss.style.left = this.parentNode.style.left;
            puss.style.top = this.parentNode.style.top;
            puss.style.width = symWidth*2 + "px";
            puss.style.height = symHeight*2 + "px";
            puss.style.opacity = "0.8";
            aut.appendChild(puss);
            dragIds[puss.id] = [puss, puss.offsetLeft + symWidth, puss.offsetTop + symHeight];
            puss.addEventListener("mouseup", up, false);
            puss.addEventListener("mousemove", drag, false);
        }
        function up(event) {
            if (event.pageX >= tableLeft && event.pageX <= tableLeft + tableWidth && event.pageY >= tableTop && event.pageY <= tableTop + tableHeight) {
                conversations[conIndex - 1].appendChild(createSub(this.name, this.src, "sock"));
                conversations[conIndex - 1].style.border = "2px " + conColor + " solid";
                conIndex += 1;
                sentence[turn].senten.push(this.name);
                
				
                swap.className = "swapdisable";
                swap.disabled = true;

            }
            delete dragIds[this.id];
            aut.removeChild(this);
        }
        function upDate() {  
            for (var prop in dragIds) {
			
                if (dragIds.hasOwnProperty(prop)) {
                    dragIds[prop][0].style.left = dragIds[prop][1] - symWidth + 'px';
                    dragIds[prop][0].style.top = dragIds[prop][2] - symHeight + 'px';
                }
            }
            requestAnimationFrame(upDate);
        }
        upDate();
        function drag(event) {
            dragIds[this.id][1] = event.pageX;
            dragIds[this.id][2] = event.pageY;
        }

        function downIn() {
		
            dataIndex = 0;
            curDir = jsonData.home[dontExist(this.title)].content;
			
            symbols[0].removeChild(symbols[0].childNodes[0]);
			
            symbols[0].appendChild(backToHome);
            loopJson(curDir, dataIndex);
            inSub = this.title;
        }