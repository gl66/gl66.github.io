/**
 * Created by MACHENIKE on 2017/5/10.
 */
/*
* 属性
* a-z
* 个数
* 难度
* 速度
* 分数
* 生命，时间
*
* 方法
* 产生
* 掉
*
*消除
* 下一关
* 重新开始
*checkposition
* checkrepeat
* wenzi---tupian
* */
    function Game (level) {
        this.chararr = [
            ['A','img/a.png'],
            ['B','img/b.png'],
            ['C','img/c.png'],
            ['D','img/d.png'],
            ['E','img/e.png'],
            ['F','img/f.png'],
            ['G','img/g.png'],
            ['H','img/h.png'],
            ['I','img/i.png'],
            ['J','img/j.png'],
            ['K','img/k.png'],
            ['L','img/l.png'],
            ['M','img/m.png'],
            ['N','img/n.png'],
            ['O','img/o.png'],
            ['P','img/p.png'],
            ['Q','img/q.png'],
            ['R','img/r.png'],
            ['S','img/s.png'],
            ['T','img/t.png'],
            ['U','img/u.png'],
            ['V','img/v.png'],
            ['W','img/w.png'],
            ['X','img/x.png'],
            ['Y','img/y.png'],
            ['Z','img/z.png']
        ];
        this.elechar=[];
        this.charlength = level;
        this.cw = window.innerWidth;
        this.ch=window.innerHeight;
        this.currentEle = [];
        this.currentPos=[];
        this.speed = 10;
        this.hp=10;
        this.score=0;
        this.hpEle=document.querySelector('.health');
        this.scoreEle=document.querySelector('.score');
        this.limits=10;
    }
        Game.prototype = {
            start: function () {
                this.getElements(this.charlength);
                this.drop();
                this.key();
            },
            checkRepeat:function (text) {
                return this.currentEle.some(value=>{return value.innerText==text}
                )
            },
            checkPosition:function (lefto) {
                return this.currentPos.some(value => {
                    return value+95>lefto&&lefto+95>value;
                })
            },
            getElements: function (length) {
                for (let i = 0; i < length; i++) {
                    this.getChar();
                }
            },
            getChar: function () {
                let  num = Math.floor(Math.random() * this.chararr.length);
                //num 去重
                while (this.checkRepeat(this.chararr[num][0])){
                    num = Math.floor(Math.random() * this.chararr.length);
                }
                let char = this.chararr[num][0];
                let ele = document.createElement('div');
                let topo = Math.random() * 100;
                let lefto = Math.random() * (this.cw - 400) + 200;
                while (this.checkPosition(lefto)){
                    lefto = Math.random() * (this.cw - 400) + 200;
                }
                this.currentPos.push(lefto);
                ele.style.cssText = `width:95px;height:95px;border-radius:3px;background-image:url(${this.chararr[num][1]});background-positon:center center;background-size:cover;text-align:center;line-height:0;position:absolute;left:${lefto}px;top:${topo}px;font-size:0;`
                ele.innerText = char;
                document.body.appendChild(ele);
                this.currentEle.push(ele);
                this.elechar.push(ele.innerText);

            },
            drop: function () {
                let that= this;
               /* console.log(that)*/
                this.t = setInterval(function () {
                    for (let i = 0; i < that.currentEle.length; i++) {
                        let tops = that.currentEle[i].offsetTop + that.speed;
                        that.currentEle[i].style.top = tops + 'px';
                        if(tops>=that.ch){
                            document.body.removeChild(that.currentEle[i]);
                            that.currentEle.splice(i,1);
                            that.currentPos.splice(i,1);
                            that.hp--;
                            that.hpEle.innerText=that.hp;
                            if(that.hp<=0){
                                let flag=window.confirm('胜败乃兵家常事，少侠请重新来过');
                                console.log(flag);
                                if(flag){
                                    that.restart();
                                }else {
                                    window.close();
                                }
                            }
                            // let arr=new Array(1,3,5,7,9);
                            // console.log(arr);
                            // let aa=arr.splice(2,1);
                            // console.log(aa);   测试Splice返回值；返回值为包含着被删除的元素的一个数组
                        }
                        if(that.currentEle.length<that.charlength){
                            that.getChar();
                        }
                    }

                  /*  that.currentEle.forEach(function (value) {
                        let tops=value.offsetTop+that.speed;
                        value.style.top=tops+'px';

                    })*/
                }, 500)
            },
            key:function () {
                let that=this;
                document.body.onkeydown=function (e) {
                    let code=String.fromCharCode(e.keyCode);
                    for(let i=0;i<this.currentEle.length;i++){
                        if(code==this.currentEle[i].innerText){
                                document.body.removeChild(this.currentEle[i]);
                                this.currentEle.splice(i,1);
                                this.currentPos.splice(i,1);
                                this.score++;
                                this.scoreEle.innerText=this.score;
                                if(this.score==this.limits){
                                    this.next();
                                }
                        }
                        if(that.currentEle.length<that.charlength){
                            that.getChar();
                        }
                    }
                    if(!(this.elechar.includes(code))){
                        this.hp--;
                        this.hpEle.innerText=this.hp;
                        if(that.hp<=0){
                            let flag=window.confirm('胜败乃兵家常事，少侠请重新来过');
                            console.log(flag);
                            if(flag){
                                that.restart();
                            }else {
                                window.close();
                            }
                        }
                    }

                }.bind(this);//  bind(this)  在函数外绑定外层this  那么函数内层可以使用外层this；
            },
            restart:function () {
                /*
                * 停止
                * 删除元素 数据
                * 生命 分数 初始化
                * 继续开始；
                * */
                clearInterval(this.t);
                for(let i=0;i<this.currentEle.length;i++){
                    document.body.removeChild(this.currentEle[i]);
                }
                this.currentEle=[];
                this.currentPos=[];
                this.hp=10;
                this.hpEle.innerText=this.hp;
                this.score=0;
                this.scoreEle.innerText=this.score;
                game.start();
            },
            next:function () {
                clearInterval(this.t);
                let flag=window.confirm('欲穷千里目，更上一层楼，少侠要继续吗？')
                 if(flag){
                   for(let i=0;i<this.currentEle.length;i++){
                       document.body.removeChild(this.currentEle[i]);
                   }
                   this.currentEle=[];
                   this.currentPos=[];
                   this.charlength++;
                   this.speed++;
                   this.limits+=10;
                   game.start();
                }else{
                     window.close();
                 }
            }


        }
