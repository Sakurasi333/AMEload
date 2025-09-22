(function(){
const style = document.createElement('style');
style.textContent = `
@keyframes loadAnim{0%{width:0%}100%{width:100%}}
[class^="load-"]:not([class*="-retro"]){position:relative;width:100%;max-width:400px;height:20px;background-color:#eee;border-radius:10px;overflow:hidden;margin:20px auto}
[class^="load-"]:not([class*="-retro"])::after{content:"";position:absolute;left:0;top:0;height:100%;width:0%;border-radius:10px}
.load-red::after{background-color:#e74c3c}
.load-blue::after{background-color:#3498db}
.load-green::after{background-color:#2ecc71}
.load-yellow::after{background-color:#f1c40f}
.load-orange::after{background-color:#e67e22}
.load-purple::after{background-color:#9b59b6}
.load-pink::after{background-color:#fd79a8}
.load-teal::after{background-color:#1abc9c}
.load-gray::after{background-color:#95a5a6}
.load-black::after{background-color:#34495e}
[class*="-retro"]{font-family:monospace;font-size:18px;display:inline-block;margin:20px auto;white-space:pre;text-align:center}
.load-red-retro{color:#e74c3c}
.load-blue-retro{color:#3498db}
.load-green-retro{color:#2ecc71}
.load-yellow-retro{color:#f1c40f}
.load-orange-retro{color:#e67e22}
.load-purple-retro{color:#9b59b6}
.load-pink-retro{color:#fd79a8}
.load-teal-retro{color:#1abc9c}
.load-gray-retro{color:#95a5a6}
.load-black-retro{color:#34495e}
@media(max-width:500px){[class^="load-"]:not([class*="-retro"]){height:15px}}
`;
document.head.appendChild(style);

function startLoad(){
  const loads=document.querySelectorAll('[id^="retime-"]');
  loads.forEach(function(el){
    const time=parseFloat(el.id.split('-')[1])*1000;
    const isRetro=el.className.indexOf('-retro')!==-1;

    if(isRetro){
      let progress=0;
      const totalSteps=10;
      const intervalTime=time/totalSteps;
      const interval=setInterval(function(){
        progress++;
        if(progress>totalSteps) progress=totalSteps;
        let hashes='', dashes='';
        for(let i=0;i<progress;i++) hashes+='#';
        for(let i=0;i<totalSteps-progress;i++) dashes+='-';
        let percent=Math.round((progress/totalSteps)*100);

        if(percent===100){
          el.textContent='[###Done###]';
          clearInterval(interval);
          setTimeout(function(){
            el.textContent='['+'#'.repeat(totalSteps)+']';
          },2000);
        }else{
          el.textContent='['+hashes+dashes+percent+'%]';
        }
      },intervalTime);
    }else{
      const after = document.createElement('span');
      after.style.display = 'block';
      after.style.height = '100%';
      after.style.width = '0%';
      after.style.borderRadius = '10px';
      after.style.position = 'absolute';
      after.style.left = '0';
      after.style.top = '0';
      el.appendChild(after);

      const bg = el.className.split(' ')[0];
      const colors = {
        'load-red':'#e74c3c',
        'load-blue':'#3498db',
        'load-green':'#2ecc71',
        'load-yellow':'#f1c40f',
        'load-orange':'#e67e22',
        'load-purple':'#9b59b6',
        'load-pink':'#fd79a8',
        'load-teal':'#1abc9c',
        'load-gray':'#95a5a6',
        'load-black':'#34495e'
      };
      after.style.backgroundColor = colors[bg]||'#000';

      let start=null;
      function animate(timestamp){
        if(!start) start=timestamp;
        const progress = Math.min((timestamp-start)/time,1);
        after.style.width = (progress*100)+'%';
        if(progress<1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  });
}

window.addEventListener('load',startLoad);
})();
