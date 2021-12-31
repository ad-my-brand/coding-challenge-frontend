<!DOCTYPE html>
<html>
<head>
	<script>
    function New(e) {
    	e.preventDefault();
      var userid = document.getElementById("fm_user").value;
      var new_title = document.getElementById("fo_ttl").value;
      var new_body = document.getElementById("fo_bd").value;

      console.log("Input Data: " + userid + " " + new_title + " " + new_body);

      fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: new_title,
            body: new_body,
            userId: userid
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log('response: ' + JSON.stringify(json));
        })
    }
  </script>
	<title>form</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url().'assets/css/bootstrap.css' ?>">
	<style type="text/css">
		#outer
		{
    		width:100%;
    		margin-top: 5%;
    		margin-left: 5%;
		}
		.inner
		{
  		  display: inline-block;
		}
	</style>
</head>
<body>
	
		<div class="container">
			<div class="col-md-6">
				<div class="card mt-4">
		  			<div class="card-header">
		    			Form	
		  			</div>
		  		<form name="fm" id="fm" action="<?php echo base_url().'index.php/auth/submit'?>" method="post">
		  			<div id="outer">
	       				<div class="inner">
	       					<label for="fm_user">users</label>
	       					<select name="select_item" class="select__sort" tabindex="0">
                          		<?php foreach($users as $user): ?>
                          		<option value="<?php echo $user['id'] ?>" id="fm_user" selected="selected"> <?php echo $user["name"] ?></option>
                          		<?php endforeach ?>
                    </select>
	       				</div>
	    			</div>

		  			<div class="card-body">
		    			<div class="form-group">
		    				<label for="fm_title">title</label>
		    				<input type="text" name="fo_ttl" id="fo_ttl" value="<?php echo set_value('fo_ttl') ?>" class="form-control" placeholder="title">
		    				<p><?php echo form_error('fo_ttl');  ?></p>
		    			</div>

		    			<div class="form-group">
		    				<label for="fm_body">body</label>
		    				<input type="text" name="fo_bd" id="fo_bd" value="<?php echo set_value('fo_bd') ?>" class="form-control" placeholder="body">
		    				<p><?php echo form_error('fo_bd');  ?></p>
		    			</div>

		    			<div class="form-group">
		    				<button class="btn btn-block btn-primary" onclick="New(event)" style="margin-top: 2%;"> Submit</button>
		    			</div>
		  			</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>