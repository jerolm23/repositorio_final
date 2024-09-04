from flask import Flask, render_template,   request, jsonify
import MySQLdb
from flask_cors import CORS
import smtplib 
from email.message import EmailMessage 
from flask_mail import Mail, Message
from pathlib import Path
import os
from werkzeug.utils import secure_filename

app=Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'  
app.config['MAIL_PORT'] = 587  
app.config['MAIL_USE_TLS'] = True  
app.config['MAIL_USERNAME'] = 'equilibriumlifeparati@gmail.com'  
app.config['MAIL_PASSWORD'] = 'x r y e s h y d i p c a u z a n'    
app.config['UPLOAD_FOLDER']="./static"

CORS(app)

mail = Mail(app)

@app.route("/registro", methods=['POST'])
def insertar():

    cuerpo=request.get_json()

    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    if cursor.execute(f"SELECT * FROM usuario WHERE correo='{cuerpo.get("email")}'")>0: return "no"

    cursor.execute(f"INSERT INTO usuario VALUES (0,'{cuerpo.get("nombre")}', '{cuerpo.get("email")}', '{cuerpo.get("contrasena")}', '{cuerpo.get("genero")}')")


    conexion.commit()

    return "ok"

@app.route("/login/<email>/<contrasena>")
def login(email,contrasena):

    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    ejecucion=cursor.execute(f"SELECT * FROM usuario WHERE correo='{email}' and contrasena='{contrasena}'")

    if(ejecucion==0):
        return jsonify({"estado":"no"})
    else:
        registros=cursor.fetchall()
        print(registros)
        return jsonify({"estado":"si", "id":registros[0][0], "genero":registros[0][4]})

@app.route("/obtenerUsuario/<id>")
def obt(id):

    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute(f"SELECT * FROM USUARIO WHERE id={id}")

    registro=cursor.fetchall()

    datos={"nombre":registro[0][1], "correo":registro[0][2],"contra":registro[0][3]}

    return jsonify(datos)


@app.route("/actualizar", methods=['POST'])
def udate():

    body=request.get_json()
    

    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute(f"UPDATE USUARIO SET nombre='{body.get("nombre")}', correo='{body.get("correo")}', contrasena='{body.get("contra")}' WHERE id={body.get("id")}")


    conexion.commit()
    
    return "OK"

@app.route("/eliminar/<id>")
def delet(id):
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute(f"DELETE FROM USUARIO WHERE id={id}")

    conexion.commit()

    return "OK"

@app.route("/enviarMensaje", methods=["POST"])
def sendM():

    body=request.get_json()
    bodyEmail=f"""  
     <h1 style='color:rgb(23,229,23)'>Nombre: <span style='color:black'>{body.get("name")}</span></h1>
     <h1 style='color:rgb(23,229,23)'>Correo: <span style='color:black'>{body.get("to")}</span></h1>  
     <h1 style='color:rgb(23,229,23)'>Telefono: <span style='color:black'>{body.get("tel")}</span></h1>  
     <h1 style='color:rgb(23,229,23)'>Mensaje: <span style='color:black'>{body.get("mss")}</span></h1>  
    """
    enviarEmail(["equilibriumlifeparati@gmail.com"], "Mensaje - PQRS, Usuario", bodyEmail)
    return "ok"

def enviarEmail(to,subject,body):
    msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=to)  
    msg.html=body
    try:
        mail.send(msg) 
    except Exception as e:
        print(e)

def getAllEmails():
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")
    cursor=conexion.cursor()
    cursor.execute("SELECT * FROM USUARIO")
    registros=cursor.fetchall()
    emails=[]
    for data in registros:
        emails.append(data[2])
    return emails

