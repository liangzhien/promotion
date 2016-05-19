<?php
include "../inc/conn.php";

$act = isset($_GET['act']) ? $_GET['act'] : '';
switch ($act) {
    case 'form':
        $f_ua = isset($_POST['f_ua']) ? addslashes($_POST['f_ua']) : '';
        $f_name = isset($_POST['f_name']) ? addslashes($_POST['f_name']) : '';
        $f_sex = isset($_POST['f_sex']) ? addslashes($_POST['f_sex']) : '';
        $f_phone = isset($_POST['f_phone']) ? addslashes($_POST['f_phone']) : '';
        $f_type = isset($_POST['f_type']) ? addslashes($_POST['f_type']) : '';
        $f_province = isset($_POST['f_province']) ? addslashes($_POST['f_province']) : '';
        $f_city = isset($_POST['f_city']) ? addslashes($_POST['f_city']) : '';
        $f_company = isset($_POST['f_company']) ? addslashes($_POST['f_company']) : '';
        $f_date = date('Y-m-d H:i:s');

        if(execute("select count(0) from app_form where f_phone='$f_phone'") > 0){
            echo json_encode(array('code' => -3, 'msg' => '您已提交过了')); exit;
        }

        $result = mysql_query("insert into app_form (f_ua,f_name,f_sex,f_phone,f_type,f_province,f_city,f_company,f_date)
            values ('$f_ua','$f_name','$f_sex','$f_phone','$f_type','$f_province','$f_city','$f_company','$f_date')");
        if($result){
            $f_id = mysql_insert_id();
            echo json_encode(array('code' => 1, 'msg' => '提交成功', 'f_id' => $f_id));
        }else{
            echo json_encode(array('code' => -1, 'msg' => '提交失败'));
        }
        break;
}