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
        let cuerpo={nombre:name, email:email, contrasena:pass, genero:document.getElementById("genero").value}
        fetch("http://localhost:5000/registro", {method:"POST", headers:{'Content-Type':"application/json"}, body:JSON.stringify(cuerpo)}).then((res)=>{
            res.text().then((t)=>{
                if(t=="ok"){
                    alert("Usuario Registro Exitosamente");
                    window.location.href="login.html";
                }else{
                    
                    alert("Correo existente. No se pudo efectuar el registro");
                }
            })
        });
        
    },false);

    document.querySelector(".form-login").addEventListener("submit",(e)=>{
        e.preventDefault();
        let email=document.querySelector("#emailLogin").value;
        let pass=document.querySelector("#contrasenaLogin").value;
        if(email=="" || pass=="") return alert("Completar todos los campos");
        fetch("http://localhost:5000/login/"+email+"/"+pass).then((response)=>{
            response.json().then((txt)=>{
                if(txt.estado=="si"){
                    sessionStorage.setItem("key",txt.id)
                    sessionStorage.setItem("genero", txt.genero);
                    sessionStorage.setItem("test",1);
                    document.location.href="index.html";
                }else{
                    alert("Acceso Denegado. Datos de inicio incorrectos")
                }
            });
        });
    },false);

},false);