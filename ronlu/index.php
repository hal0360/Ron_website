<html>
<head>
<?php
    include 'controller/controller.php';
	$pagecontroller = new PageController();
	$pagecontroller->requestCSS($_POST);
?>
<style>
html{
	-webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

body{
	background: #F0FFFF;
	overflow: hidden;
}
#footer{
	position: absolute;
	left: -10px;
	top: 775px;
	width: 100%;
	height: 130px;
	
	border: 10px double #800080;
}
#barmenu{
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 180px;
	background: -webkit-linear-gradient(#800080, #9370DB); 
	background: linear-gradient(#800080, #9370DB);
}
.buttonn {
			position: absolute;
            border-radius: 10px;  
			
            height: 69px;
            width: 10%;
            font: 23px Arial, Helvetica;
            text-shadow: 0 1px 0 rgba(255,255,255,0.5);
			border: 5px double #FFC680;
			background: linear-gradient(#FFB459 50%, #FF9D26 50%);
			color: green;
white-space: normal;
        }

		.buttonn:active{
			border: 2px solid orange;
		    background: yellow;
			color: red;
		}
			
		#header{
			position: absolute;
			left: 2%;
			top: 5px;
			font: bold 35px Arial, Helvetica;
            text-shadow: 0 1px 0 rgba(255,255,255,0.5);
			color: yellow;
		}		
</style>
<head/>
<body>
<div id="barmenu">
<h1 id="header">Ron Lu's personal website</h1>
<form action="" method="post">
<input class="buttonn" name="buttonn" style="left: 3%; top: 80px;" type="submit" value="Home" /> 
<input class="buttonn" name="buttonn" style="left: 14%; top: 80px;" type="submit" value="Exchange rate" />	
<input class="buttonn" name="buttonn" style="left: 25%; top: 80px;" type="submit" value="Exchange rate (Using AJAX)" />	
<input class="buttonn" name="buttonn" style="left: 36%; top: 80px;" type="submit" value="Tank wars" />	
<input class="buttonn" name="buttonn" style="left: 47%; top: 80px;" type="submit" value="Autism game" />	
<input class="buttonn" name="buttonn" style="left: 58%; top: 80px;" type="submit" value="Timesheet" />
<input class="buttonn" name="buttonn" style="left: 69%; top: 80px;" type="submit" value="Admin" />
</form>
</div>
<?php 
	$pagecontroller->requestPage($_POST);
?>
<div id="footer">
   <?php
echo "<h2>Last request time from server: " . date("l jS \of F Y h:i:s A") . "</h2>";

?>
</div>
</body>
</html>

