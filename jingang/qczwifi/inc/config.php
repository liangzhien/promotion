<?php
if (strpos($_SERVER['HTTP_HOST'],'hihcar.com') !== false || strpos($_SERVER['HTTP_HOST'],'geely.com') !== false){
	include "config.official.php";
}else{
	include "config.debug.php";
}