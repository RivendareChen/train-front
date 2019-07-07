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
        {
            title:'test5', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/6.jpg', link:'http://www.baidu.com'
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
        {
            title:'art5', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/5.jpg', link:'http://www.baidu.com'
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
        {
            title:'usr5', content:'die die die', author:'lover',
            time:'2019-7-32', img:'../images/10.jpg', link:'http://www.baidu.com'
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
        {text: "m1", link: '1', id:'0', readStatus: 0},
        {text: "m2", link: '2', id:'1', readStatus: 0},
        {text: "m3", link: '0', id:'2', readStatus: 0},
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
                            alert(msgItem.link);
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
        let offset = 20;
        for(let i of testInfo.main){
            cnt++, offset+=30;
            //let lineOffert = cnt*20;
            $('#main-box')
            .append(
                `<div class="grid" id='row${String(cnt)}' style="top: ${offsets[cnt]}% ; ">
                <figure class="effect-marley" style="left: 8% ;width:50%; ">
                <img src="${i.img}" alt="img09"/>
                <figcaption>
                <h2>项目 <span>${i.title}</span></h2>
                <p>${i.content}</p>               		                    
                <a href="${i.link}">View more</a>
                </figcaption></figure></div>
                <div class='diviceLine' style="top: ${lineOfferts[cnt]}%"></div>
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
            flashMainBox(testInfo.main);
            
        });
    
        $('#artBtn').click(function(){
            $('#artSelected').css('display', 'block');
            $('#proSelected').css('display', 'none');
            $('#autSelected').css('display', 'none');
            flashMainBox(testInfo.article);
    
        });
    
        $('#autBtn').click(function(){
            $('#autSelected').css('display', 'block');
            $('#artSelected').css('display', 'none');
            $('#proSelected').css('display', 'none');
            flashMainBox(testInfo.user);
        });
    
    
        // 个人中心 
        $('#mineBtn').click(function(){
            alert('跳转个人中心');
            //TODO
        });
    
        // 注销
        $('#logoutBtn').click(function(){
            alert('注销');
            // TODO
        });
    
    
        // suggest 点击事件
        for(let i in testInfo.suggest){
            let j = parseInt(i)+1;
            let curr = '#suggest' + String(parseInt(i)+1);
            $(curr).click(function(){
                // TODO
                alert(testInfo.suggest[parseInt(i)].link);
            });
        } 
    });
})();


function flashMainBox(info){
    // 删除项目
    for(let i=1 ; i<6; i++){
        $('#row'+i).remove();
    }
    // 新增项目
    let cnt = 0;
    let offset = 20;
    for(let i of info){
        cnt++, offset+=30;
        //let lineOffert = cnt*20;
        $('#main-box')
        .append(
            `<div class="grid" id='row${String(cnt)}' style="top: ${offsets[cnt]}% ; ">
            <figure class="effect-marley" style="left: 8% ;width:50%; ">
            <img src="${i.img}" alt="img09"/>
            <figcaption>
            <h2>项目 <span>${i.title}</span></h2>
            <p>${i.content}</p>               		                    
            <a href="${i.link}">View more</a>
            </figcaption></figure></div>
            <div class='diviceLine' style="top: ${lineOfferts[cnt]}%"></div>
            `
        );
    }
}






