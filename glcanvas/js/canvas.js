/**
 * Created by gonglei on 2017/5/20.
 */
function pelette(obj,ctx,mask) {
    this.lineWidth=2;
    this.fillStyle='black';
    this.strokeStyle='black';
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;
    this.width=obj.width;
    this.height=obj.height;
    this.history=[];
    this.n=5;
    this.h=20;
    this.paintType='stroke';
    this.img=document.querySelector('.img1');
}
pelette.prototype= {
    init: function () {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.setLineDash([]);

    },

    line: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1, oy1);
                that.ctx.lineTo(ox2, oy2);
                that.ctx.stroke();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;

            }
        }
    },
    dashed: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1, oy1);
                that.ctx.setLineDash([10, 25]);
                that.ctx.lineTo(ox2, oy2);
                that.ctx.stroke();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;

            }
        }
    },
    rect: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1, oy1);
                that.ctx.lineTo(ox2, oy1);
                that.ctx.lineTo(ox2, oy2);
                that.ctx.lineTo(ox1, oy2);
                that.ctx.lineTo(ox1, oy1)
                that.ctx.closePath();
                that.ctx[that.paintType]();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    },
    poly: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                let radius = Math.sqrt(Math.pow((ox2 - ox1), 2) + Math.pow((oy2 - oy1), 2));
                let radin = (360 / that.n) / 180 * (Math.PI);
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1 + radius, oy1);
                for (let i = 0; i < that.n; i++) {
                    that.ctx.lineTo(ox1 + radius * Math.cos(radin * i), oy1 + radius * Math.sin(radin * i))
                }
                that.ctx.closePath();
                that.ctx[that.paintType]();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    },
    polygon: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                let radius;
                let radin = (360 / that.n) / (180 * 2) * (Math.PI);
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1 + radius, oy1);
                for (let i = 0; i < that.n * 2; i++) {
                    if (i % 2 == 0) {
                        radius = Math.sqrt(Math.pow((ox2 - ox1), 2) + Math.pow((oy2 - oy1), 2));
                    } else {
                        radius = Math.sqrt(Math.pow((ox2 - ox1), 2) + Math.pow((oy2 - oy1), 2)) / 3;
                    }
                    that.ctx.lineTo(ox1 + radius * Math.cos(radin * i), oy1 + radius * Math.sin(radin * i))
                }
                that.ctx.closePath();
                that.ctx[that.paintType]();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    },
    circle: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX, oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                let radius = Math.sqrt(Math.pow((ox2 - ox1), 2) + Math.pow((oy2 - oy1), 2));
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox1 + radius, oy1);
                that.ctx.arc(ox1, oy1, radius, 0, 2 * Math.PI);
                that.ctx.closePath();
                that.ctx[that.paintType]();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }

        }
    },
    rectRound: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                let radius = 5;
                that.ctx.beginPath();
                that.ctx.moveTo(ox1 + radius, oy1);
                that.ctx.lineTo(ox2 - radius, oy1);
                that.ctx.quadraticCurveTo(ox2, oy1, ox2, oy1 + radius);
                that.ctx.lineTo(ox2, oy2 - radius);
                that.ctx.quadraticCurveTo(ox2, oy2, ox2 - radius, oy2);
                that.ctx.lineTo(ox1 + radius, oy2);
                that.ctx.quadraticCurveTo(ox1, oy2, ox1, oy2 - radius);
                that.ctx.lineTo(ox1, oy1 + radius);
                that.ctx.quadraticCurveTo(ox1, oy1, ox1 + radius, oy1)
                that.ctx.closePath();
                that.ctx[that.paintType]();
            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }

        }
    },
    pencil: function () {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(ox1, oy1);
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }

                that.ctx.lineTo(ox2, oy2);
                that.ctx.stroke();

            }
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;

            }
        }
    },
    rubber: function (btn) {
        let that = this;
        let rubberbtn=btn;
        that.mask.onmousedown = function (e) {
            // let ox1 = e.offsetX;
            // let oy1 = e.offsetY;
            // let rubberbtn = document.createElement('div');
            // that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
            rubberbtn.style.display='block';
            rubberbtn.style.width = that.h + 'px';
            rubberbtn.style.height = that.h + 'px';
            rubberbtn.style.border = `1px solid black`;
            // rubberbtn.style.background='red';
            that.mask.onmousemove = function (e) {
                let ox2 = e.offsetX, oy2 = e.offsetY;
                that.init();
                // if (that.history.length > 0) {
                //     that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                // }
                let top1=oy2-that.h/2+100;
                let left1=ox2-that.h/2;
                if(top1<100){
                    top1=100;
                }
                if (top1>100+that.obj.height-that.h){
                    top1=100+that.obj.height-that.h;
                }
                if (left1<0){
                    left1=0;
                }
                if(left1>that.obj.width-that.h){
                    left1=that.obj.width-that.h;
                }
                rubberbtn.style.top=top1+'px';
                rubberbtn.style.left=left1+'px';
                that.ctx.clearRect(ox2,oy2,that.h,that.h);

                that.mask.onmouseup = function () {
                    that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
                    that.mask.onmousemove = null;
                    that.mask.onmouseup = null;
                    rubberbtn.style.display='none';
                }
            }
        }
    },
    script:function () {
        let that=this;
        that.mask.onmousedown = function (e) {
            let ox1 = e.offsetX;
            let oy1 = e.offsetY;
            let input = document.createElement('div');
            input.style.cssText = `
            min-width:80px;
            height:50px;
            background:#ffffff;
            position:absolute;
            top:${oy1}px;
            left:${ox1}px;
            border:1px solid #000000;
            `;
            input.contentEditable = true;
            that.mask.appendChild(input);
            console.log(input);
            that.mask.onmousedown = null;
            that.area = input;
            that.area.onblur=function () {
                that.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                this.parentNode.removeChild(this);
                that.inputbox=null;

            }
        }
    },
    cancle:function () {
        let that=this;
        if (that.history.length==0){
            return;
        }
        let last=that.history.pop();
        that.ctx.putImageData(last,0,0)
    },
   download:function(){
        let data;
        data=this.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');

        location.href=data;

   },

    xinjian: function () {
       let that=this;
        let flag = confirm('是否保存图片')
        if (flag) {
            that.ctx.clearRect(0, 0, that.width, that.height);
        } else {
            that.ctx.clearRect(0, 0, that.width, that.height);
            that.history.push(that.ctx.getImageData(0, 0, that.width, that.height));
        }
    },
}