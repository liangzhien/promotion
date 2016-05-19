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
		}else{
			$data['source'] = "MOBILE";
		}
		
		$data['createdAt'] = time();
// 		$data['orderTime'] = strtotime($orderTime);
		
// 		print_r($data);exit;
		
		$insert = $this->Welcome_m->add('users',$data);
		
		if($insert > 0){
			$status = 1;
// 			$msg = "预约成功";
		}else{
			$status = 0;
// 			$msg = "预约失败";
			
		}
		
		$this->output($status);
	}
	
	
// 	public function test(){
// 		echo phpinfo();
// 	}
	
// 	"海南省":{
// 	"海口市":["海口市妇幼保健院","海口市第四人民医院","海口市第三人民医院","海口市人民医院","海南省人民医院","海南省妇幼保健院","海南医学院附属医院","海口市妇幼保健院解放路分院","海南省农垦那大医院","海南省农垦总医院","其他"],
// 	"三亚市":["三亚市人民医院","三亚市妇幼保健院","海南省农垦三亚医院","其他"],
// 	"琼海市":["琼海市中医院","琼海市人民医院","琼海市妇幼保健院","其他"]
// 	},
	
	
	
	
	
	
	
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
	
	
	private function output($status , $msg=''){
		$result['status'] = $status;
		$result['msg'] = $msg;
		exit("callback=".$this->call_back."(".json_encode($result).")");

	}
	
	
}
