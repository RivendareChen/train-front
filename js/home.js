let offsets = [0, 3, 21, 41, 61, 81];
let lineOfferts = [5, 18 , 36, 56, 76, 100];

// 基本信息格式示例
let testInfo  = {
    'main':[
        {
            title:'test1', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/9.jpg', link:'http://www.baidu.com'
        },
        {
            title:'test2', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/8.jpg', link:'http://www.baidu.com'
        },
        {
            title:'test3', content:'hia hia hia', author:'lover',
            time:'2019-7-32', img:'../images/4.jpg', link:'http://www.baidu.com'
        },
        {
            title:'test4', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/5.jpg', link:'http://www.baidu.com'
        },
    ],
    'article':[
        {
            title:'art1', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/1.jpg', link:'http://www.baidu.com'
        },
        {
            title:'art2', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/2.jpg', link:'http://www.baidu.com'
        },
        {
            title:'art3', content:'hia hia hia', author:'lover',
            time:'2019-7-32', img:'../images/3.jpg', link:'http://www.baidu.com'
        },
        {
            title:'art4', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/4.jpg', link:'http://www.baidu.com'
        },
    ],
    'user':[
        {
            title:'usr1', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/6.jpg', link:'http://www.baidu.com'
        },
        {
            title:'usr2', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/7.jpg', link:'http://www.baidu.com'
        },
        {
            title:'usr3', content:'hia hia hia', author:'lover',
            time:'2019-7-32', img:'../images/8.jpg', link:'http://www.baidu.com'
        },
        {
            title:'usr4', content:'hello world', author:'fucker',
            time:'2019-7-32', img:'../images/9.jpg', link:'http://www.baidu.com'
        },
    ],
    'suggest':[
        { title:'test1', author:'fucker', link:'http://www.baidu.com'},
        { title:'test2',  author:'lover', link:'http://www.baidu.com' },
        { title:'test3', author:'lover',  link:'http://www.baidu.com'},
        { title:'test4', author:'lover',  link:'http://www.baidu.com'},
        { title:'test5',  author:'lover', link:'http://www.baidu.com' },
        { title:'test6', author:'lover',  link:'http://www.baidu.com'},
    ],
    'msg':[
        {text: "m1", link: 'http://www.baidu.com', id:'0', readStatus: 0},
        {text: "m2", link: 'http://www.baidu.com', id:'1', readStatus: 0},
        {text: "m3", link: 'http://www.baidu.com', id:'2', readStatus: 0},
    ]
};

let searchResults = {
    results: [
        {name: 'pro1', type:'项目', img:'../images/6.jpg', link: 'http://www.baidu.com'},
        {name: 'pro2', type:'项目', img:'../images/7.jpg', link: 'http://www.baidu.com'},
        {name: 'art1', type:'文章', img:'../images/8.jpg', link: 'http://www.baidu.com'},
        {name: 'chy', type: '用户', img:'../images/9.jpg', ink: 'http://www.baidu.com'},
    ]
};



// 获取信息格式

