let herfArray = window.location.href.split('/');
let projectId = herfArray[herfArray.length-1];

let testInfo = {
    // 基本信息
    projectName: 'testPro', // 项目名称
    productName: '软件系统', // 产品类型
    projectType: '互联网/软件',    // 行业 选择
    projectLocal: '重庆市',     // 项目地点 选择(省份)
    investmentScale: '100',   // 投资规模(万)
    contactInfo: '824857523',  // 联系方式
    album:  '../images/1.jpg',  // 封面
    
    // 详情信息
    mainInfo: '<p>hello world</p>', // 项目介绍
    advantageInfo: '<p>hello world</p><p>hello world</p><p>hello world</p>', //项目优势
    parseInfo: '<p>hello world</p><p>hello world</p>', // 项目进展

    // 评论
    topcomment: '3',          // 置顶评论ID
    comments:[
        {
            articleCommentID: '0',
            re_ArticleCommentID:'',
            content:'hello',
            time:'2019',
            username:'tom',
            userusrid:'11',
        },
        {
            articleCommentID: '1',
            re_ArticleCommentID:'',
            content:'world',
            time:'2019',
            username:'amy',
            userusrid:'12',
        },
        {
            articleCommentID: '2',
            re_ArticleCommentID:'1',
            content:'hi',
            time:'2019',
            username:'cc',
            userusrid:'13',
        },
        {
            articleCommentID: '3',
            re_ArticleCommentID:'',
            content:'hi',
            time:'2019',
            username:'kk',
            userusrid:'14',
        },
    ]
};

