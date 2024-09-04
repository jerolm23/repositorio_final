window.addEventListener("load",()=>{
    document.querySelector(".form-register").addEventListener("submit",(e)=>{
        e.preventDefault();
        let name=document.querySelector("#nombre").value;
        let email=document.querySelector("#email").value;
        let pass=document.querySelector("#contrasena").value;
        if(name=="" || email=="" || pass==""){
            alert("Llenar todos los campos");
            return;
        }
        let cuerpo={nombre:name, email:email, contrasena:pass}
        fetch("http://localhost:5000/registro", {method:"POST", headers:{'Content-Type':"application/json"}, body:JSON.stringify(cuerpo)}).then((res)=>{
            res.text().then((t)=>{
                document.location.href="index.html";
            })
        });
        
    },false);

    document.querySelector(".form-login").addEventListener("submit",(e)=>{
        e.preventDefault();
        let email=document.querySelector("#emailLogin").value;
        let pass=document.querySelector("#contrasenaLogin").value;
        fetch("http://localhost:5000/login/"+email+"/"+pass).then((response)=>{
            response.text().then((txt)=>{
                if(txt=="si"){
                    document.location.href="index.html";
                }else{
                    alert("Acceso Denegado. Datos de inicio incorrectos")
                }
            });
        });
    },false);

},false);