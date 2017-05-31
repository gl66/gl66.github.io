/**
 * Created by gonglei on 2017/5/20.
 */
window.onload=function(){
    let label=document.querySelectorAll('label');
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let line=document.querySelector('.icon-xian');
    let dashed=document.querySelector('.icon-xuxian');
    let rect=document.querySelector('.icon-juxing');
    let poly=document.querySelector('.icon-duobianxing');
    let polygon=document.querySelector('.icon-wujiaoxingkongdi');
    let circle=document.querySelector('.icon-yuan');
    let rectRound=document.querySelectorAll('.icon-yuanjiaojuxing')[0];
    let pencil=document.querySelector('.icon-qianbi');
    let rubber=document.querySelector('.icon-xiangpi');
    let rubberbtn=document.querySelector('.rubberbtn');
    let script=document.querySelector('.icon-wenzi');
    let fill=document.querySelector('.icon-tianchong');
    let fcolor=document.querySelector('.fillColor')
    let stroke=document.querySelector('.icon-miaobian');
    let scolor=document.querySelector('.strokeColor');
    let cancel=document.querySelector('.icon-weibiaoti545');
    let download=document.querySelector('.icon-baocun');
    let img=document.querySelector('.img1');
    let xinjian=document.querySelector('.icon-iconfontxinjian');
    let mask=document.querySelector('.mask');
    let Pelette=new pelette(canvas,ctx,mask);
    line.onclick=function () {
        Pelette.line();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    dashed.onclick =function () {
        Pelette.dashed();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    rect.onclick=function () {
        Pelette.rect();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    poly.onclick=function () {
        Pelette.n=prompt('请输入边数','5');
        Pelette.poly();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    polygon.onclick=function () {
        Pelette.n=prompt('请输入角数','5');
        Pelette.polygon();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    circle.onclick=function () {
        Pelette.circle();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    rectRound.onclick=function () {
        console.log(1)
        Pelette.rectRound();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    pencil.onclick=function () {
        Pelette.pencil();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    rubber.onclick=function () {
        Pelette.rubber(rubberbtn);
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        Pelette.h=prompt('请输入橡皮大小','20')
    }
    script.onclick=function () {
        Pelette.script();
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
    }
    fcolor.onchange=function () {
        Pelette.fillStyle=fcolor.value;
    }
    scolor.onchange=function () {
        Pelette.strokeStyle=scolor.value;

    }
   fill.onclick=function () {
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        Pelette.paintType='fill';
    }
    stroke.onclick=function () {
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        Pelette.paintType='stroke';
    }
    cancel.onclick=function () {
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        Pelette.cancle();
    }
    document.body.onkeydown=function (e) {
        if (e.ctrlKey&&e.keyCode==90){
            Pelette.cancle();
        }
    }
    download.onclick=function () {
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
        Pelette.download();
        let data2;
        data2 = canvas.toDataURL('image/png');
        img.src= data2;
    }
    xinjian.onclick=function(){
        for(let i=0;i<label.length;i++){
            label[i].id='';
        }
        this.id='hot';
       Pelette.xinjian();
    }
}