function subLayer(){
    // 关闭所有评论框
    $('#comment-box').find('#subarea').remove();
    // 新生成评论框
    let resId = this.id.split('subcom')[1];
    $('#cm'+resId).find('.layer-master').append(
        `<div id='subarea'>
            <textarea id='subtext'></textarea>
            <button id='subsubmit'>提交评论</button>
        </div>`
    );
    
    // 绑定提交按钮
    $('#subsubmit').click(async function(){
        let re_id = resId;
        let content = $('#subtext').val();
        let time = new Date().toLocaleDateString();
        let userid = '111'; // 从cookie获取
        let submitContent = {
            articleCommentID: '', // 当前评论id 后端自行分配
            re_ArticleCommentID: re_id, // 回复楼层的id
            content: content,
            time: time,
            username: 'xxx'+String(new Date().getTime()),  //用户昵称服务器自行查找
            userusrid: userid, // 从cookie获取
        };
        try{
            submitContent.articleCommentID = String(new Date().getTime()); //假设有ID 哟啊注释
            console.log(submitContent);
            /* 向后端传输
            let res = await axios.post('',{
                id: projectId,  //文章id
                content: submitContent
            }); */
            if(true){   // 不出意外的话 res.status == 1
                if(submitContent.re_ArticleCommentID != ''){
                    $('#cm'+submitContent.re_ArticleCommentID).append(
                        `<p>${submitContent.username}: ${submitContent.content} </p>`
                    );
                }
                $('#comment-box').find('#subarea').remove();
            }else{
                alert('bad');
            }
        }catch(err){
            alert(err);
        }
    });
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
    /*
    try{
        var testInfo = axios.post('', {
            id: projectId,
        });
        
    }catch(err){
        alert(err);
    }
    */

    $(async function(){

        // 显示封面图片
        $('#img-box').css('background-image', `url('${testInfo.album}')`);

        // 插入信息
        $('#i-box').append(
            `<h3>${testInfo.projectName}</h3>
             <p>产品类型: ${testInfo.productName}</p>
             <p>所属行业: ${testInfo.projectType}</p>
             <p>创业地点: ${testInfo.projectLocal}</p>
             <p>投资规模: ${testInfo.investmentScale}(万)</p>
             <p>联系方式: ${testInfo.contactInfo}</p>`
        );
        // 初始化内容
        $('#text-content').append(testInfo.mainInfo);

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
            // 替换内容
            $('#text-content').html(testInfo.mainInfo);
        });
        $('#select-advantage').click(function(){
            $('#select-main').css('color', '#8790A4');
            $('#select-advantage').css('color', 'black');
            $('#select-parse').css('color', '#8790A4');
            // 替换内容
            $('#text-content').html(testInfo.advantageInfo);
        });
        $('#select-parse').click(function(){
            $('#select-main').css('color', '#8790A4');
            $('#select-advantage').css('color', '#8790A4');
            $('#select-parse').css('color', 'black');
            // 替换内容
            $('#text-content').html(testInfo.parseInfo);
        });

        
        // 评论
        // 加载评论
        // 插入置顶评论
        for(let i of testInfo.comments){
            if(i.articleCommentID == testInfo.topcomment && i.re_ArticleCommentID==''){
                // 插入置顶评论 且置顶评论只能是主楼
                $('#comment-box').append(
                    `<div id='cm${i.articleCommentID}' class='cmtdivClass'>
                        <div class='layer-master'>
                            <p>置顶 ${i.username}: ${i.content}</p>
                        </div>
                        <button id='subcom${i.articleCommentID}' class='subcomClass'>评论</button>
                        <button id='top${i.articleCommentID}' class='topbtn'>置顶</button>
                        `
                );
                $('#comment-box').append(`</div><div id='diviceline'></div>`);
                break;
            }
        }
        // 先插入所有主楼
        for(let i of testInfo.comments){
            if(i.re_ArticleCommentID == '' && i.articleCommentID != testInfo.topcomment){
                $('#comment-box').append(
                    `<div id='cm${i.articleCommentID}' class='cmtdivClass'>
                        <div class='layer-master'>
                            <p>${i.username}: ${i.content}</p>    
                    </div>
                        <button id='subcom${i.articleCommentID}' class='subcomClass'>评论</button>
                        <button id='top${i.articleCommentID}' class='topbtn'>置顶</button>
                        `
                );
                $('#comment-box').append(`</div><div id='diviceline'></div>`);
            }
        }
        // 插入回复的回复
        for(let i of testInfo.comments){
            if(i.re_ArticleCommentID != ''){
                $('#cm'+i.re_ArticleCommentID).append(
                    `<p>${i.username}: ${i.content}</p>`
                );
            }
        }

        // 回复楼按钮绑定函数
        $('#layer-cmt').click(async function(){
            let submitContent = {
                articleCommentID: '', // 当前评论ID
                re_ArticleCommentID:'',// 此处必为空
                content: $('#layer-area').val(),
                time: new Date().toLocaleDateString(),
                username: '', // 服务器自行查找
                userusrid: '111' //从cookie中查找
            }
            submitContent.articleCommentID = String(new Date().getTime()); //假设有ID 哟啊注释
            submitContent.username = 'xxx'+String(new Date().getTime());
            console.log(submitContent);
            // 向后端传输
            try{
                /*
                let res = await axios.post('',{
                    id: projectId,  //文章id
                    content: submitContent
                });
                */
                if(true){ //不出意外的话 res.data.status == 1
                    // 插入评论中
                    $('#comment-box').append(
                        `<div id='cm${submitContent.articleCommentID}' class='cmtdivClass'>
                            <div class='layer-master'>
                                <p>${submitContent.username}: ${submitContent.content}</p>    
                        </div>
                            <button id='subcom${submitContent.articleCommentID}' class='subcomClass'>评论</button>
                            <button id='top${submitContent.articleCommentID}' class='topbtn'>置顶</button>
                            `
                    );
                    $('#comment-box').append(`</div><div id='diviceline'></div>`);
                    $(`#subcom${submitContent.articleCommentID}`).click(subLayer);
                } else{
                    alert('bad');
                }
            }catch(err){
                
            }
        });

        // 显示评论框 按钮
        $('.subcomClass').click(subLayer);
    });
})();