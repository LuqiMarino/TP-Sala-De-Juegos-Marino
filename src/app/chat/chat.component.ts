import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../clases/Mensaje';
import { DbService } from '../servicios/db.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  mensajesList:Array<Mensaje> = new Array<Mensaje>();
  cargoTodo = false;
  aliasLog = "";
  constructor(private db:DbService) { }

  ngOnInit(): void {
    this.TraerMensajes();
    this.aliasLog = this.db.usuarioLogueado.alias;
    setTimeout(() => {
      this.cargoTodo = true;
    }, 3000);
  }

  TraerMensajes(){
    this.db.obtenerDatos('chat').then((data:any)=>{
      var msjs:Array<any> = data;
      msjs.forEach(x => {
        var mensaje = new Mensaje(x["alias"], x["texto"]);
        mensaje.SetHoras(x["fecha"]);
        this.mensajesList.push(mensaje);
      });
    })
  }

  EnviarMensaje(){
    var nuevoMensaje = (<HTMLInputElement>document.getElementById("nuevoMensaje")).value;
    if (nuevoMensaje != null && nuevoMensaje.length > 0){
      this.db.grabarMensaje(this.aliasLog, nuevoMensaje).then(()=>{
        var mensaje = new Mensaje(this.aliasLog, nuevoMensaje);
        var hoy = new Date();
        var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaHora = fecha + ' ' + hora;
        mensaje.SetHoras(fechaHora);
        this.mensajesList.push(mensaje);
        this.scrollToBottom();
      });
      (<HTMLInputElement>document.getElementById("nuevoMensaje")).value = "";
    }
  }

  scrollToBottom = () => {
    var asd = (<HTMLDivElement>document.getElementById("principal"));
    asd.scrollTop = asd.scrollTop + asd.scrollHeight;
  }

}
