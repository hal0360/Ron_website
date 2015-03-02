

function ping() {
    var arr, box = document.getElementById("boxy");
	var val = document.getElementById("curInput").value;
    
	var radi = document.getElementById("checkbox-1").checked;
	var x = 0, y = 0;
	var warning = document.getElementById("warning");
	warning.innerHTML = "";
	box.innerHTML = "";
	if(isNaN(val)){
		warning.innerHTML = "Error, not number";
		return;
	}
	
	var request = new XMLHttpRequest();
	if(!radi){
		request.open('GET', 'http://122.62.112.166/ronlu/model/rest.php?lan=blah&val=' + val, true);  
	}
	else{
		request.open('GET', 'http://122.62.112.166/ronlu/model/rest.php?lan=option1&val=' + val, true); 
	}    
    request.send();
    
    var xmlHttpTimeout = setTimeout(function() {
        request.abort();
        warning.innerHTML = "Error, timeout";
    }, 8000); 
        
    request.onload = function() {
        clearTimeout(xmlHttpTimeout);
        if (request.status >= 200 && request.status < 400) { 
            arr = JSON.parse(request.responseText);
            
            for(var i = 0; i < arr.length; i += 1){
				box.innerHTML += '<div class="divInput" style="left: '+(x*200 + 60)+'px; top: '+(y*60 + 100)+'px; color: '+arr[i][2]+';">' + arr[i][0] + '<input type="float" class="dummy"/><input class="curBox" type="float" value="' + arr[i][1] + '" disabled/></div>';
				x += 1;
				if(x == 2){
					y += 1;
					x = 0;
				}
			}
			
        } else {
            warning.innerHTML = "Error, bad";
        }
    };
    request.onerror = function() {
 
        warning.innerHTML = "Error, no connection";
    };
}