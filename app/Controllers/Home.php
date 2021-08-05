<?php

namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		// $ch = curl_init();
		// $curlConfig = array(
		//     CURLOPT_URL            => "https://jsonplaceholder.typicode.com/users",
		//     CURLOPT_POST           => true,
		//     CURLOPT_RETURNTRANSFER => true,
		//     // CURLOPT_POSTFIELDS     => array(
		//     //     'field1' => 'some date',
		//     //     'field2' => 'some other data',
		//     // )
		// );
		// curl_setopt_array($ch, $curlConfig);
		// $result = curl_exec($ch);
		// var_dump($result);

		// curl_close($ch);
		$users_list = [];
		try {
			$response = $this->updateCurlData(['get_users' => 1]);
			// $users_list_options = [];
			if ($response['status'] == 1) {
				$users_data = isset($response['data']) ? json_decode($response['data'], true) : [];
				if (!empty($users_data)) {
					foreach ($users_data as $each_user_key => $each_user_value) {
						$each_user_id = $each_user_value['id'];
						$each_user_name = $each_user_value['name'];
						$users_list[] = '<option value="'.$each_user_id.'">'. $each_user_name .'</option>';
					}
				}
			}
			// $this->pr($users_list); exit;
		} catch (Exception $e) {
			echo $e->getMessage();
		}
		$users_list_options = implode('', $users_list);
		return view('welcome_message', ['users_list_options' => $users_list_options]);
	}

	public function pr($params_arr = array()){
		echo "<pre>";
		print_r($params_arr);
		echo "</pre>";
	}

	public function saveUser(){
		$result = ['status' => 0, 'message' => "Operation failed"];
					$result = ['status' => 1, 'message' => "User data saved successfully "];
		echo json_encode($result);exit;
					

		if (isset($_REQUEST['userId'])) {
			$users_list = [];
			$userId = isset($_REQUEST['userId']) ? $_REQUEST['userId'] : '' ;
			$title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '' ;
			$body = isset($_REQUEST['body']) ? $_REQUEST['body'] : '' ;
			$params_arr = [
								'title' => $title,
								'body' => $body,
								'userId' => $userId
							];
			try {
				$response = $this->updateCurlData($params_arr);
				// $this->pr($response);exit;
				if ($response['status'] == 1) {
					$users_data = isset($response['data']) ? json_decode($response['data'], true) : [];
					$result = ['status' => 1, 'message' => "User data saved successfully "];
				}
			} catch (Exception $e) {
				$result = ['status' => 0, 'message' => $e->getMessage()];
			}
		}
		echo json_encode($result);exit;
	}

	public function updateCurlData($params_arr = array())
	{
		$curl_response = ['status' => 0, 'data' => []];
		if (!empty($params_arr)) {
			$curl_data = array();
			if(isset($params_arr['get_users']) && !empty($params_arr['get_users'])){
				$curl_url = "https://jsonplaceholder.typicode.com/users";
				$ch = curl_init($curl_url);
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
			}else{
				$curl_url = "https://jsonplaceholder.typicode.com/posts";
				$ch = curl_init($curl_url);
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
				$curl_data = [
								'title' => $params_arr['title'],
								'body' => $params_arr['body'],
								'userId' => $params_arr['userId'],
							];

			}
			curl_setopt($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($curl_data));
			$response = curl_exec($ch);
			// $test = json_decode($response, true);
			// echo "<pre>"; print_r($response); exit;
			curl_close($ch);
			$curl_response = ['status' => 1, 'data' => $response];
		}
		return $curl_response;
	}
}
