<?php
include('../ronlu/view/view.php');
include '../ronlu/model/model.php'; 
class PageController {
	private $view, $model;
	public function __construct() {
		$this->view = new PageView();
		$this->model = new PageModel();
	}
	public function requestCSS($val) {
		if(isset($val["buttonn"])){
			switch ($val["buttonn"]) {
				case "Exchange rate":
					echo '<link rel="stylesheet" href="view/css/exchange.css" type="text/css">';
					break;
				case "Exchange rate (Using AJAX)":
					echo '<link rel="stylesheet" href="view/css/exchangeajax.css" type="text/css">';
					break;	
				case "Autism game":
					echo '<link rel="stylesheet" href="view/css/autism.css" type="text/css">';
					break;
				case "Tank wars":
					echo '<link rel="stylesheet" href="view/css/tankwar.css" type="text/css">';
					break;
				case "Timesheet":
					echo '<link rel="stylesheet" href="view/css/timesheet.css" type="text/css">';
					break;		
				case "Admin":
					echo '<link rel="stylesheet" href="view/css/admin.css" type="text/css">';
					break;	
				default:
					echo '<link rel="stylesheet" href="view/css/home.css" type="text/css">';
			}
		}
		else{
			echo '<link rel="stylesheet" href="view/css/home.css" type="text/css">';
		}
	}
	public function requestPage($val) {
		if(isset($val["buttonn"])){
			switch ($val["buttonn"]) {
				case "Exchange rate":
					$this->getNation($val);
					break;
				case "Exchange rate (Using AJAX)":
					echo $this->view->exchange_ajax();
					break;	
				case "Autism game":
					echo $this->view->autism();
					break;
				case "Tank wars":
					echo $this->view->tank();
					break;
				case "Timesheet":
					echo $this->view->timesheet();
					break;		
				case "Admin":
					echo $this->view->admin();
					$this->admin($val);
					break;	
				default:
					echo $this->view->home();
			}
		}
		else{
			echo $this->view->home();
		}
	}
	
	public function admin($val) {
		if (isset($val["country"])){
			
			echo $this->model->setNation($val["country"], $val["rate"], $val["lan"], $val["color"]);
		}
		else{
			echo "dick";
		}		
	}
	public function getNation($val) {
		if (isset($val["dollar"])){
			if (is_numeric($val["dollar"])){
				$result = $this->model->getNation($val["dollar"],$val["english"]);
				echo $this->view->exchange($result,"");
			}
			else{
				echo $this->view->exchange(array(),"Error, enter numeric only");
			}
		}
		else{
			echo $this->view->exchange(array(),"");
		}		
	}
}
?>