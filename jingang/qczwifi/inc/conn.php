<?php
include "config.php";

$link=mysql_connect($mysql_ip,$mysql_user,$mysql_pass);
if(!$link)die(mysql_error());
mysql_select_db($mysql_database);
mysql_query("set names utf8");
ini_set('date.timezone','Asia/Shanghai');

function execute($sql,$num=0){
	$result_execute=mysql_query($sql);
    $array_execute=mysql_fetch_array($result_execute);
	if(count($array_execute)>2) return $array_execute;
	else return $array_execute[$num];
}

function getWxuser($openid){
    $result = mysql_query("select * from app_wxuser where openid='$openid'");
    if($result) return mysql_fetch_assoc($result);
    else return false;
}

function randCode($length = 8, $type = 0) {
    $arr = array(1 => "123456789", 2 => "abcdefghijklmnopqrstuvwxyz");
    if ($type == 0) {
        array_pop($arr);
        $string = implode("", $arr);
    } elseif ($type == "-1") {
        $string = implode("", $arr);
    } else {
        $string = $arr[$type];
    }
    $count = strlen($string) - 1;
    $code = '';
    for ($i = 0; $i < $length; $i++) {
        $code .= $string[rand(0, $count)];
    }
    return $code;
}