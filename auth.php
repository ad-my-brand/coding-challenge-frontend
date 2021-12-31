<?php 
	class Auth extends CI_Controller
	{
		public function submit()
		{
			$url='https://jsonplaceholder.typicode.com/users';
			$ch=curl_init($url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
			$result=curl_exec($ch);
			curl_close($ch);
			$data['users']=json_decode($result,true);

			$this->load->library('form_validation');
			$this->form_validation->set_rules('fo_ttl','title','required');
			$this->form_validation->set_rules('fo_bd','body','required');
			if($this->form_validation->run() == false)
			{
				$this->load->view('form',$data);
				$json_data['user_data']=json_encode($data);
				
			}
			else
			{}
		}

		
	}

 ?>