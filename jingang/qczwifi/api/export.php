<?php
include "../inc/conn.php";

header("Content-type:application/vnd.ms-excel"); 
header("Content-Disposition:attachment; filename=users_".date('YmdHis').".xls");

$sql="select * from app_form order by f_id desc";
$result=mysql_query($sql);
echo 'ID'.chr(9);
echo iconv('UTF-8', 'GBK', '客户端').chr(9);
echo iconv('UTF-8', 'GBK', '姓名').chr(9);
// echo iconv('UTF-8', 'GBK', '性别').chr(9);
echo iconv('UTF-8', 'GBK', '电话').chr(9);
echo iconv('UTF-8', 'GBK', '车型').chr(9);
echo iconv('UTF-8', 'GBK', '省份').chr(9);
echo iconv('UTF-8', 'GBK', '城市').chr(9);
echo iconv('UTF-8', 'GBK', '经销商').chr(9);
echo iconv('UTF-8', 'GBK', '时间').chr(9);
echo chr(13);
while ($rs=mysql_fetch_assoc($result)){
	echo $rs['f_id'].chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_ua']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_name']).chr(9);
	// echo iconv('UTF-8', 'GBK', $rs['f_sex']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_phone']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_type']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_province']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_city']).chr(9);
	echo iconv('UTF-8', 'GBK', $rs['f_company']).chr(9);
	echo $rs['f_date'].chr(9);
	echo chr(13);
}