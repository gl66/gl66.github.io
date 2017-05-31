/**
 * Created by gonglei on 2017/5/16.
 */
window.onload=function(){
    let songs=document.querySelector('.songs');
    let name=document.querySelector('.name');
    let audio=document.querySelector('audio');
    let next=document.querySelector('.next');
    let prev=document.querySelector('.prev');
    let play=document.querySelector('.play');
    let lyrics=document.querySelector('.lyrics');
    let name2=document.querySelector('.name2');
    let songs2=document.querySelector('.songs2');
    let index=0;
    let time2=document.querySelector('.time2');
    let i=0;
    let jindu1=document.querySelector('.jindu1');
    let jindu2=document.querySelector('.jindu2');
    let img=document.querySelectorAll('.img');
    let like=document.querySelector('.like');
    let list=document.querySelector('.list')
    init(database[0]);
    function init(obj) {
        let string='';
        songs.innerText=obj.songs;
        name.innerText=obj.name;
        songs2.innerText=obj.songs;
        name2.innerText=obj.name;
        audio.src=obj.src;
        // lyrics.innerText=obj.lyrics;
        obj.lyrics.forEach(function (value,index) {
            string+=`<li>${value.lyric}</li>`
        })
        lyrics.innerHTML='';
        lyrics.innerHTML=string;

    }
    play.onclick=function () {
        if (audio.paused){
            audio.play();
            play.classList.toggle('icon-zanting');
        }else{
            audio.pause();
            play.classList.toggle('icon-zanting');
        }
    }
    audio.ontimeupdate=function () {
        lyrics.innerHTML='';
        let string='';
        let durtime='0'+Math.floor(audio.duration/60)+':'+Math.floor(audio.duration%60);
        if (Math.floor(audio.duration%60)<10){
            durtime='0'+Math.floor(audio.duration/60)+':'+'0'+Math.floor(audio.duration%60)
        }else if(Math.floor(audio.duration%60)>=10){
            durtime='0'+Math.floor(audio.duration/60)+':'+Math.floor(audio.duration%60)
        }
        jindu2.style.width=audio.currentTime/audio.duration*100+'%';
        // console.log(jindu2)
        // let datatime=database[index]['time'];
        // console.log(datatime);
        lyrics.innerHTML=string;
        let m=Math.floor(audio.currentTime/60)>=10?Math.floor(audio.currentTime/60):'0'+Math.floor(audio.currentTime/60);
        let s=Math.floor(audio.currentTime%60)>=10?Math.floor(audio.currentTime%60):'0'+Math.floor(audio.currentTime%60);
        time2.innerHTML=`${m}:${s}/${durtime}`;
        database[index]['lyrics'].forEach(function (value,index) {
            if (value.time==`${m}:${s}`){
                            i=index;
                        }
                })
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==i){
                string+=` 
              <li class="now">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }else{
            string+=` 
              <li>
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;}
        }
        lyrics.innerHTML=string;
    }
        next.onclick=function () {
            lyrics.innerHTML='';
                index++;
                // console.log(index);
                audio.ontimeupdate();
                if(index==5){
                    index=0;
                }
            init(database[index]);
            audio.play();
        }
        prev.onclick=function () {
            lyrics.innerHTML='';

            console.log(index);
            audio.ontimeupdate();
            if(index<=0){
                index=5;
            }
            index--;
            init(database[index]);
            audio.play();
        }
    //tupian
   /* init(database[index]);
    for(let i=0;i<移动端无缝轮播.length;i++){
        移动端无缝轮播[i].style.display='none';
        移动端无缝轮播[index].style.display='block';
    }*/
     //喜欢 点击
    like.onclick=function () {
        like.classList.toggle('icon-xihuan')
    }

    // 列表循环 点击
    list.onclick=function () {
       if(list.classList=='iconfont icon-liebiaoxunhuan list'){
            list.removeClass('.icon-liebiaoxunhuan');
            list.addClass('.icon-danquxunhuan');
           console.log(list.classList)
       }if(list.classList='iconfont icon-danquxunhuan list'){
            list.classList='iconfont icon-suiji list'
        }
    }
}