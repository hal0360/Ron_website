<?php 
//Model
class PageModel {

	public function get($currency) {
		if (isset($this->rates[$currency])) {
			$rate = 1/$this->rates[$currency];
			return round($this->baseValue * $rate, 2);
		}
		else return 0;		
	}
	
	public function setNation($nation, $rate, $lan, $color) {
		$ape = "";
		$conn = new mysqli("localhost", "root", "", "firstdb");
		if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
		$sql = "INSERT INTO nation (nation, rate, locale, color) 
		VALUES ('$nation',$rate,'$lan','$color')";

		if ($conn->query($sql) === TRUE) {
			$ape =  "New record created successfully";
		} else {
			$ape =  "Error: " . $sql . "<br>" . $conn->error;
		}
		$conn->close();
		return $ape;
	}
	public function getNation($val, $lan) {
		$ape = array();
		$conn = new mysqli("localhost", "root", "", "firstdb");
		if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
		
		if($lan === "option1"){
			$result = $conn->query("SELECT nation, rate, color FROM nation WHERE locale='English'");
		}
		else{
			$result = $conn->query("SELECT nation, rate, color FROM nation");
		}
		
		while($row = $result->fetch_assoc()) {		
            array_push($ape,array($row["nation"], round($val/$row["rate"], 3), $row["color"]));		
		}

		$conn->close();
		return $ape;
	}
}
?>

