/**
 * Created by winso on 2016/5/20.
 */
// =============================declaration start======================================================
//nav区域
var all = document.getElementById("all");
var navBox = all.getElementsByTagName("div")[1];
var nav = navBox.getElementsByTagName("div")[0];
var right = nav.getElementsByTagName("div")[0];
var rightR = right.getElementsByTagName("ul")[0];
//banner轮播区域
var banner = document.getElementById("banner");
var inner = banner.getElementsByTagName("div")[0];
var imgBox = inner.getElementsByTagName("div");
//banner焦点区域
var rightNav = banner.getElementsByTagName("ul")[0];
var rightNavLis = rightNav.getElementsByTagName("li");
//内容第一部分"独播"事件委托==>未完成
var content = document.getElementById("content")
var content1 = content.getElementsByTagName("div")[0];
var content1Left = content1.getElementsByTagName("div")[0];
var content1LeftHead = content1Left.getElementsByTagName("div")[0];
var c1LHeadRight = content1LeftHead.getElementsByTagName("div")[1];
//内容第一部分小轮播图
var c1Outer = document.getElementById("c1MidLunboBox");
var c1Inner1 = c1Outer.getElementsByTagName("div")[0]
var divList1 = c1Inner1.getElementsByTagName("div");
var c1MidBtnLeft = document.getElementById("c1MidBtnLeft");
var c1MidBtnRight = document.getElementById("c1MidBtnRight");
//内容第二部分小轮播图
var c2Outer = document.getElementById("dl");
var c2Inner = c2Outer.getElementsByTagName("div")[0];
var divList2 = c2Inner.getElementsByTagName("div");
var c2MidBtnLeft = document.getElementById("c2MidBtnLeft");
var c2MidBtnRight = document.getElementById("c2MidBtnRight");

//推拉门
var doorCon = document.getElementById("doorCon");
var theaters = doorCon.getElementsByTagName("a");
var doorCon2 = document.getElementById("doorCon2");
var theaters2 = doorCon2.getElementsByTagName("a");

//遮罩层
var shadowBox = document.getElementById("shadowBox");

// =============================declaration end======================================================

