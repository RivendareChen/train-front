let testInfo = {
    mainContent: "<p>hello world</p>",
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
            re_ArticleCommentID:'0',
            content:'hi',
            time:'2019',
            username:'kk',
            userusrid:'14',
        },
    ]
};


function findAuthor(re_id){
    for(let i of testInfo.comments){
        if(i.articleCommentID == re_id){
            return i.username;
        }
    }
    return 'unknown';
}


(async()=>{
    /*
    try{
        let testInfo = await axios.post('',{
            id: '1'
        });
    }catch(err){
        alert(err);
    }
    */
    $(async function(){
        // 加载文章内容
        $('#main-box').append(testInfo.mainContent);
        
        //加载评论
        // 先插入所有主楼
        for(let i of testInfo.comments){
            if(i.re_ArticleCommentID == ''){
                $('#comment-box').append(
                    `<div id='cm${i.articleCommentID}'>
                    <p>${i.username}: ${i.content}</p>
                    </div>
                    <button id='subcom${i.articleCommentID}' class='subcomClass'>评论</button>
                    <p>_________________________________</p>
                    `
                );
            }
        }
        // 插入回复的回复
        for(let i of testInfo.comments){
            if(i.re_ArticleCommentID != ''){
                $('#cm'+i.re_ArticleCommentID).append(
                    `<p>${i.username}: ${i.content} @${findAuthor(i.re_ArticleCommentID)}</p>`
                );
            }
        }


        // 回复按钮绑定函数
        $('.subcomClass').click(async function(){
            let re_id = (this.id).split('subcom')[1];
            let content = "hello world"; // TODO
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

            //alert(submitContent.time);

            try{
                //向后端传输
                /*
                let res = await axios.post('',{
                    id: '',  //文章id
                    content: submitContent
                });
                */

                submitContent.articleCommentID = String(new Date().getTime());
                
                if(true){   // 不出意外的话 res.status == 1
                    if(submitContent.re_ArticleCommentID != ''){
                        $('#cm'+submitContent.re_ArticleCommentID).append(
                            `<p>${submitContent.username}: ${submitContent.content} 
                                @${findAuthor(submitContent.re_ArticleCommentID)}
                            </p>`
                        );
                    }
                }else{
                    alert('bad');
                }
            }catch(err){
                alert(err);
            }
        });
        
       
        
        


    });
})();
