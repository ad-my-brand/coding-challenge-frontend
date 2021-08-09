function validation(){
    let user = document.forms['user_form']['users'].value.trim();
    let title = document.forms['user_form']['title'].value.trim();
    let body = document.forms['user_form']['body'].value.trim();
    let flag = 0;

    if(user == 'nil'){
        document.getElementById('users').className += " is-invalid";
        flag = 1;
    }else{
        document.getElementById("users").classList.remove("is-invalid");
        flag = 0;
    }

    if(title == ''){
        document.getElementById('title').className += " is-invalid";
        flag = 1;
    }else{
        document.getElementById("title").classList.remove("is-invalid");
        flag = 0;
    }

    if(body == ''){
        document.getElementById('body').className += " is-invalid";
        flag = 1;
    }else{
        document.getElementById("body").classList.remove("is-invalid");
        flag = 0;
    }

    if(flag == 1){
        return false;
    }else{
        return true;
    }
    
}