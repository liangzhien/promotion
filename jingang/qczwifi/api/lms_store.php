<?php
include "../inc/conn.php";

$api = 'http://lms.geely.com/glms/interface';

$act = isset($_GET['act']) ? $_GET['act'] : '';
switch ($act) {
	case 'province':
		$res = file_get_contents($api.'/Interfaces_getAreaMasterData.shtml?debug=1&type=1');
		echo $res;
		break;
	case 'city':
		$province = intval($_GET['province']);
		$res = file_get_contents($api.'/Interfaces_getAreaMasterData.shtml?debug=1&type=2&pid='.$province);
		echo $res;
		break;
	case 'store':
		$province = intval($_GET['province']);
		$city = intval($_GET['city']);
		$res = file_get_contents($api.'/Interfaces_getDealerData.shtml?debug=1&showtype=1&seriesid=30007&provinceid='.$province.'&cityid='.$city);
		echo $res;
		break;
	default:
		break;
}