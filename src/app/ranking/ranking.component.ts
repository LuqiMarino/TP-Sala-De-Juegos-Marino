import { Component, OnInit } from '@angular/core';
import { Puntuacion } from './../clases/Puntuacion'
import { DbService } from '../servicios/db.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  public listadoMayorMenor:Array<Puntuacion> = new Array<Puntuacion>();
  public listadoPreguntados:Array<Puntuacion> = new Array<Puntuacion>();
  public listadoPoker:Array<Puntuacion> = new Array<Puntuacion>();
  public listadoAhorcado:Array<Puntuacion> = new Array<Puntuacion>();
  public aliasListMayorMenor:Array<string> = new Array<string>();
  public aliasListPreguntados:Array<string> = new Array<string>();
  public aliasListPoker:Array<string> = new Array<string>();
  public aliasListAhorcado:Array<string> = new Array<string>();
  public cargoTodo = false;
  mostrarSpinner = false;
  constructor(private db:DbService) { }

  ngOnInit(): void {
    this.MostrarSpinner();
    this.ObtenerDatosMayorMenor();
    this.ObtenerDatosAhorcado();
    this.ObtenerDatosPoker();
    this.ObtenerDatosPreguntados();
    setTimeout(() => {      
      this.cargoTodo = true;
      this.OrdenarListados();
    }, 2000);
    
  }

  ObtenerDatosMayorMenor(){
    this.db.obtenerDatos("puntajesMayorMenor").then((data:any)=>{
      for(var i=0;i<data.length;i++){
        var puntuacion = new Puntuacion(data[i]["alias"], data[i]["puntaje"]);
        this.listadoMayorMenor.push(puntuacion);
        this.aliasListMayorMenor.push(puntuacion.alias);
      }
      this.FiltrarAliasList(this.aliasListMayorMenor, "mayormenor");
      this.AgruparListado(this.listadoMayorMenor, this.aliasListMayorMenor, "mayormenor");
    });
  }

  ObtenerDatosAhorcado(){
    this.db.obtenerDatos("puntajesAhorcado").then((data:any)=>{
      var aliasListAux = new Array<string>();
      for(var i=0;i<data.length;i++){
        var puntuacion = new Puntuacion(data[i]["alias"], data[i]["puntaje"]);
        this.listadoAhorcado.push(puntuacion);
        aliasListAux.push(puntuacion.alias);
      }
      
      this.FiltrarAliasList(aliasListAux, "ahorcado");
      this.AgruparListado(this.listadoAhorcado, this.aliasListAhorcado, "ahorcado");
    });
  }

  ObtenerDatosPoker(){
    this.db.obtenerDatos("puntajesPoker").then((data:any)=>{
      for(var i=0;i<data.length;i++){
        var puntuacion = new Puntuacion(data[i]["alias"], data[i]["puntaje"]);
        this.listadoPoker.push(puntuacion);
        this.aliasListPoker.push(puntuacion.alias);
      }
      this.FiltrarAliasList(this.aliasListPoker, "poker");
      this.AgruparListado(this.listadoPoker, this.aliasListPoker, "poker");
    });
  }

  ObtenerDatosPreguntados(){
    this.db.obtenerDatos("puntajesPreguntados").then((data:any)=>{
      for(var i=0;i<data.length;i++){
        var puntuacion = new Puntuacion(data[i]["alias"], data[i]["puntaje"]);
        this.listadoPreguntados.push(puntuacion);
        this.aliasListPreguntados.push(puntuacion.alias);
      }
      this.FiltrarAliasList(this.aliasListPreguntados, "preguntados");
      this.AgruparListado(this.listadoPreguntados, this.aliasListPreguntados, "preguntados");
    });
  }

  FiltrarAliasList(list:Array<string>, juego:string){
    var newList = new Array<string>();
    list.forEach(alias => {
      if (newList.length > 0){
        var index = newList.findIndex(a => a == alias);
        if (index == -1)
          newList.push(alias);
      }
      else
        newList.push(alias);      
    });
    switch(juego){
      case "mayormenor":
        this.aliasListMayorMenor = newList;
        break;
      case "poker":
        this.aliasListPoker = newList;
        break;
      case "ahorcado":
        this.aliasListAhorcado = newList;
        break;
      case "preguntados":
        this.aliasListPreguntados = newList;
        break;
    }
    
  }

  AgruparListado(listado:Array<Puntuacion>, aliasList:Array<string>, juego:string){
    var newList = new Array<Puntuacion>();
    aliasList.forEach(alias => {
      newList.push(new Puntuacion(alias,0));
    });

    listado.forEach(x => {
      var puntaje = x.puntaje;
      var index = newList.findIndex(a => a.alias == x.alias);
      if (index != -1)
        newList[index].puntaje += puntaje;
    });

    switch(juego){
      case "mayormenor":
        this.listadoMayorMenor = newList;
        break;
      case "poker":
        this.listadoPoker = newList;
        break;
      case "ahorcado":
        this.listadoAhorcado = newList;
        break;
      case "preguntados":
        this.listadoPreguntados = newList;
        break;
    }
  }

  MostrarSpinner(){
    this.mostrarSpinner = true;
    (<HTMLInputElement>document.getElementById("principal")).style.opacity = "0.5";
    setTimeout(() => {
      this.mostrarSpinner = false;
      (<HTMLInputElement>document.getElementById("principal")).style.opacity = "1";
    }, 2000);
  }

  OrdenarListados(){
    this.listadoPreguntados = this.listadoPreguntados.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
    this.listadoAhorcado = this.listadoAhorcado.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
    this.listadoPoker = this.listadoPoker.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
    this.listadoMayorMenor = this.listadoMayorMenor.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
  }

}
