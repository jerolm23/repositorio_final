$(document).ready(function(){
    if(sessionStorage.getItem("key")==undefined){
        window.location.href="login.html";
    }
    if(!Boolean(parseInt(sessionStorage.getItem("test")))) document.querySelector(".formularioEmocional").style.display="none";
});