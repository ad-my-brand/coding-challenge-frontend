
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="https://getbootstrap.com/docs/4.0/assets/img/favicons/favicon.ico">

    <title>Trail Project </title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/">

    <!-- Bootstrap core CSS -->
    <link href="https://getbootstrap.com/docs/4.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/sticky-footer-navbar.css" rel="stylesheet">
    <style type="text/css">
    	label.error{color: red; font-size: 12px;}
    	input.error, select.error{border: 1px solid red;}
    </style>
  </head>

  <body>

    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="javascript:void(0);">Trail Project </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div> -->
      </nav>
      <div class="alert_message_div alert alert-dismissible fade show" role="alert" style="display: none; z-index: 9000; position: absolute; left: 35%; margin: 0 auto; width: 400px;">
		  <span class="alert_message"></span>
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
    </header>

    <!-- Begin page content -->
    <div class="col-sm-12"></div>
    <div class="container">
    	<div class="row" style="margin-top: 100px;">
    		<div class="col-sm-4"></div>
    		<div class="col-sm-4 shadow-none p-3 mb-5 bg-light rounded">
				<form action="Home/saveUser" autocomplete="off" id="user_form" role="form" method="post" accept-charset="utf-8">
					  <div class="form-group">
					    <label for="exampleInputEmail1">Users</label>
					    <select class="form-control form-control-sm userId" name="userId">
						  <option value="">Select</option>
						  <?php echo $users_list_options; ?>
						</select>
					  </div>
					  <div class="form-group">
					    <label for="title">Title</label>
					    <input type="text" name="title" class="form-control form-control-sm" id="title">
					  </div>
					  <div class="form-group">
					    <label for="body">Body</label>
					    <input type="text" class="form-control form-control-sm" id="body" name="body">
					  </div>
					  <a href="javascript:void(0);" class="btn btn-primary submit_a">Submit</a>
				</form>
    		</div>
    		<div class="col-sm-4"></div>

    	</div>
    </div>

    <footer class="footer">
      <div class="container">
        <span class="text-muted">Trail Project </span>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://getbootstrap.com/docs/4.0/assets/js/vendor/popper.min.js"></script>
    <script src="https://getbootstrap.com/docs/4.0/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
    <script src="public/js/jquery.form.js"></script>
    <script type="text/javascript">
    	$(document).ready(function (argument) {
    		$(document).on('click', '.submit_a', function (argument) {
	    		var validator_login = $("#user_form").validate({
	                rules: {
	                    'userId': {
	                        required: true,
	                    },
	                    'title': {
	                        required: true,
	                    },
	                    'body': {
	                        required: true,
	                    }
	                },
	                messages: {
	                    'userId': "Please select a user",
	                    'title': "Please fill title",
	                    'body': "Please fill body"
	                },
	            });
	            var is_form_valid = validator_login.form();
	            if (is_form_valid) {
	            	$('#user_form').ajaxForm({
                        success: function (res) {
		                	var result = $.parseJSON(res);
		                	$('.alert_message_div').show();
	                    	$('.alert_message_div').removeClass('alert-danger');
	                    	$('.alert_message_div').removeClass('alert-success');
	                    	$('.alert_message').text(result.message);
		                    if(result.status==1){
		                    	$('.alert_message_div').addClass('alert-success');
					            validator_login.resetForm();
		                    } else{
		                    	$('.alert_message_div').addClass('alert-danger');
		                    }
		                    setTimeout(function (argument) {
			                	$('.alert_message_div').hide();
		                    }, 3000);
		                }
	                }).submit();


	            	// var form_serialize = $("#user_form").serialize();
                 //    $.ajax({
                 //        url: '/Home/saveUser',
                 //        type: "Post",
                 //        data: form_serialize,
                 //        dataType: "json",
                 //        success: function (result) {
		               //  	var result = $.parseJSON(res);
	                //     	$('.alert_message_div').removeClass('alert-danger');
	                //     	$('.alert_message_div').removeClass('alert-success');
	                //     	$('.alert_message').text(result.message);
		               //      if(result.status==1){
		               //      	$('.alert_message_div').addClass('alert-success');
					            // validator_login.resetForm();
		               //      } else{
		               //      	$('.alert_message_div').addClass('alert-danger');
		               //      }
		               //  }
                 //    });

	            }else{
	            	console.log('in-valid')
	            }
	            return false;
    		})
    	});
    </script>
  </body>
</html>
