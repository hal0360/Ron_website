<?php
class PageView {
    
	public function home() {
		$html = '<img id="home" src="view/Graphics/bighome.png"/>
		<div id="help"><h1>Welcome to my site</h1>This website used CSS3 properties. Therefore, some of the features in this site (such as animation) might not work in older version of the browser<br><br>It is recommended that you upgrade to IE 10 or above if you are using Internet Explorer.</div>';		
		return $html;
	}
	
	public function exchange_ajax() {
		$html = '<div id="exchange">
					    <div id="curDiv">
						Enter a value
						<input id="curInput" type="float"/>	
						<input id="curSub" type="submit" onclick="ping()"/>
						</div>
						<div id="checkbox">
						<input id="checkbox-1" type="checkbox"/>
						<label for="checkbox-1">Show English nation only</label></div>
						<p id="warning" style="color: red;"></p>
						<form id="boxy"></form>
					</div><div id="help"><h1>Currency coverter using AJAX</h1>This currency converter subpage uses the AJAX method instead of MVC.</div>
					<script src="controller/js/exchange.js"></script>';						
		return $html;
	}
	
	public function exchange($result, $warning) {
		$html = '<div id="exchange">
					<form action="" method="post">	
					    <div id="curDiv">
						Enter a value
						<input id="curInput" name="dollar" type="float"/>	
						<input id="curSub" type="submit" value="Convert"/>
						<input name="buttonn" type="hidden" value="Exchange rate" />	
						</div>
						<div id="checkbox">
						<input id="checkbox-1" type="checkbox" name="english" value="option1" />
						<label for="checkbox-1">Show English nation only</label></div>
					</form>	
					<p id="warning" style="color: red;">' . $warning . '</p>';
		$x = 0;
		$y = 0;
		foreach($result as $item) {
			$html .= '<div class="divInput" style="left: '.($x*200 + 60).'px; top: '.($y*60 + 100).'px; color: '.$item[2].';">' . $item[0] . '<input type="float" class="dummy"/><input class="curBox" type="float" value="' . $item[1] . '" disabled/></div>';
			$x += 1;
			if($x == 2){
				$y += 1;
				$x = 0;
			}
		}	
			$html .= '</div><div id="help"><h1>Currency coverter</h1>The currency converter display a list of equivalent amount of money from different nations as soon as user enter a value and submit it through the convert button<br><br>This sub page implement the MVC design pattern</div>';		
		return $html;
	}

	public function autism() {
		$html = '<div id="aut"><div id="player1" class="playerBall" style="left: 4.3%;"><p id="name1">Question</p></div>
    <div id="player2" class="playerBall" style="left: 89.3%;"><p id="name2">Answer</p></div>
    <div id="tableBox"></div>

    <div id="menuBox">
        <button id="addSymbol" class="menuButton" style="top: 18%; left: 10%;">Add content</button>
        <button id="clearScreen" class="menuButton" style="top: 36%; left: 10%;">Clear screen</button>
        <button id="deleteFile" class="menuButton" style="top: 54%; left: 10%;">Delete files</button>
        <button id="exxit" class="menuButton" style="top: 72%; left: 10%;">Exit game</button>
        <div class="arrow" id="right"></div>
        <div class="arrow" id="left"></div>
        <div id="fake"><span>Tap here to upload an image</span></div>
        <input id="imageName" type="text" />
        <input id="category" type="text" />
        <button id="ok">OK</button>
        <button id="no">Back</button>
        <p id="minder">Name of the symbol:</p>
        <p id="minder2">Category:</p>
    </div>
    <button id="swap" class="control" style="top: 90%; left: 45%;">SWAP</button>
    <div id="undo"><div id="arrow-left"></div><p id="Untext">Undo</p></div>
	</div><div id="help"><h1>Game for children with autism</h1>Game I developed for Calleghan Innovation during internship.<br><br>More imformation coming soon.</div>
	<script src="controller/js/autism.js"></script>';	
		return $html;
	}

	public function tank() {
		$html = '<canvas id="MyCan" width="1880px" height="1040px"></canvas>
		<div id="help"><h1 style="color: yellow;">Tank war</h1>I might convert this game into Phonegap app in the future</div>
<script src="controller/js/tankwar.js"></script>';		
		return $html;
	}
	
	public function timesheet() {
		$html = '<img id="sheet" src="view/Graphics/construction.png"/>';
		
		return $html;
	}
	
	public function admin() {
		$html = '<div style="width: 400px; height: 400px; border: 3px double orange;">
		<form action="" method="post">
		            <h3>Country</h3>
					<input name="country" type="text"/>	
					<h3>Rate</h3>
					<input name="rate" type="float"/>	
					<h3>Color</h3>
					<input name="color" type="text"/>	
					<h3>Language</h3>
					<input name="lan" type="text"/>	
					<input type="submit"/>
					<input name="buttonn" type="hidden" value="Admin" />
					<form/>
				</div>';
				
		$html = '<img id="admin" src="view/Graphics/construction.png"/>';		
		
		return $html;
	}
}

?>