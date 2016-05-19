<?php
include "../inc/conn.php";

$act = isset($_GET['act']) ? $_GET['act'] : '';
switch ($act) {
    case 'form':
        $f_name = isset($_POST['f_name']) ? addslashes($_POST['f_name']) : '';
        // $f_sex = isset($_POST['f_sex']) ? addslashes($_POST['f_sex']) : '';
        $f_type = isset($_POST['f_type']) ? addslashes($_POST['f_type']) : '';
        $f_phone = isset($_POST['f_phone']) ? addslashes($_POST['f_phone']) : '';
        $f_province = isset($_POST['f_province']) ? addslashes($_POST['f_province']) : '';
        $f_city = isset($_POST['f_city']) ? addslashes($_POST['f_city']) : '';
        $f_company = isset($_POST['f_company']) ? addslashes($_POST['f_company']) : '';
        $f_date = time();
        $f_id = date("YmdHis").mt_rand(10000,99999);

        $url = 'http://lms.geely.com/glms/interface/Interfaces_receiveMTLeads.shtml?debug=1';
        $data = array(
            'mt' => 'jinganggaotie',
            'qd' => '试驾',
            'leadtype' => 2,
            'modelid' => $f_type,
            'name' => $f_name,
            'phone' => $f_phone,
            'provincename' => $f_province,
            'cityname' => $f_city,
            'dealerid' => $f_company,
            'ext1' => $f_id
        );

        $ch = curl_init();
        // print_r($ch);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $res = curl_exec($ch);
        curl_close($ch);
        $res = json_decode($res,1);
        $res['f_id'] = $f_id;
        echo json_encode($res);
        break;
}