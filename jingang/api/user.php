<?php
include "../inc/conn.php";

$act = isset($_GET['act']) ? $_GET['act'] : '';
switch ($act) {
    // DMS
    case 'form':
        $f_ua = isset($_POST['f_ua']) ? addslashes($_POST['f_ua']) : '';
        $f_name = isset($_POST['f_name']) ? addslashes($_POST['f_name']) : '';
        $f_phone = isset($_POST['f_phone']) ? addslashes($_POST['f_phone']) : '';
        $f_province = isset($_POST['f_province']) ? addslashes($_POST['f_province']) : '';
        $f_city = isset($_POST['f_city']) ? addslashes($_POST['f_city']) : '';
        $f_company = isset($_POST['f_company']) ? addslashes($_POST['f_company']) : '';
        $f_dealerid = isset($_POST['f_dealerid']) ? addslashes($_POST['f_dealerid']) : '';
        $f_date = date('Y-m-d H:i:s');

        if(execute("select count(0) from app_form where f_phone='$f_phone'") > 0){
            echo json_encode(array('code' => -3, 'msg' => '您已提交过了')); exit;
        }

        $result = mysql_query("insert into app_form (f_ua,f_name,f_phone,f_province,f_city,f_company,f_date)
            values ('$f_ua','$f_name','$f_phone','$f_province','$f_city','$f_company','$f_date')");
        if($result){
            $f_id = mysql_insert_id();
            $url = 'http://121.43.187.244/integration.do?_serviceid=98519&_method=insertNtTpCustomersMediaMethod&_service_password=WBSAgciAfDnRdabm&_response_type=json&';
            $data = array(
                'mt' => 'newjingang',
                'qd' => '试驾',
                'leadtype' => 2,
                'seriesid' => 'qxjg',
                'name' => $f_name,
                'phone' => $f_phone,
                'dealerid' => $f_dealerid,
                'originalcreatetime' => time(),
                'ext1' => $f_id
            );
            $res = file_get_contents($url.http_build_query($data));
            @mysql_query("update app_form set f_res='$res' where f_id=$f_id");
            echo json_encode(array('code' => 1, 'msg' => '提交成功', 'f_id' => $f_id));
        }else{
            echo json_encode(array('code' => -1, 'msg' => '提交失败'));
        }
        break;
    /*
    // LMS
    case 'form':
        $f_ua = isset($_POST['f_ua']) ? addslashes($_POST['f_ua']) : '';
        $f_name = isset($_POST['f_name']) ? addslashes($_POST['f_name']) : '';
        $f_phone = isset($_POST['f_phone']) ? addslashes($_POST['f_phone']) : '';
        $f_province = isset($_POST['f_province']) ? addslashes($_POST['f_province']) : '';
        $f_city = isset($_POST['f_city']) ? addslashes($_POST['f_city']) : '';
        $f_company = isset($_POST['f_company']) ? addslashes($_POST['f_company']) : '';
        $f_dealerid = isset($_POST['f_dealerid']) ? addslashes($_POST['f_dealerid']) : '';
        $f_date = date('Y-m-d H:i:s');

        if(execute("select count(0) from app_form where f_phone='$f_phone'") > 0){
            echo json_encode(array('code' => -3, 'msg' => '您已提交过了')); exit;
        }

        $result = mysql_query("insert into app_form (f_ua,f_name,f_phone,f_province,f_city,f_company,f_date)
            values ('$f_ua','$f_name','$f_phone','$f_province','$f_city','$f_company','$f_date')");
        if($result){
            $f_id = mysql_insert_id();
            $url = 'http://lms.geely.com/glms/interface/Interfaces_receiveMTLeads.shtml?debug=1';
            $data = array(
                'mt' => 'quanxinjingang',
                'qd' => '试驾',
                'leadtype' => 2,
                'seriesid' => 30007,
                'name' => $f_name,
                'phone' => $f_phone,
                'dealerid' => $f_dealerid,
                'originalcreatetime' => time(),
                'ext1' => $f_id
            );
            $res = post($url, $data);
            @mysql_query("update app_form set f_res='$res' where f_id=$f_id");
            echo json_encode(array('code' => 1, 'msg' => '提交成功', 'f_id' => $f_id));
        }else{
            echo json_encode(array('code' => -1, 'msg' => '提交失败'));
        }
        break;
        */
}