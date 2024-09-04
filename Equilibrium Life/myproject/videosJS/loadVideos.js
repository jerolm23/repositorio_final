window.addEventListener("load", async()=>{
    let superDad=document.querySelector(".video-section");
    let response=await fetch("http://localhost:5000/cargarTodosVideos");
    let bodyR=await response.json();
    let baseUrl="http://localhost:5000/static/videos/";
    bodyR.forEach(v=>{
        let video=document.createElement("video");
        video.src=baseUrl+v;
        video.width="350";
        video.height="350";
        video.controls=true;
        superDad.appendChild(video);
    });
});

/** 
 * <div class="col-md-4">
                    <div class="video-container">
                        <iframe width="100%" height="215" src="https://www.youtube.com/embed/hIeTQNHtPZc" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
*/