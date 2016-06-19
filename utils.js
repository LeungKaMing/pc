var flag=window.getComputedStyle;
var utils={
	//use:将类数组转换为数组
	//@param similarAry 类数组
	listToArray:function(similarAry){
		if (flag) {
			return Array.prototype.slice.call(similarAry);
		}else{
			var arr=[];
			for (var i = 0; i < similarAry.length; i++) {
				var cur=similarAry[i];
				arr[arr.length]=cur;//arr.push(cur);
			}
			return arr;
		}
	},
	//use:将JSON格式字符串转换为JSON对象
	//@param jsonStr JSON格式的字符串
	JSONParse:function(jsonStr){
		return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
	},
	//use:获取当前浏览器的属性值
	//@param attr 属性名
	//@param value 属性值
	getWin:function(attr,value){
		if (!value) {
			return document.documentElement[attr]||document.body[attr];
		}else{
			document.documentElement[attr]=value;
			document.body[attr]=value;
		}
	},
	//use:只获取元素的样式
	//remember:切记!!!window.getComputedStyle和ele.currentStyle是可以获取当前页面中该元素在样式【嵌入式和行内式】的所有属性!!!!!
	//notices:1、返回的值可能带单位(-20.12px)，有的可能没有数字部分 2、获取的样式可能存在兼容性问题,例如:opacity<=>filter
	//@param ele 元素
	//@param attr 属性名
	getCss:function(ele,attr){
		var val=null;
		var reg1=/-?(\d+(\.\d+)?)(px|pm|em|%)?/i;//只获取数字部分，方便后续计算
		if (flag) {//标准浏览器
			val=window.getComputedStyle(ele,null)[attr];
		}else{//IE 兼容性问题
			if (attr==="filter") {//如果属性等于filter的话就强制换了吧~
				var reg2=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;//filter:alpha(opacity=100);
				val=ele.currentStyle["filter"];
				return reg2.test(val)?RegExp.$1/100:1;
			}else{
				val=ele.currentStyle[attr];
			}
		}
		return reg1.test(val)?parseFloat(val):val;
	},	
	//use:设置单个元素的属性值
	//@param ele 当前要设置样式的元素
	//@param attr 当前要设置的css属性名
	//@param value 当前要设置的css属性值
	setCss:function(ele,attr,value){
		if (attr=="opacity") {
			// /MSIE (6|7|8)/
			if (flag>=0) {//IE8是自带加上边框的宽度的,强制将属性改为filter
				ele.style["filter"]="alpha:opacity("+value+")";
			}else{
				ele.style["opacity"]=value;
			}
			return;
		}
		if (attr==="float") { //float的问题也需要处理 cssFloat styleFloat
			ele.style["cssFloat"]=value;
			ele.style["styleFloat"]=value;
			return;
		}
		//样式里的复合值margin-top在JS中只能用marginTop表示
		var reg=/^(width|height|left|top|right|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
		//判断传进来的value是否带单位，如果带单位了就不加了
		if (reg.test(attr)) {	
			if(!isNaN(value)){//不带单位的就加 ==> isNaN(value)为true就证明已经带单位了，为false就证明没带单位了
				value+="px";
			}
		}	
		ele.style[attr]=value;
	},
	//use:设置一组属性样式
	//notices:因为是一组样式，我们传一个对象参数，一个对象可以包含多组属性和属性值
	//@param ele 当前要设置样式的元素
	//@param obj 里面包含：当前要设置的css属性名和当前要设置的css属性值
	setGroupCss:function(ele,obj){
		//避免不传obj的时候会报错
		obj=obj||"0";
		//判断obj是一个对象
		// if(Object.prototype.toString.call(obj)!=="[object Object]"){return};
		if (obj.toString()!=="[object Object]") {return}
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				// ele.style[key]=obj[key];
				this.setCss(ele,key,obj[key]);
			}
		}

	},
	//use:获取元素到body的偏移量
	//notices:注意兼容问题 IE8是自带加上边框的宽度的
	//@param ele 元素
	offset:function(ele){
		var left=ele.offsetLeft;
		var top=ele.offsetTop;
		var p=ele.offsetParent;
		while(p){
			if (window.navigator.userAgent.indexOf("MSIE 8.0")===-1) {
				top+=p.clientTop;
				left+=p.clientLeft;
			}
			left+=p.offsetLeft;
			top+=p.offsetTop;
			p=p.offsetParent;
		}
		return{"left":left,"top":top};
	},
	//use:获取某个标签的所有元素子节点 => 原生children返回的是一个数组集合
	// notices:1、注意兼容问题 IE下是没有children的 2、数组内的元素跟页面对应元素存在映射关系
	//@param parent 要获取谁的所有元素子节点标签(哪个元素的)
	//@param tagName 我们要获取哪个指定元素子节点标签的名字
	children:function(parent,tagName){
		var arr=[];
		if (flag) {
			//可能你会疑惑为什么转换为数组，原生也转换不要问为什么
			arr=utils.listToArray(parent.children);
		}else{
			var all=parent.childNodes;//所有子节点
			for (var i = 0; i < all.length; i++) {
				var cur=all[i];
				if(cur.nodeType===1){
					arr[arr.length]=cur;
				}
			}
		}
		if (typeof tagName=="string") {//准确判断传入的类型，严谨
			var newArr=[];
			for (var i = 0; i < arr.length; i++) {
				var cur2=arr[i];//<li>1111</li>
				//还记得有个节点属性叫nodeName吗？
				if (cur2.nodeName===tagName.toUpperCase()) {
					newArr[newArr.length]=cur2;
				}
			}
			arr=newArr;
		}
		return arr;//数组集合

	},
	//use:获取某个元素的哥哥元素节点
	//notices 兼容性问题
	//@param ele 元素
	previousElementSibling:function(ele){
		if (flag) {
			return ele.previousElementSibling;
		}else{
			var bro=ele.previousSibling;
			while(bro && bro.nodeType!==1){
				bro=bro.previousSibling;
			}
			return bro;
		}
	},
	//use:获取某个元素的弟弟元素节点
	//@param ele 元素
	nextElementsSibling:function(ele){
		if (flag) {
			console.log(ele.nextElementSibling)
			return ele.nextElementSibling;
		}else{
			var bro=ele.nextSibling;
			while(bro && bro.nodeType!==1){
				bro=bro.nextSibling;
			}

			return bro;
		}
	},
	//use:获取某个元素的所有哥哥元素节点
	//@param ele 元素
	previousAllSibling:function(ele){
		var arr=[];
		var bro=this.previousElementSibling(ele);
		while(bro){
			arr.unshift(bro);
			bro=this.previousElementSibling(bro);
		}
		return arr;
	},
	//use:获取某个元素的所有弟弟元素节点
	//@param ele 元素
	nextAllSibling:function(ele){
		var arr=[];
		var bro=this.nextElementsSibling(ele);
		console.log(bro);
		while(bro){
			arr.push(bro);
			bro=this.nextElementsSibling(bro);
		}
		console.log(arr)
		return arr;
	},
	//use:获取某个元素的上一个哥哥节点和下一个弟弟节点
	//notices:如果没有哥哥元素节点或者弟弟元素节点，返回undefined
	//@param ele 元素
	neighbourSibling:function(ele){
		var arr=[];
		this.previousElementSibling(ele)?arr.push(this.previousElementSibling(ele)):void 0;
		this.nextElementsSibling(ele)?arr.push(this.nextElementsSibling(ele)):void 0;
		return arr;
	},
	//use:获取某个元素的所有哥哥节点和所有弟弟节点
	//notices:如果没有哥哥元素节点或者弟弟元素节点，返回undefined
	//@param ele 元素
	neighbourAllSibling:function(ele){
		return this.previousAllSibling(ele).concat(this.nextAllSibling(ele));
	},
	//use:获取当前元素的索引 --> 通过求出所有哥哥元素节点，然后计算节点的数量，数量为多少(2)，当前元素所在的位置就为多少(2)
	//@param ele 元素
	index:function(ele){
		return this.previousAllSibling(ele).length;
	},
	//use:获取第一个元素子节点
	//notices:1、注意兼容性问题 标准浏览器下可以用firstElmentChild IE不可以 2、没有儿子的话就为undefined，所以需要判断儿子是否存在
	//@param parent 元素
	firstChild:function(parent){
		if (flag) {
			return parent.firstElementChild;
		}else{
			//判断儿子存在数量多少
			return this.children(parent).length?this.children(parent)[0]:null;
		}
	},
	//use:获取最后一个元素子节点
	//notices:1、注意兼容性问题 标准浏览器下可以用firstElmentChild IE不可以 2、没有儿子的话就为undefined，所以需要判断儿子是否存在
	//@param parent 元素
	lastChild:function(parent){
		if (flag) {
			return parent.lastElementChild;
		}else{
			return this.children(parent).length?this.children(parent)[this.children(parent).length-1]:null;
		}
	},
	//use:将某个元素追加到容器末尾
	//@param ele  元素
	//@param container 容器
	append:function(ele,container){
		return container.appendChild(ele);
	},
	//use:将某个元素追加到容器中所有元素子节点的最前面 
	//@param ele  元素
	//@param container  容器
	sonsInsertBefore:function(ele,container){
		return container.insertBefore(ele,this.children(container)[0])
	},
	//use:将某个新元素插入在旧元素的前面
	//@param newEle  新元素
	insertBefore:function(newEle,oldEle){
		return oldEle.parentNode.insertBefore(newEle,oldEle);
	},
	//use:将某个新元素插入在旧元素的后面
	//@param newEle  新元素
	//@param container 容器
	insertAfter:function(newEle,oldEle){
		return oldEle.parentNode.insertBefore(newEle,this.nextElementsSibling(oldEle));
	},
	//update:用正则写一套
	//use:判断某个元素的样式中是否具备某个特定样式
	//notices:当前样式是<li class=" a b c d"></li>，我们传入的样式参数是否为" a b c d"，将传入的样式参数与当前样式做判断
	//@param ele 元素
	//@param cuserSendClassName 样式名
	hasClass:function(ele,userSendClassName){
		return new RegExp("^| +"+userSendClassName+" +|$").test(ele.className);
	},
	//use:判断某个元素的样式中是否具备某个特定样式
	//notices:获取页面中某个元素在行内式中的class,用JS来表示ele.className/ele.getAttribute,结果是字符串类型的"a b c d"
	//@param ele 元素
	//@param userSendClassName 样式名
	//这样写有点问题
	hasClass2:function(ele,userSendClassName){
		var my=ele.className.split(/\s/);
		userSendClassName=userSendClassName.split(/\s/);
		for (var i = 0; i < userSendClassName.length; i++) {
			var cur=userSendClassName[i];
			for (var j = 0; j < my.length; j++) {
				if(my[j]===cur){
					return true;
				}
				continue;
			}
		}
		return false;
	},
	//use:给某个元素添加样式
	//extend:classList.add("className")
	//@param ele 元素
	//@param cuserSendClassName 样式名
	addClass:function(ele,userSendClassName){
		if (!this.hasClass2(ele,userSendClassName)) {
			ele.classList.add(userSendClassName);
		}
	},
	//use:给某个元素添加样式
	//extend:classList.add("className")
	//notices:1、保证用户传入的"需要给元素添加的样式参数"要是前后有空格可以去掉:" a b "  2、
	//@param ele 元素
	//@param userSendClassName 样式名 ==> 避免混肴改名了
	addClass2:function(ele,userSendClassName){
		var arr=userSendClassName.split(/\s+/);
		for (var i = 0; i < arr.length; i++) {
			if (!this.hasClass2(ele,userSendClassName)) {
				ele.className+=""+arr[i];
			}
		}
	},
	// //use:给某个元素删除样式
	// //@param  ele 元素
	// //@param  className 样式名
	removeClass:function(ele,userSendClassName){
		if (this.hasClass2(ele,userSendClassName)) {
			ele.classList.remove(userSendClassName);
		}
	},
	//use:给某个元素删除样式
	//notices:1、判断元素中是否存在该样式，只要存在一个就立即进行删除 2、字符串中涉及删除，想到的应该是用空字符串替换掉  2、
	//@param  ele 元素
	//@param  userSendClassName 样式名
		// removeClass:function(ele,userSendClassName){
		// 	var arr=userSendClassName.split(/\s+/);
		// 	for (var i = 0; i < arr.length; i++) {
		// 		if (this.hasClass(ele,arr[i])) {
		// 			ele.className.replace(arr[i],"");
		// 		}
		// 	}
		// },
	//use:解决getElementsByClassName的兼容性问题
	//update:更改了第二版的判断用户传入的样式参数是否在标签的样式中有所体现,进行了简化:curTag.className===curClassName
	/*
	notices:
	1、IE下存在兼容性问题 
	2、context.getElementsByClassName ==> [<li id="fuck" class=" hello world testNew" style="width: 100px;">1</li>] 
	==>我们后续需要对class属性值的内容进行操作，所以要将上述结果得到的类数组转换为数组
	3、用户传入的样式参数前后可能存在空格，需要去掉 /^ +| +$/
	*/
	//@param context 上下文
	//@param userSendClassName 用户传入的class样式
	getByClass:function(userSendClassName,context){
		var context=context||document;
		if(flag){
			return this.listToArray(context.getElementsByClassName(userSendClassName));
		}else{
            //获取所有的标签
			var allTag=document.getElementsByTagName("*");
			var classList=userSendClassName.replace(/^ +| +$/g,"")/*将开头结尾存在的空格替换掉,返回字符串*/.split(/\s+/)/*将字符串间的空格作为拆分依据，拆分成数组*/;
			var arr=[];
			for (var i = 0; i < allTag.length; i++) {
				var curTag=allTag[i];
				if (!curTag.checked) {continue};
				for (var j = 0; j < classList.length; j++) {
					var curClassName=classList[j];
					if(curTag.className===curClassName){
						arr.push(curTag);
						curTag.checked=true;
					}
				}
			}
			return arr;
		}
	},
	//use:解决getElementsByClassName的兼容性问题
	//@param context 上下文
	//@param userSendClassName 用户传入的class样式    
	getByClass2:function(userSendClassName,context){
        var context = context||document;
        if(flag){
            return utils.listToArray(context.getElementsByClassName(userSendClassName));
        }
        //获取所有的标签
        var allTag = context.getElementsByTagName("*");
        var classList = userSendClassName.replace(/^ +| +$/g,"").split(/\s+/);
        var arr = [];
        for(var i=0;i<allTag.length;i++){
            var curTag = allTag[i];
            var flag = true;
            for(var j = 0; j<classList.length;j++){
                var curClassName = classList[j];
                var reg = new RegExp("(?:^| +)"+curClassName+"(?: +|$)");
                if(!reg.test(curTag.className)){
                    flag = false;
                    break;
                }
            }
            if(flag){
                arr.push(cur);
            }
        }
        return arr;
    }
}