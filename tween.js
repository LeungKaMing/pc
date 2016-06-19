~function(){

	//这一组对象里都是存放如何去计算【当前位置】的公式
	var zhufengEffect={
		//定义一个匀速运动的效果
		linear:function(t,b,c,d){
			return c*(t/d)+b;
		},
        //Ö¸ÊýË¥¼õµÄ·´µ¯»º¶¯
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        //¶þ´Î·½µÄ»º¶¯
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        //Èý´Î·½µÄ»º¶¯
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        //ËÄ´Î·½µÄ»º¶¯
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        //Îå´Î·½µÄ»º¶¯
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        //ÕýÏÒÇúÏßµÄ»º¶¯
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        //Ö¸ÊýÇúÏßµÄ»º¶¯
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //Ô²ÐÎÇúÏßµÄ»º¶¯
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        //³¬¹ý·¶Î§µÄÈý´Î·½»º¶¯
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        //Ö¸ÊýË¥¼õµÄÕýÏÒÇúÏß»º¶¯
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };

    // 【已经开始不再使用step步长来控制动画了，改用时间time】
	//负责驱动的
	//@param ele 元素
	//@param target 多方向需要运动的终点 --> target是一个对象，因为要多方向运动，属性为方向，属性值为方向对应的值
	//@param duration 需要运动的时间间隔
	function move(ele,target,duration,WhatsEffect,callback){
        clearInterval(ele.timer);
		//time,change【target-begin】,begin,interval
		var time=null;
		var interval=10;
		//由于多方向运动，所以用对象装着
		var begin={};
		var change={};

		var tempEffect=zhufengEffect.linear;//默认给它一个匀速

		if (typeof WhatsEffect=="number") {
			switch(WhatsEffect){
				case 1:
					tempEffect=zhufengEffect.linear;
					break;
				case 2:
					tempEffect=zhufengEffect.Elastic.easeIn;
					break;
                case 3:
                    tempEffect=zhufengEffect.Bounce.easeIn;
                    break;    	
			}
		}else if(WhatsEffect instanceof Array){
            tempEffect=zhufengEffect[WhatsEffect[0]][WhatsEffect[1]];
        }else{
            callback=tempEffect;
        }

		//有多少个target就决定了多少个begin和多少个change==>我们需要通过target的维度(属性多少)，来查找我们begin的属性，如果不是target的属性，我们这个维度就没有必要获取了
		for(var key in target){//key是top，left，这些表示维度的属性；其他诸如width，height这些其他维度的属性不获取
			if (target.hasOwnProperty(key)) {
				//通过target的维度给begin添加维度
				begin[key]=utils.getCss(ele,key);
				change[key]=target[key]-begin[key];
			}
		}


		//以上只是获取了动画刚开始的条件t,b,c,d，下面就是驱动他们做事情了~~~
		//接下来我们需要去开启定时器并且完成动画
        //写的时候往匀速运动的角度写
		ele.timer=window.setInterval(function(){
			//1 越界判断  2、设置每个维度的值
			time+=interval;//通过花费时间的增持来驱动对应时间的走过的距离
			// linear(t, b, c, d)
			if (time>=duration) {
				window.clearInterval(ele.timer);
                ele.timer=null;
				//我们还要赋值给target终点
				utils.setGroupCss(ele,target);
				//我们的动画已经结束了
				if (typeof callback == "function") {
					callback.call(ele);
				}
				return;
			}
			//需要分别处理每个维度，target里面的维度都需要处理
			for(var k in target){//遍历尽量遍历change，因为已经不用再考虑k是否为私有属性的问题，同上
				if (target.hasOwnProperty(k)) {
					//这里所有能遍历出来的维度需要处理
					//到这步begin跟change都有维度的属性了，维度的属性还是跟target的维度属性有映射
					var curPosi=tempEffect(time,begin[k],change[k],duration);
					utils.setCss(ele,k,curPosi);
				}
			}
		},interval)
	}
	//给全局window一个自定义属性，那么外面就可以随便用了
	window.animate=move;
}();