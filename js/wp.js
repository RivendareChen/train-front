let testInfo = {
    title:  'article1',
    keywds: '创业',
    bookface: '../images/1.jpg',
    content: '<p>hello world</p>'
};



// 初始化editor
function editorInit(){
    var facePath = String(new Date().getTime()%10);
    var E = window.wangEditor;
    var editor1 = new E('#editor-bar', '#editor-text');
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
    return editor1;
}





(async()=>{
    
$(async function(){

    // 初始化编辑器
    let editor1 = editorInit();

    // 上传封面点击
    $('#overinfo').hover(function(){
        $('#overinfo').html('&nbsp&nbsp上传封面');
    }, function(){
        $('#overinfo').html('');
    });

    // 上传封面响应
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
            // 成功上传封面 则返回url并设置封面
            testInfo.bookface = '../images/1.jpg'; // 此处赋为返回的url
            $('#overinfo').css('background-image', `url('${testInfo.bookface}')`);
        }).fail(function(res) {
            alert('fail');
        });
    });

    // 提交响应
    $('#sbmt').click(function(){
        testInfo.title = $('#get-title').val();
        testInfo.keywds = $('#get-type').val();
        testInfo.content = editor1.txt.html();

        console.log(testInfo.title);
        console.log(testInfo.keywds);
        console.log(testInfo.bookface);
        console.log(testInfo.content);

        //想后端提交所有内容
        /*
        try{
            let res = await axios.post('',{
                content: testInfo
            });
            if(res.data.status == '1'){
                alert('success');
            }else{
                alert('wrong')
            }
        }catch(err){
            alert(err);
        }
        */
    });

});

})();

