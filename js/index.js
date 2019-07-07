// 动态背景
var victor = new Victor("container", "output");
victor(["#18bbff", "#00486b"]).set();

// 注册蒙板
let outModel = true;
function signUp(){
    $('#registerModel').css('display', 'block'); // 显示蒙板
    outModel = false;
}

$(function() {
    $('#login #password').focus(function() {
        $('#owl-login').addClass('password');
    }).blur(function() {
        $('#owl-login').removeClass('password');
    });
});

// 登录
$('#loginButton').click(async function (){
    try{
        /* 注意更换为 新版本代码
        let res = await axios.post('',{
            email: $('#email').val(),
            password: $('#password').val()
        });
        if(res.data == 'ok'){
            window.location.href = 'http://www.baidu.com';
        }else if(res.data == 'bad'){
            alert('Wrong password');
        }else{
            alert('System Error');
        }
        */
       window.location.href = '../html/home.html';
    }catch(err){
        alert(err);
    }
});

// 注册
$('#registBtton').click(async function(){
    alert($('#passwordRR1').val());
    let email = $('#emailRR');
    let password = $('#passwordRR1').val();
    if(password != $('#passwordRR2').val()){
        alert('请确认密码');
        return;
    }
    alert('注册');
    /* 注意替换为新版本代码
    try{
        let res = await axios.post('', {
            emial: email,
            password:password,
            faver: []
        });
        if(res.data == 'ok'){
            alert('signup success');
        }else if(res.data == 'bad'){
            alert('user existed');
        }else{
            alert('System Error');
        }
    }catch{
        alert('System Error');
    }
    */
});

document.onclick = function(){
    // none or block
    let showModel = $('#registerModel').css('display');
    $('#registBlock').mouseover(function(){
        outModel = false;
    }).mouseout(function(){
        outModel = true;
    });
    if(showModel == 'block' && outModel == true){
        $('#registerModel').css('display', 'none');
    }
}