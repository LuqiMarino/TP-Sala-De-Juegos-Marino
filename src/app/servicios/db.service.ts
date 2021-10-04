import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { Usuario } from '../clases/Usuario';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db = getFirestore();
  public usuariosList:any = [];
  public usuarioLogueado:Usuario = new Usuario("", "");
  constructor() { }

  public async agregarUsuario(user:Usuario){
    var huboError = false;    
    try {
      const docRef = await addDoc(collection(this.db, "usuarios"), { 
        mail: user.mail,
        password: user.password,
        alias: user.alias
      });
    
      //console.log("Documento agregado ID: ", docRef.id);
      //ACA PODRIA MODIFICAR EL DOCUMENTO Y PONERLE EL ID
    } catch (e) {
      huboError = true;
      console.error("Error: ", e);
    }

    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if (!huboError)
          resolve(true);
        else 
          reject();
      }, 1000);
    });
    
  }

  public async grabarLogUsuario(user:Usuario){
    try {
      var hoy = new Date();
      var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
      var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      var fechaHora = fecha + ' ' + hora;
      const docRef = await addDoc(collection(this.db, "logUsuarios"), { 
        mail: user.mail,
        alias: user.alias,
        fecha: fechaHora
      });
    
      //console.log("Documento agregado ID: ", docRef.id);
      //ACA PODRIA MODIFICAR EL DOCUMENTO Y PONERLE EL ID
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  public async grabarJuego(juego:string, alias:string, puntaje:number){
    try {
      var doc = "";
      switch(juego){
        case "mayormenor":
          doc = "puntajesMayorMenor";
          break;
        case "preguntados":
          doc = "puntajesPreguntados";
          break;
        case "ahorcado":
          doc = "puntajesAhorcado";
          break;
        case "poker":
          doc = "puntajesPoker";
          break;
      }
      const docRef = await addDoc(collection(this.db, doc), { 
        alias: alias,
        puntaje: puntaje
      });
    
      //console.log("Documento agregado ID: ", docRef.id);
      //ACA PODRIA MODIFICAR EL DOCUMENTO Y PONERLE EL ID
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  public async obtenerDatos(documento:string){
    this.usuariosList = [];
    const querySnapshot = await getDocs(collection(this.db, documento));    
    querySnapshot.forEach( (doc) => {      
      this.usuariosList.push(doc.data());
      //console.log(`${doc.id} => ${doc.data()["mail"]}`);
    });
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if (this.usuariosList.length > 0)
          resolve(this.usuariosList);
        else
          reject();
      }, 1000);
    })
  }

  public validarUsuarioRegistrado(usuario:Usuario){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {

        this.obtenerDatos("usuarios").then((r:any) => {
        var encontro = false;
        if (r != null){
          for (var i=0;i<r.length;i++){
            if (r[i]["mail"] == usuario.mail){
              var json = {mail:r[i]["mail"], password:r[i]["password"], alias:r[i]["alias"]};
              resolve(json);
              encontro = true;
              break;
            }
          }
        }
        if (!encontro)
          reject("NOOOOO");
        
        }); 
        
      }, 100);
    });
    
  }

}