//==============================format e start===========================================
function myE(e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    e.pageX = e.pageX || (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = e.pageY || (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    if (window.event) {
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
    }
}
//==============================format e end===========================================

//====================================big lunbo start==============================
//大轮播
~function () {

//无论左右还是上下都需要step,用于表示当前图片所在的索引
    var step = 0;

    function lunbo() {
        if (step >= imgBox.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
        focusAlign();
    }

    function setBanner() {
        for (var i = 0; i < imgBox.length; i++) {
            var cur = imgBox[i];
            if (step === i) {
                cur.style.display = "block";
                animate(cur, {opacity: 1}, 500, 1, function () {
                    for (var j = 0; j < imgBox.length; j++) {
                        var curDivSib = imgBox[j];
                        if (j !== step) {
                            animate(curDivSib, {opacity: 0}, 500);
                        }
                    }
                });
                continue;
            }
            cur.style.display = "none";
        }
    }

    var timer = window.setInterval(lunbo, 5000)

    function focusAlign() {
        // step
        for (var i = 0; i < rightNavLis.length; i++) {
            var cur = rightNavLis[i];
            if (step === i) {
                cur.childNodes[0].style.backgroundColor = "#63b504";
                cur.childNodes[0].style.color = "#fff";
            } else {
                cur.childNodes[0].style.backgroundColor = "";
                cur.childNodes[0].style.color = "#ccc";
            }
        }
    }

    ~function () {
        for (var i = 0; i < rightNavLis.length; i++) {
            var cur = rightNavLis[i];
            cur.zdy = i;
            cur.onmouseover = function () {
                clearInterval(timer);
                step = this.zdy;
                setBanner();
                focusAlign();
            }
        }
    }()

    banner.onmouseover = function () {
        clearInterval(timer);
    }

    banner.onmouseout = function () {
        timer = window.setInterval(lunbo, 5000);
    }
}()
//===================================big lunbo end=============================

//===========================door start====================
//推拉门
//思路：鼠标移入时，i<=4除了当前元素和后面紧跟着的两个元素不设置宽度为0，其他一律为0；i>4除了当前元素和前面紧跟着的两个元素不设置宽度为0，其他一律为0
~function () {
    function tuila(theaters) {
        for (var i = 0; i < theaters.length; i++) {
            var cur = theaters[i];
            cur.zdy = i;
            cur.onmouseenter = function () {
                if (this.zdy <= 4) {
                    //当前元素
                    utils.addClass(theaters[this.zdy], "theaterHover");
                    //i+1,i+2不变
                    for (var j = 0; j < theaters.length; j++) {
                        var cur2 = theaters[j];
                        if (j == this.zdy) {
                            continue;
                        }
                        if (j == this.zdy + 1 || j == this.zdy + 2) {
                            continue;
                        }
                        cur2.classList.add("theaterNoWidth");
                    }
                    return;
                }
                if (this.zdy == 5 || this.zdy == 6) {
                    utils.addClass(theaters[this.zdy], "theaterHover");
                    //i-1,i-2不变
                    for (var j = 0; j < theaters.length; j++) {
                        var cur2 = theaters[j];
                        if (j == this.zdy) {
                            continue;
                        }
                        if (j == (this.zdy - 1) || j == (this.zdy - 2)) {
                            continue;
                        }
                        cur2.classList.add("theaterNoWidth");
                    }
                    return;
                }
            }
            cur.onmouseleave = function () {
                for (var j = 0; j < theaters.length; j++) {
                    var cur2 = theaters[j];
                    if (j === this.zdy) {
                        utils.removeClass(theaters[this.zdy], "theaterHover");
                        continue;
                    }
                    if (!utils.hasClass(cur2, "theaterNoWidth")) {
                        continue;
                    }
                    utils.removeClass(cur2, "theaterNoWidth");
                }
            }
        }
    }

    window.tuila = tuila;
}()
tuila(theaters);
tuila(theaters2);
//===========================door end=======================

//============================nav comeOut start=======================
//导航栏超过大轮播区域就渐隐出现
window.onscroll = function () {
    var temp = utils.getWin("scrollTop");
    if (temp >= 590) {
        utils.addClass(navBox, "navFixed");
    } else {
        utils.removeClass(navBox, "navFixed");
    }
}
//============================nav comeOut end=======================

//====================lunbo custom start========================================
//第一部分小轮播==>封装
// ~function () {
//     var step=0;
//     function move() {
//         //step不能超过img.length-1
//         step++;
//         if(step>=divList1.length-1){
//             step=0;
//             utils.setCss(c1Inner1,"left",0);
//             utils.setCss(c1Inner2,"left",0);
//         }
//         utils.setCss(c1Inner1,"left",-step*380);
//         utils.setCss(c1Inner2,"left",-step*384);
//     }
//     var timer1=window.setInterval(move,5000)
//
//     c1MidBtnLeft.onclick=function () {
//         step--;
//         if(step<0){
//             step=divList1.length-2
//             utils.setCss(c1Inner1,"left",-step*380);
//             utils.setCss(c1Inner2,"left",-step*384);
//             return;
//         }
//         utils.setCss(c1Inner1,"left",-step*380);
//         utils.setCss(c1Inner2,"left",-step*384);
//     };
//     c1MidBtnRight.onclick=move;
// }()
/*
 * @notices:并没解决轮播方法move的this指向问题
 * @param ele 为轮播图的inner区域
 * @param eleSon 为轮播图的inner区域中的每个divList
 * @param attr 为改变inner的某个属性(前提是inner必须要有)
 * @param val 为设置inner的某个属性的值
 * @param duration 为给轮播方法move设置定时器运动时间
 * */
function ClickLunbo(ele, eleSon, attr, val, duration, clickEle1, clickEle2) {
    this.ele = ele;
    this.eleSon = eleSon;
    this.attr = attr;
    this.val = val;
    this.duration = duration;
    this.clickEle1 = clickEle1;
    this.clickEle2 = clickEle2;
    var step = 0;

    function move() {
        //step不能超过img.length-1
        step++;
        if (step >= eleSon.length - 1) {
            step = 0;
            utils.setCss(ele, attr, 0);
        }
        utils.setCss(ele, attr, -step * val);
    }

    this.move = move;
    this.timer = window.setInterval(move, this.duration);
    var that = this;
    this.clickEle1.onclick = function () {
        step--;
        if (step < 0) {
            step = divList1.length - 2
            utils.setCss(that.ele, "left", -step * 380);
            return;
        }
        utils.setCss(that.ele, "left", -step * 380);
    };
    this.clickEle2.onclick = that.move;
}
//
// // @notices:公共方法可以用上对象实例的所有私有属性(即this.xxx)
// // @notices:如果一个outer区域下有2个inner区域的话，那么只需要随便创建一个实例test，并且调用on方法的话，该outer就自动带有onmouseover和onmouseout事件
// // @notices:没有考虑绑定多个事件==>只考虑了绑定一个事件的情况
// // @param method:随便传入一个不带on的方法名即可
// ClickLunbo.prototype.on=function (method) {
//     var that=this;
//     method="on"+method;
//     if(/(out|leave)/i.test(method)){
//         that.ele.parentNode[method]=function () {
//             that.timer=window.setInterval(that.move,that.duration);
//         }
//         return;
//     }
//     if(/(over|enter)/.test(method)){
//         that.ele.parentNode[method]=function () {
//             clearInterval(that.timer);
//         }
//         return;
//     }
// }
var test = new ClickLunbo(c1Inner1, divList1, "left", 380, 2000, c1MidBtnLeft, c1MidBtnRight);
var test2 = new ClickLunbo(c2Inner, divList2, "left", 380, 2000, c2MidBtnLeft, c2MidBtnRight);


//看看是否能改进后续==>结合上面注释
c1Outer.onmouseover = function () {
    clearInterval(test.timer);
}
c1Outer.onmouseout = function () {
    test.timer = window.setInterval(test.move, test.duration);
}
c2Outer.onmouseover = function () {
    clearInterval(test2.timer);
}
c2Outer.onmouseout = function () {
    test2.timer = window.setInterval(test2.move, test2.duration);
}

//====================lunbo custom end========================================
//=====================nav start=============================================
var upload = document.getElementById("upload");
var upTri = document.getElementById("uploadListTri");
var uploadList = document.getElementById("uploadList");
var uploadIcon = document.getElementById("uploadIcon");
var tri = document.getElementById("tri");
var uploadFont = document.getElementById("uploadFont");
document.onclick = function (e) {
    myE(e);
    if (e.target.parentNode.className === "navUl" || e.target.className === "navUl") {
        var reg = /Tri2/i.test(upTri.className);
        if (!reg) {
            utils.addClass(upTri, "uploadListTri2");
            utils.addClass(uploadList, "uploadList2");
            utils.addClass(uploadIcon, "uploadIcon2");
            utils.addClass(tri, "tri2");
            utils.addClass(uploadFont, "uploadFont");
            return;
        }
        utils.removeClass(upTri, "uploadListTri2");
        utils.removeClass(uploadList, "uploadList2");
        utils.removeClass(uploadIcon, "uploadIcon2");
        utils.removeClass(tri, "tri2");
        utils.removeClass(uploadFont, "uploadFont");
    }
}
document.onmouseover = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement, tarTag = tar.tagName.toUpperCase();
    if (tar.className === "navUl" || tar.parentNode.className === "navUl") {
        return;
    }
    if (tar.id === "uploadListTri" || tar.id === "uploadList" || tar.parentNode.id === "uploadList" || tar.parentNode.parentNode.id === "uploadList") {
        utils.addClass(upTri, "uploadListTri2");
        utils.addClass(uploadList, "uploadList2");
        utils.addClass(uploadIcon, "uploadIcon2");
        utils.addClass(tri, "tri2");
        utils.addClass(uploadFont, "uploadFont");
        return;
    } else {
        window.setTimeout(function () {
            utils.removeClass(upTri, "uploadListTri2");
            utils.removeClass(uploadList, "uploadList2");
            utils.removeClass(uploadIcon, "uploadIcon2");
            utils.removeClass(tri, "tri2");
            utils.removeClass(uploadFont, "uploadFont");
        }, 1000)
    }
}
//=======================nav end==============================================

//login
var winW = document.documentElement.clientWidth | document.body.clientWidth;
var winH = document.documentElement.clientHeight | document.body.clientHeight;
var login = rightR.getElementsByTagName("li")[0];

login.onclick = function (e) {
    shadowBox.style.display = "block";
    shadowBox.style.width = winW + "px";
    shadowBox.style.height = winH + "px";
    shadowBox.style.zIndex = 1000;
    //拼接字符串还是文档碎片创建
    var lgBox = document.createElement("div");
    lgBox.id="loginBox";
    lgBox.innerHTML=loginBox();
    all.appendChild(lgBox);
    
    var closeBtn=document.getElementById("closeBtn");

    closeBtn.onclick=function(e){
        var lgBox=document.getElementById("loginBox");
        console.log(lgBox);
        all.removeChild(lgBox);
        shadowBox.style.display="none";
    }    
}



function loginBox() {
    var str = "";
    str += "<div class='loginHead'>";
    str += "<a href='javascript:;' id='closeBtn'></a>";
    str += "</div>";
    str += "<div class='loginBody'>";
    str+="<div class='loginCon'>";
    str+="<div class='top'>";
    str += "<span class='username'>账号</span><div class='user'><input class='userInput' type='text' value='请输入手机/邮箱'><a class='code' href='javascript:;'></a></div>";
    str+="</div>";
    str+="<div class='bottom'>";
    str += "<span class='password'>密码</span><div class='pwd'><input class='pwdInput' type='password' value='请输入密码'></div>";
    str+="</div>";
    str += "<div class='loginSth'>";
    str += "<span class='loginCheck'>记住我</span>";
    str+="<div class='forgetReg'>";
    str+="<a href='javascript:;' class='find'>找回密码</a>";
    str+="<i class='forgetRegLine'></i>";
    str+="<a href='javascript:;' class='reg'>立即注册</a>";
    str+="</div>";
    str += "</div>";
    str+="<div class='loginBtn'><a href='javascript:;'>登录</a></div>";
    str += "</div>";
    str += "</div>";
    return str;
}