(async()=>{
    /*
    try{
        let res = await axios.post('', {});
        let testInfo = res.data;
        if(!testInfo.main){
            return;
        }
    }catch(err){
        alert(err);
    }
    */
    // TODO

    $(function(){

        MessagePlugin.init({
            elem: "#message",
            msgData: testInfo.msg,  
                msgUnReadData: testInfo.msg.length,
                //noticeUnReadData: 0,
                msgClick: function(obj) {
                    for(let msgItem of this.msgData){
                        if(msgItem.text == obj.innerText){
                            window.location.href = msgItem.link;
                            //设置已读
                            /*
                            try{
                                await axios.post(url,{
                                    id: msgItem.id
                                });
                            }catch(err){
                                alert(err);
                            }
                            */
                            break;
                        }
                    }
                },
                noticeClick: function(obj) {
                    alert("提醒点击事件");
                },
                allRead: function(obj) {
                    alert("全部已读");
                },
                getNodeHtml: function(obj, node) {
                    if (obj.readStatus == 1) {
                        node.isRead = true;
                    } else {
                        node.isRead = false;
                    }
                    var html = "<p>"+ obj.text +"</p>";
                    node.html = html;
                    return node;
                }
        });
    
        // 初始化 主要推荐
        let cnt = 0;
        for(let i of testInfo.main){
            cnt++;
            //let lineOffert = cnt*20;
            $('#items')
            .append(
                `
                <div id="box${String(cnt)}" style="top: ${cnt*10}% ; width: 100% ; margin-top: 30px; display: -webkit-box;">
				<div class="he_border1">
					<img class="he_border1_img" src="${i.img}" alt="Image 01">
					<div class="he_border1_caption">
						<h3 class="he_border1_caption_h">${i.title}</h3>
                        <p class="he_border1_caption_p">作者: ${i.author}</p><br>
						<a class="he_border1_caption_a" href="${i.link}"></a>
					</div>
                </div>
			    </div>
                `
            );
        }
    
        // 初始化 推荐文章信息
        cnt = 0;
        for(let i of testInfo.suggest){
            cnt++;
            $('#suggest-box')
            .append(
                `<div id='suggest${String(cnt)}' class='suggest-item'>
                <h4>${i.title}</h4>
                </div>`
                
            )
        }
        // 初始化 消息控件
    
        // 下方代码不移动至 async 中 //
    
        // 上栏选项函数
        $('#proBtn').click(function(){
            $('#proSelected').css('display', 'block');
            $('#artSelected').css('display', 'none');
            $('#autSelected').css('display', 'none');
            $('#items').html('');
            let cnt = 0;
            for(let i of testInfo.main){
                cnt++;
                //let lineOffert = cnt*20;
                $('#items')
                .append(
                    `
                    <div id="box${String(cnt)}" style="top: ${cnt*10}% ; width: 100% ; margin-top: 30px; display: -webkit-box;">
                    <div class="he_border1">
                        <img class="he_border1_img" src="${i.img}" alt="Image 01">
                        <div class="he_border1_caption">
                            <h3 class="he_border1_caption_h">${i.title}</h3>
                            <p class="he_border1_caption_p">作者: ${i.author}</p><br>
                            <a class="he_border1_caption_a" href="${i.link}"></a>
                        </div>
                    </div>
                    </div>
                    `
                );
            }
        });
    
        $('#artBtn').click(function(){
            $('#artSelected').css('display', 'block');
            $('#proSelected').css('display', 'none');
            $('#autSelected').css('display', 'none');
            $('#items').html('');
            let cnt = 0;
            for(let i of testInfo.article){
                cnt++;
                //let lineOffert = cnt*20;
                $('#items')
                .append(
                    `
                    <div id="box${String(cnt)}" style="top: ${cnt*10}% ; width: 100% ; margin-top: 30px; display: -webkit-box;">
                    <div class="he_3DFlipX">
                        <div class="he_3DFlipX_inner">
                        <div class="he_3DFlipX_img">
                            <img src="${i.img}" alt="img">
                        </div>
                        <div class="he_3DFlipX_caption">
                            <h3>${i.title}</h3>
                            <p>作者:${i.author}</p>
                        </div>
                        <a href="${i.link}"></a>
                        </div>
                        </div>
                    </div>
                    `
                );
            }
    
        });
    
        $('#autBtn').click(function(){
            $('#autSelected').css('display', 'block');
            $('#artSelected').css('display', 'none');
            $('#proSelected').css('display', 'none');
            $('#items').html('');
            let cnt = 0;
            for(let i of testInfo.user){
                cnt++;
                //let lineOffert = cnt*20;
                $('#items')
                .append(
                    `
                    <div id="box${String(cnt)}" style="top: ${cnt*10}% ; width: 100% ; margin-top: 30px; display: -webkit-box;">
                        <div class="he_slideCaptionDown">
                        <img class="he_slideCaptionDown_img" src="${i.img}" alt="Image 01">
                        <div class="he_slideCaptionDown_caption">
                        <h3 class="he_slideCaptionDown_caption_h">${i.author}</h3>
                        <p class="he_slideCaptionDown_caption_p">创业帮资深用户</p>
                        <a class="he_slideCaptionDown_caption_a" href="${i.link}"></a>
                        </div>
                        </div>
                    </div>
                    `
                );
            }
        });
        
        // 搜索
        $('#searchAll').click(async function(){
            //alert($('#searchBar').val());
            /*
            try{
                let res = await axios.post('',{
                    content: $('#searchBar').val()
                });
                if(true){
                    searchResults = res.data;
                    // TODO
                }
            }catch(err){
                alert(err);
            }*/
            $('#autSelected').css('display', 'none');
            $('#artSelected').css('display', 'none');
            $('#proSelected').css('display', 'none');
            $('#items').html('');
            $('#selectedTitle').find('h1').html('搜索结果');
            let cnt = 0;
            for(let i of searchResults.results){
                cnt++;
                //let lineOffert = cnt*20;
                $('#items')
                .append(
                    `
                    <div id="box${String(cnt)}" style="top: ${cnt*10}% ; width: 100% ; margin-top: 30px; display: -webkit-box;">
                    <div class="he_border1">
                        <img class="he_border1_img" src="${i.img}" alt="Image 01">
                        <div class="he_border1_caption">
                            <h3 class="he_border1_caption_h">${i.name}</h3>
                            <p class="he_border1_caption_p">分类: ${i.type}</p>
                            <a class="he_border1_caption_a" href="${i.link}"></a>
                        </div>
                    </div>
                    </div>
                    `
                );
            }
            
        });
    
        // 个人中心 
        $('#mineBtn').click(function(){
            alert('跳转个人中心');
            // window.location.href = ''; 
        });
    
        // 注销
        $('#logoutBtn').click(function(){
            alert('注销');
            // 删除 cookie
            // window.location.href = ''; 
        });

        
        // 绑定创作函数
        $('#create-pro').click(function(){
            alert('创建项目')
            // window.location.href = '';
        });

        $('#create-art').click(function(){
             alert('创建文章')
             // window.location.href = '';
        });
    
    
        // suggest 点击事件
        for(let i in testInfo.suggest){
            let j = parseInt(i)+1;
            let curr = '#suggest' + String(parseInt(i)+1);
            $(curr).click(function(){
                // TODO
                // alert(testInfo.suggest[parseInt(i)].link);
                window.location.href = testInfo.suggest[parseInt(i)].link;
            });
        } 
    });
})();








