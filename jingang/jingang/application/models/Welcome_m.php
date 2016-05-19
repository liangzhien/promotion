<?php
class Welcome_m extends CI_Model{
	
	
	public function add($table,$data){
		$this->db->insert($table,$data);
		return $this->db->insert_id();
	}
	
	public function vin($mobile){
		$this->db->select('count(*) as num')->from('users');
		$this->db->where(array('mobile'=>$mobile));
		$res = $this->db->get()->row_array();
		return $res['num'];
	}
	
	
	public function getprovince(){
		$sql = "select province from city group by province";
		$query = $this->db->query($sql);
		$results = $query->result_array();
		return $results;
	}
	
	public function getp(){
		$sql = "select province,city,distributor,address from city ";
		$query = $this->db->query($sql);
		$results = $query->result_array();
		return $results;
	}
	
	public function getCity($province){
		$sql = "select city from city where province = '$province' group by city";
		$query = $this->db->query($sql);
		$results = $query->result_array();
		return $results;
	}
	
	public function getaddress($city){
		$sql = "select distributor  from city where city = '$city'";
		$query = $this->db->query($sql);
		$results = $query->result_array();
		return $results;
	}
	
}