@app.route("/subirVideo", methods=['POST'])
def uploadVideo():
    file=request.files["infoFile"]
    file.save("C:/Users/Jeronimo/Desktop/PROYECTO FINAL/sistema-equilibrium/Equilibrium Life/myproject/SERVER/static/videos/"+secure_filename(file.filename))
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")
    cursor=conexion.cursor()
    cursor.execute(f"INSERT INTO videos VALUES ('{secure_filename(file.filename)}',{int(request.form["estado"])})")
    conexion.commit()

    enviarEmail(getAllEmails(),request.form["subject"], "<h3 style:'font-family:Courier'>"+request.form["message"]+"</h3>")
    return "uploaded"

@app.route("/cargarTodosVideos", methods=['GET'])
def getUrlVideos():
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")
    cursor=conexion.cursor()
    cursor.execute("SELECT * FROM videos")
    registros=cursor.fetchall()
    return jsonify(registros)
    
@app.route("/subirLibro", methods=["POST"])
def uploadBook():
    file=request.files["infoFile"]
    file.save("C:/Users/Jeronimo/Desktop/PROYECTO FINAL/sistema-equilibrium/Equilibrium Life/myproject/SERVER/static/libros/"+secure_filename(file.filename))
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")
    cursor=conexion.cursor()
    cursor.execute(f"INSERT INTO libros VALUES ('{secure_filename(file.filename)}',{int(request.form["estado"])},'{request.form["tipo"]}')")
    conexion.commit()
    enviarEmail(getAllEmails(),request.form["subject"], "<h3 style:'font-family:Courier'>"+request.form["message"]+"</h3>")
    return "uploaded"

@app.route("/cargarTodosLibros", methods=["GET"])
def getAllBooks():
     conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")
     cursor=conexion.cursor()
     cursor.execute("SELECT * FROM libros")
     registros=cursor.fetchall()
     return jsonify(registros)


@app.route("/recuperarCuenta/<c>", methods=["POST"])
def save(c):
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    ejecucion=cursor.execute(f"SELECT * FROM usuario WHERE correo='{c}'")

    if(ejecucion==0):
        return jsonify({"estado":"no"})
    else:
        data=cursor.fetchall()
        #def enviarEmail(to,subject,body):

        enviarEmail([data[0][2]],"Recuperación cuenta","<h2 style='color:rgb(23,229,23)'>¡Parece que olvidaste tu contraseña!</h2> <h2>Vuelve e ingresa, tu contraseña es: <span style='font-weigth:bold; text-decoration:underline'>"+data[0][3]+"</span></h2>")
        
        return jsonify({"estado":"si"})


@app.route("/setPlayList", methods=["POST"])
def setP_L():
    data=request.get_json()
   
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute(f"DELETE FROM playlist WHERE genero='{data.get("genre")}'")

    cursor.execute(f"INSERT INTO playlist VALUES('{data.get("genre")}', '{data.get("url")}')")

    conexion.commit()

    enviarEmail(getAllEmails(),data.get("subject"), "<h3 style:'font-family:Courier'>"+data.get("body")+"</h3>")

    return "ok"


@app.route("/conteo", methods=["POST"])
def actualizarConteo():

    data=request.get_json()

    sql=f"UPDATE {data.get("table")} SET cantidad=cantidad+1 WHERE estadoAnimo='{data.get("emotion")}'"

    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute(sql)

    conexion.commit()

    return "_"

"""
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
"""

@app.route("/loadPlayList", methods=["GET"])
def getPL():
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    ejecucion=cursor.execute(f"SELECT * FROM playlist")

    out=cursor.fetchall()

   

    return jsonify(out)


@app.route("/estadisticas")
def estadisticas():
    conexion=MySQLdb.connect("localhost", "root", "admin", "proyecto")

    cursor=conexion.cursor()

    cursor.execute("SELECT * FROM conteomasculino")

    masculino=cursor.fetchall()
    
    cursor.execute("SELECT * FROM conteofemenino")

    femenino=cursor.fetchall()

    return jsonify( {"masculino":masculino,"femenino":femenino} )

if __name__ == '_main_':
    app.run(debug=True)

app.run(debug=True)