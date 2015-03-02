<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST');
include('model.php');

$rr = $_GET["val"];
$lan = $_GET["lan"];
$model = new PageModel();
$result = $model->getNation($rr,$lan);

echo json_encode($result);
?>