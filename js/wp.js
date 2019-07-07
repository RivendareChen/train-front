/*
$('#upload').click(function(){
    alert('submit');
});

$('#uploadForm').change(function(){
    
    var formData = new FormData($("#uploadForm")[0])
    formData.append('file', $('#file')[0].files[0]);
    $.ajax({
        url: 'pictureupload',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function(res) {
        alert('ok');
    }).fail(function(res) {
        alert('fail');
    });
});
*/


// 配合editor
var facePath = String(new Date().getTime()%10);
var E = window.wangEditor;
var editor1 = new E('#div3');

editor1.customConfig.uploadImgServer = '/upload-img';
editor1.customConfig.uploadImgHooks = {
    // 上传之前
    before: function(xhr, editor, files){
        console.log(files[0]);
    },
    // 上传成功 插入成功
    success: function(xhr, editor, result){
        console.log('ok');
    },
    // 上传成功 插入失败
    fail: function(xhr, editor, result){
        console.log('bad');
    },
    // 上传就已经失败
    error:function(xhr, editor){
         console.log('error');
    },
    // 上传超时
    timeout: function(xhr, editor){
        console.log('timeout');
    }
}
editor1.create();


(async()=>{
    

})();

