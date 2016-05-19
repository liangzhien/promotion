<?php
include "../inc/conn.php";

$act = isset($_GET['act']) ? $_GET['act'] : '';
switch ($act) {
	case 'province':
		getProvince();
		break;
	case 'city':
		$province = addslashes($_GET['province']);
		getCity($province);
		break;
	case 'store':
		$province = addslashes($_GET['province']);
		$city = addslashes($_GET['city']);
		getStore($province,$city);
		break;
	default:
		break;
}

function getProvince(){
	$sql = "select distinct s_province from app_store";
	$result = mysql_query($sql);
	$rows = mysql_num_rows($result);
	$data = array();
	if($rows > 0){
		$i = 0;
		while($rs = mysql_fetch_assoc($result)){
			$data[$i]['province'] = $rs['s_province'];
			$i++;
		}
	}
	echo json_encode(array('code' => 1, 'msg' => '', 'data' => $data));
}

function getCity($province){
	$sql = "select distinct s_city from app_store where s_province='$province'";
	$result = mysql_query($sql);
	$rows = mysql_num_rows($result);
	$data = array();
	if($rows > 0){
		$i = 0;
		while($rs = mysql_fetch_assoc($result)){
			$data[$i]['city'] = $rs['s_city'];
			$i++;
		}
	}
	echo json_encode(array('code' => 1, 'msg' => '', 'data' => $data));
}

function getStore($province,$city){
	$sql = "select * from app_store where s_province='$province' and s_city='$city'";
	$result = mysql_query($sql);
	$rows = mysql_num_rows($result);
	$data = array();
	if($rows > 0){
		$i = 0;
		while($rs = mysql_fetch_assoc($result)){
			$data[$i]['title'] = $rs['s_title'];
			$data[$i]['company'] = $rs['s_company'];
			$data[$i]['address'] = $rs['s_address'];
			$data[$i]['dealerid'] = $rs['s_dealerid'];
			$i++;
		}
	}
	echo json_encode(array('code' => 1, 'msg' => '', 'data' => $data));
}
?>