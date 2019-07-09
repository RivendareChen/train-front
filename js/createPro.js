const localArray = [
    '请选择地域',
    '北京市', '天津市', '上海市', '重庆市', '香港特别行政区', '澳门特别行政区',
    '浙江省', '江苏省', '四川省', '山东省', '河南省', '河北省', '贵州省',
    '湖南省', '湖北省', '江西省', '安徽省', '福建省', '台湾省', '西藏省',
    '广东省', '广西省', '云南省', '内蒙古自治区', '西藏自治区', '新疆自治区',
    '辽宁省', '吉林省', '黑龙江省', '海南省', '陕西省', '山西省'
];

const typeArray = [
    '请选择行业',
    '互联网/软件', '餐饮', '土木建筑', '金融/投资', '通信/电子', '数码/家电',
    '装修', '外贸/出口', '零售'
];

let testInfo = {
    // 基本信息
    projectName: 'testPro', // 项目名称
    productName: 'product', // 产品类型
    projectType: 'type',    // 行业 选择
    projectLocal: 'cq',     // 项目地点 选择(省份)
    investmentScale: '1',   // 投资规模(万)
    contactInfo: '123456',  // 联系方式
    album:  '../images/1.jpg',  // 封面

    // 详情信息
    mainInfo: '', // 项目介绍
    advantageInfo: '', //项目优势
    parseInfo: '', // 项目进展
};


// editor构造函数
function editorInit(barId='#editor-bar', textId='#editor-text'){
    var E = window.wangEditor;
    var editor1 = new E(barId, textId);
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

function tagToInfo(tag){
    if(tag == 'select-main'){
        return 'mainInfo';
    }else if(tag == 'select-advantage'){
        return  'advantageInfo';
    }else{
        return 'parseInfo';
    }
}


(async ()=>{
    // 当前选择的tag
    let currTag = 'select-main';

    // 获取数据

    $(async function(){

        // 选项加载
        for(let i of localArray){ //加载地点
            $('#select-local').children('select').append(
                `<option value='${i}'>${i}</option>`
            );
        }
        for(let i of typeArray){ // 加载行业
            $('#select-type').children('select').append(
                `<option value='${i}'>${i}</option>`
            );
        }

        $('#overinfo').hover(function(){
            $('#overinfo').html('&nbsp&nbsp上传封面');
        }, function(){
            $('#overinfo').html('');
        });

        // 上传封面
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
                //testInfo.album =  '' 返回路径
                testInfo.album = '../images/1.jpg';
                $('#overinfo').css('background-image', `url('${testInfo.album}')`);
            }).fail(function(res) {
                alert('fail');
            });
        });
        
        // 初始化编辑器
        let editor1 = editorInit();
        $('.text').css('height', '700px');

        // 内容标签选择
        // 颜色初始化
        $('#select-main').css('color', 'black');
        $('#select-advantage').css('color', '#8790A4');
        $('#select-parse').css('color', '#8790A4');
        // 响应函数绑定
        $('#select-main').click(function(){
            $('#select-main').css('color', 'black');
            $('#select-advantage').css('color', '#8790A4');
            $('#select-parse').css('color', '#8790A4');
            //保存之前页面
            let currInfo = tagToInfo(currTag);
            testInfo[currInfo] = editor1.txt.html();
            //当前页面更新
            currTag = 'select-main';
            editor1.txt.html(testInfo.mainInfo);
        });
        $('#select-advantage').click(function(){
            $('#select-main').css('color', '#8790A4');
            $('#select-advantage').css('color', 'black');
            $('#select-parse').css('color', '#8790A4');
            //保存之前页面
            let currInfo = tagToInfo(currTag);
            testInfo[currInfo] = editor1.txt.html();
            //当前页面更新
            currTag = 'select-advantage';
            editor1.txt.html(testInfo.advantageInfo);
        });
        $('#select-parse').click(function(){
            $('#select-main').css('color', '#8790A4');
            $('#select-advantage').css('color', '#8790A4');
            $('#select-parse').css('color', 'black');
            //保存之前页面
            let currInfo = tagToInfo(currTag);
            testInfo[currInfo] = editor1.txt.html();
            //当前页面更新
            currTag = 'select-parse';
            editor1.txt.html(testInfo.parseInfo);
        });

        // 提交
        $('#submit-box').children('button').click(function(){
            // 保存最后一次更新
            testInfo[tagToInfo(currTag)] = editor1.txt.html();

            testInfo.projectName = $('#input-name').val();
            testInfo.productName = $('#input-product').val();
            testInfo.investmentScale = $('#input-scale').val();
            testInfo.contactInfo = $('#input-tel').val();
            testInfo.projectLocal = $('#select-local').children('select').val();
            testInfo.projectType = $('#select-type').children('select').val();
            
            // 传值打印
            console.log(testInfo.projectName);
            console.log(testInfo.productName);
            console.log(testInfo.investmentScale);
            console.log(testInfo.contactInfo);
            console.log(testInfo.projectLocal);
            console.log(testInfo.projectType);
            console.log(testInfo.mainInfo);
            console.log(testInfo.advantageInfo);
            console.log(testInfo.parseInfo);
            console.log(testInfo.album);
            console.log('_________________________________');

            //向后端发送
            /*
            try{
                var res = await axios.post('',{
                    content: testInfo
                });
            }catch(err){
                alert(err);
            }*/
            if(true){  //res.data.status == '1'
                alert('create success');
            }else{
                alert('sth wrong');
            }
            
        });
    });
})();