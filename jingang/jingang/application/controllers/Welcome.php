<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	
	private $call_back = '';
	
	private $url1 = "http://lms.geely.com/glms/interface/Interfaces_getAreaMasterData.shtml?debug=1";
	private $url4 = "http://lms.geely.com/glms/interface/Interfaces_getBrandData.shtml?debug=1";
	private $url5 = "http://lms.geely.com/glms/interface/Interfaces_getSeriesData.shtml?debug=1";
	private $url6 = "http://lms.geely.com/glms/interface/Interfaces_getModelData.shtml?debug=1" ;
	private $url7 = "http://lms.geely.com/glms/interface/Interfaces_getDealerData.shtml?debug=1";
	private $url8 = "http://lms.geely.com/glms/interface/Interfaces_receiveMTLeads.shtml?debug=1";
	public function __construct(){
		parent::__construct();
		$this->call_back = $_REQUEST['callback']; 
	}
	
	
	
	public function index()
	{
		$this->load->view('welcome_message');
	}
	
	
// 	public function test(){
// 		$sql = "select * from users where 1";
// 		$query = $this->db->query($sql);
// 		$result = $query->result_array();
// 		print_r($result);
// 	}
	
	public function adduser(){
		header("Content-Type:text/html;charset=utf-8");
		date_default_timezone_set('Asia/Shanghai');
		
		$orderTime = $this->input->get_post('orderTime');
		
		$arr = array('username','sex','mobile','province','city','distributor','source');
		
		foreach ($arr as $v){
			$data[$v] = $this->input->get_post($v);
		}
		
		$data['brand'] = "新金刚";
		
		if($data['sex'] == 1){
			$data['sex'] = "先生";
		}else{
			$data['sex'] = "女士";
		}
		
		
		if($data['source'] == 1){
			$data['source'] = "PC";
			$crm['ext1'] = "PC";
		}else{
			$data['source'] = "MOBILE";
			$crm['ext1'] = "MOBILE";
		}
		
		$data['createdAt'] = time();
// 		$data['orderTime'] = strtotime($orderTime);
		
// 		print_r($data);exit;

		$crm['seriesid'] = "30007";
		$crm['modelid'] = "";
		$crm['mt'] = 'jingangfuqinjie';
		$crm['qd'] = '试驾';
		$crm['leadtype'] = 2;
		$crm['brandid'] = 1;
		$crm['name'] = $data['username'];
		$crm['phone'] = $data['mobile'];
		$crm['originalcreatetime'] = time();
		$crm['content'] = "";
// 		$province = $this->get_html($this->url1."&type=1");
// 		$res = json_decode($province , true);
// 		$p = $res['body']['data'];
		
// 		foreach ($p as $v){
// 			if($data['province'] == $v['name']){
// 				$crm['provincename'] = $v['id'];
// 			}
// 		}
		
		$distributor = $this->get_html($this->url7.'&provinceid='.$crm['provincename']);
		$ss = json_decode($distributor , true);
		$d = $ss['body']['data'];
// 		print_r($d);exit;
		foreach ($d as $v){
			if($data['distributor'] == $v['dealerfullname'] || $data['distributor'] == $v['dealername']){
				$crm['provincename'] = $v['provinceid'];
				$crm['cityname'] = $v['cityid'];
				$crm['dealerid'] = $v['dealerid'];
				$crm['countyname'] = $v['countyid'];
			}
		}
		
		
		$insert = $this->Welcome_m->add('users',$data);
		$crm['originalleadid'] = $insert;
// 		var_dump($insert);exit;
// 		print_r($crm);exit;

		$ps = $this->http_post_data($this->url8, $crm);
		$result = json_decode($ps);
		
		if($result->success == 1){
			if($insert > 0){
				$status = 1;
	// 			$msg = "预约成功";
			}else{
				$status = 0;
	// 			$msg = "预约失败";
				
			}
		}
		
		$this->output($status);
	}
	
	
	
	
	public function getCity(){
		
		$this->output->cache(1440);
				
		$province = $this->Welcome_m->getprovince();
		
		foreach ($province as $k => $v){
			$city[$v['province']] = $this->Welcome_m->getCity($v['province']);
			
		}

		foreach ($city as $key => $val){
// 			print_r($key);exit;
			foreach ($val as $v){
				$add[$key][$v['city']] = $this->Welcome_m->getaddress($v['city']);
			}
		}
// 		print_r($add);exit;
// 		$this->output->enable_profiler(TRUE);
		$res['status'] = 1;
// 		$res['mag'] = "获取成功";
		$res['data'] = $add;
		exit("callback=".$this->call_back."(".json_encode($res).")");
	}
	
	
	public function test(){
		$province = $this->Welcome_m->getp();
		
		$arr = array();
		foreach ($province as $k => $v){
			if(!in_array($v['province'] ,$arr)){
				$arr[] = $v['province'];
			}
		}
		
		print_r($arr);
	}
	
	public function tt(){
		$province = $this->get_html($this->url1."&type=1");
		$res = json_decode($province , true);
		print_r($res['body']['data']);
	}
	
	public function testget(){
		$url = $this->url1.'&type=1';
		$res = $this->get_html($this->url7);
		$data = json_decode($res , TRUE);
// 		print_r($res);exit;
		if($data['success'] == 1){
			print_r($data['body']['data']);
		}else{
			echo 'error';
		}
	}
	
	public function testpost(){
		$url = "http://lms.geely.com/glms/interface/Interfaces_receiveMTLeads.shtml?debug=1";
		$arr = Array ( 'name' => 'test3', 
				'phone' => 18988888881, 
				'brandid' => 1, 
				'originalcreatetime' => 1437019336, 
				'leadtype' => 2 ,
				'provincename' => 510000 ,
				'cityname' => 510100 );
// 		echo md5($arr);exit;
		$post = $this->http_post_data($url, $arr);
		$data = json_decode($post);
		print_r($data->success);
	}
	
	
	private function output($status , $msg=''){
		$result['status'] = $status;
		$result['msg'] = $msg;
		exit("callback=".$this->call_back."(".json_encode($result).")");

	}
	
	private function get_html($url){
// 		$header = array('sign:' .$url['sign'],'channelcode:' .$url['channelcode']);
		$starttime = time();
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)");
// 		curl_setopt($ch, CURLOPT_HTTPHEADER, $header); //设置http头
		$res = curl_exec($ch);
		curl_close ($ch);
		return $res;
	}
	
	
	private function http_post_data($url, $data_string) {
	
		$ch = curl_init();
// 		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
// 		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
// 		'sign: 8c423ff0284b976e7543a42d5f7e9f46',
// 		'channelcode: jingangfuqinjie ')
// 		);
// 		ob_start();
// 		curl_exec($ch);
// 		$return_content = ob_get_contents();
// 		ob_end_clean();
	
		$res = curl_exec($ch);
		curl_close ($ch);
		return $res;
		
		
// 		$return_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
// 		return array($return_code, $return_content);
	}
	
}
