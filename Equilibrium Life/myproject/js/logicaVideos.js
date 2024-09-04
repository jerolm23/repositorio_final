$(document).ready(function(){

    const getVideosByState=(st,all)=>{
        return all.map(vd=>{
            if(vd[1]==st) return vd[0];
        });
    };

    fetch("http://localhost:5000/cargarTodosVideos").then(res=>{
        res.json().then(b=>{
            let dad=document.querySelector(".videosPersonalizados");
            $(".estado").click(function(e){
                dad.innerHTML="";
                getVideosByState(e.target.dataset.key,b).forEach(el=>{
                    if(el!=undefined){
                        let video=document.createElement("video");
                        video.src="http://localhost:5000/static/videos/"+el;
                        video.width=300;
                        video.height=300;
                        video.controls=true;
                        dad.appendChild(video);
                    }
                });
            });
        });
    });
    $(".type").click(function(e){
        let t=e.target.dataset.type;
        $("#title").text("PlayList sobre el crecimiento "+e.target.textContent);
        $(".videos").html("");
        let dad=document.querySelector(".videos");
        
        fetch("http://localhost:5000/loadPlayList").then(resp=>{
            resp.json().then(bd=>{
                let urlYT=`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${getPlayListByGenre(t,bd)}&maxResults=50&key=AIzaSyCSQsbd6wRRBoilah2NPm4SZjvcM8C_Lgo`;

                fetch(urlYT).then(r=>{
                    r.json().then(b=>{
                        b.items.forEach(elem=>{
                            let ah=document.createElement("a");
                            ah.href="https://www.youtube.com/watch?v="+elem.snippet.resourceId.videoId;
                            ah.target="_blank";
                            ah.innerHTML=`<img src='${elem.snippet.thumbnails.medium.url}'>`;
                            dad.appendChild(ah);
                        });
                    });
                });
            
            });
        });

    });
});



const getPlayListByGenre=(gnr,all)=>{
    for(let position=0;position<all.length;position++){
        if(all[position][0]==gnr) return all[position][1];
    }
};