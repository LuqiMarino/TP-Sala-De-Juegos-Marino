import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoSimpsons, Simpsons } from 'src/app/clases/Simpsons';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { DbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  public personajes:Array<Simpsons> = [];
  public juegoActual:JuegoSimpsons = new JuegoSimpsons(this.personajes, true);
  public empezoElJuego = false;
  public btn1 = "";
  public btn2 = "";
  public btn3 = "";
  public btn4 = "";
  public puntos = 0;
  public deshabilitar = false;
  public botonBien = 0;
  public botonMal = 0;
  constructor(private api:ApiService, private router:Router, private auth:AuthServiceService, private db:DbService) { }

  ngOnInit(): void {
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    this.SetPersonajesFromApi();
    setTimeout(() => {
        this.ComenzarJuego();
      }, 4000);
      
  }

  SetPersonajesFromApi(){
    this.api.getalgo().subscribe((data:any) => {        
      var pjs:Array<any> = data;
      pjs.forEach(item => {
        var index = this.personajes.findIndex(a => a.nombre == item["character"])
        if (index == -1)
          this.personajes.push(new Simpsons(item["character"], item["image"]));
          
      });
      this.juegoActual.Traducir()
    });     
  }

  ComenzarJuego(){
    this.deshabilitar = false;
    this.btn1 = "";
    this.btn2 = "";
    this.btn3 = "";
    this.btn4 = "";
    this.juegoActual = new JuegoSimpsons(this.personajes, false);

    if (this.juegoActual.personajes.length >= 4){
      this.ActivarPersonaje();
      this.SetBotones();      
      this.empezoElJuego = true;
    }
    else
    {
      this.deshabilitar = true;
    }
    
  }

  ActivarPersonaje(){
    var randomNum = Math.floor(Math.random() * (this.personajes.length - 0)) + 0;
    this.juegoActual.personajes[randomNum].activa = true;
    this.juegoActual.personajes[randomNum].yaSalio = true;
  }

  SetBotones(){
    var botonesNoSeteados = [0,1,2,3];
    var btnCorrecto = Math.floor(Math.random() * (botonesNoSeteados.length - 0)) + 1;
    switch(btnCorrecto){
      case 1:
        this.btn1 = this.juegoActual.personajes.filter(a => a.activa)[0].nombre;
        var index = this.juegoActual.personajes.findIndex(a => a.nombre == this.btn1);
        this.juegoActual.personajes[index].yaSalio = true;
        botonesNoSeteados = [1,2,3];
        break;
      case 2:
        this.btn2 = this.juegoActual.personajes.filter(a => a.activa)[0].nombre;
        var index = this.juegoActual.personajes.findIndex(a => a.nombre == this.btn2);
        this.juegoActual.personajes[index].yaSalio = true;
        botonesNoSeteados = [0,2,3];
        break;
      case 3:
        this.btn3 = this.juegoActual.personajes.filter(a => a.activa)[0].nombre;
        var index = this.juegoActual.personajes.findIndex(a => a.nombre == this.btn3);
        this.juegoActual.personajes[index].yaSalio = true;
        botonesNoSeteados = [0,1,3];
        break;
      case 4:
        this.btn4 = this.juegoActual.personajes.filter(a => a.activa)[0].nombre;
        var index = this.juegoActual.personajes.findIndex(a => a.nombre == this.btn4);
        this.juegoActual.personajes[index].yaSalio = true;
        botonesNoSeteados = [0,1,2];
        break;
    }
    for (var i=0;i<3;i++){
      var random = Math.floor(Math.random() * (this.personajes.length - 0)) + 0;
      if (this.btn1 == ""){
        if (this.juegoActual.personajes[random].yaSalio == false){
          this.btn1 = this.juegoActual.personajes[random].nombre;
          this.juegoActual.personajes[random].yaSalio = true;
        }
        else{
          i--;
        }
      }        
      else if (this.btn2 == ""){
        if (this.juegoActual.personajes[random].yaSalio == false){
          this.btn2 = this.juegoActual.personajes[random].nombre;
          this.juegoActual.personajes[random].yaSalio = true;
        }
        else{
          i--;
        }
      }
      else if (this.btn3 == ""){
        if (this.juegoActual.personajes[random].yaSalio == false){
          this.btn3 = this.juegoActual.personajes[random].nombre;
          this.juegoActual.personajes[random].yaSalio = true;
        }
        else{
          i--;
        }
      }
      else if (this.btn4 == ""){
        if (this.juegoActual.personajes[random].yaSalio == false){
          this.btn4 = this.juegoActual.personajes[random].nombre;
          this.juegoActual.personajes[random].yaSalio = true;
        }
        else{
          i--;
        }
      }
      
    } 
  }

  ValidarJuego(nombre:string){
    if (!this.deshabilitar){
      var indexGanador = this.juegoActual.personajes.findIndex(a => a.activa);
      if (nombre == this.juegoActual.personajes[indexGanador].nombre){  
        this.puntos++;
      }
      else{
        this.puntos--;
      }
      this.CambiarColoresBotones(nombre, indexGanador).then((x)=>{
        this.EliminarPersonajeActivo(indexGanador);
        this.ComenzarJuego();
      });
    }
    
    
  }

  CambiarColoresBotones(nombrePresionado:string, indexGanador:number){
    this.deshabilitar = true;
    var nombreGanador = this.juegoActual.personajes[indexGanador].nombre
    if (nombrePresionado == nombreGanador){
      if (this.btn1 == nombreGanador)
        this.botonBien = 1;
      else if (this.btn2 == nombreGanador)
        this.botonBien = 2;
      else if (this.btn3 == nombreGanador)
        this.botonBien = 3;
      else
        this.botonBien = 4;
    }
    else{
      if (this.btn1 == nombrePresionado)
        this.botonMal = 1;
      else if (this.btn2 == nombrePresionado)
        this.botonMal = 2;
      else if (this.btn3 == nombrePresionado)
        this.botonMal = 3;
      else
        this.botonMal = 4;

      if (this.btn1 == nombreGanador)
        this.botonBien = 1;
      else if (this.btn2 == nombreGanador)
        this.botonBien = 2;
      else if (this.btn3 == nombreGanador)
        this.botonBien = 3;
      else
        this.botonBien = 4;
    }

    return new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        this.deshabilitar = false;
        this.botonMal = 0;
        this.botonBien = 0;
        resolve(true);
      }, 1500);
    })
    
    
    
  }

  EliminarPersonajeActivo(index:number){
    this.personajes.splice(index, 1);
  }
  
  Guardar(){
    var alias = this.auth.getUsuarioLogueado().alias;
    this.db.grabarJuego("preguntados", alias, this.puntos);
    this.puntos = 0;
    this.router.navigate(['home']);
  }
}

