<?php
    $data  = file_get_contents('https://jsonplaceholder.typicode.com/users');
    $data = json_decode($data, true);
    $details = array();
    foreach($data as $value){
        $details[$value['id']] = $value['name'];
    }

    $users_err = $title_err = $body_err = "";
    if($_SERVER['REQUEST_METHOD']=='POST'){
    if(isset($_POST['submit'])){
       
       $user = $_POST['users'];
       $title = trim($_POST['title']);
       $body = trim($_POST['body']);

       if(empty($title)){
           $title_err = 'Enter the title';
       }else{
           $title_err = '';
       }

       if(empty($body)){
           $body_err = 'Enter the text';
       }else{
           $body_err = '';
       }

       if($user == 'nil'){
           $users_err = 'Please select a user';
       }else{
           $users_err = '';
       }

       if(empty($users_err) && empty($title_err) && empty($body_err)){
            $output = array(
                "userId" => $user,
                "title" => $title,
                "body" => $body
            );
            $json = json_encode($output);
            $url = 'https://jsonplaceholder.typicode.com/posts';
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            $result = curl_exec($ch);
       }
   }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Development</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="script.js"></script>
</head>
<body>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" onsubmit="return validation()" name="user_form">
        <div class="row mb-3">
            <label for="users" class="col-sm-2 col-form-label">Select User</label>
            <div class="col-sm-10">
                <select class="form-select" id="users" name="users">
                    <option selected value="nil">Select the user</option>
                    <?php
                        foreach($details as $id => $value){
                    ?>
                        <option value="<?php echo $id; ?>"><?php echo $value; ?></option>
                    <?php
                        }
                    ?>
                </select>
                <div class="invalid-feedback">
                    Please select a user.
                </div>
                <span class="help-block mb-3" style="color:red">
                    <small id="users_err"><?php echo $users_err; ?></small>
                </span>
            </div>      
        </div>

        <div class="row mb-3">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Title" name="title" id="title">
                <div class="invalid-feedback">
                    Please enter the title.
                </div>
                <span class="help-block mb-3" style="color:red">
                    <small id="title_err"><?php echo $title_err; ?></small>
                </span>
            </div>
        </div>

        <div class="row mb-3">
            <label for="body" class="col-sm-2 col-form-label">Body</label>
            <div class="col-sm-10">
                <textarea class="form-control" placeholder="Body" name="body" id="body"></textarea>
                <div class="invalid-feedback">
                    Please enter the text.
                </div>
                <span class="help-block mb-3" style="color:red">
                    <small id="body_err"><?php echo $body_err; ?></small>
                </span>
            </div>
        </div>
        <input type="submit" value="Submit" name="submit" class="btn btn-primary">
    
    
    </form>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>