import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carta, Mazo } from 'src/app/clases/Mazo';
import { SimulacionPoker } from 'src/app/clases/SimulacionPoker';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent implements OnInit {
  empezoElJuego = false;
  terminoElJuego = false;
  esGanador = false;
  puedeValidarMano = false;
  puntos = 0;
  mensaje = "";
  simulacionesNoJugadas:Array<number>;

  public simulacion!:SimulacionPoker;
  constructor(private router:Router) { 
    this.simulacionesNoJugadas = [1,2,3,4,5,6,7,8,9,10,11];
    
  } 

  ngOnInit(): void {
  }

  ComenzarJuego(){
    this.empezoElJuego = true;
    var num = this.GetNumeroSimulacionNoJugada();
    this.simulacion = new SimulacionPoker(num);
    this.ValidarSelecteds();
  }

  GetNumeroSimulacionNoJugada():number{
    var random = Math.floor(Math.random() * (this.simulacionesNoJugadas.length - 0)) + 0;
    var simulacionReturn = this.simulacionesNoJugadas[random];

    var index = this.simulacionesNoJugadas.findIndex(a => a == simulacionReturn);
    if (index != -1){
      this.simulacionesNoJugadas.splice(index, 1);
      return simulacionReturn;
    }
    else{
      this.simulacionesNoJugadas = [1,2,3,4,5,6,7,8,9,10,11];
      return this.GetNumeroSimulacionNoJugada();
    }
  }

  SeleccionarCarta(intBotonCarta:number){
    if (!this.terminoElJuego){
      switch(intBotonCarta){
        case 1:
          if (this.simulacion.carta1B.selected)
            this.simulacion.carta1B.selected = false;
          else
            this.simulacion.carta1B.selected = true;
          break;
        case 2:
          if (this.simulacion.carta2B.selected)
            this.simulacion.carta2B.selected = false;
          else
            this.simulacion.carta2B.selected = true;
          break;
        case 3:
          if (this.simulacion.carta3B.selected)
            this.simulacion.carta3B.selected = false;
          else
            this.simulacion.carta3B.selected = true;
          break;
        case 4: 
          if (this.simulacion.carta4B.selected)
          this.simulacion.carta4B.selected = false;
          else
            this.simulacion.carta4B.selected = true;
        break;        
      }    
      this.ValidarSelecteds()
   }
    
    
  }

  ValidarSelecteds(){
    var count = 0;
    count = this.simulacion.carta1B.selected ? count + 1 : count + 0;
    count = this.simulacion.carta2B.selected ? count + 1 : count + 0;
    count = this.simulacion.carta3B.selected ? count + 1 : count + 0;
    count = this.simulacion.carta4B.selected ? count + 1 : count + 0;
    if (count == 0 || count == 1)
      this.puedeValidarMano = true;
    else
      this.puedeValidarMano = false;
  }

  ValidarMano(){
    this.puedeValidarMano = false;
    if (this.simulacion.carta1B.selected){
      if (this.simulacion.carta1B.numero == this.simulacion.cartaGanadora.numero && this.simulacion.carta1B.palo == this.simulacion.cartaGanadora.palo){
        this.esGanador = true;
      }        
    }
    else if (this.simulacion.carta2B.selected){
      if (this.simulacion.carta2B.numero == this.simulacion.cartaGanadora.numero && this.simulacion.carta2B.palo == this.simulacion.cartaGanadora.palo){
        this.esGanador = true;
      }        
    }
    else if (this.simulacion.carta3B.selected){
      if (this.simulacion.carta3B.numero == this.simulacion.cartaGanadora.numero && this.simulacion.carta3B.palo == this.simulacion.cartaGanadora.palo){
        this.esGanador = true;
      }        
    }
    else if (this.simulacion.carta4B.selected){
      if (this.simulacion.carta4B.numero == this.simulacion.cartaGanadora.numero && this.simulacion.carta4B.palo == this.simulacion.cartaGanadora.palo){
        this.esGanador = true;
      }        
    }
    else{ //no selecciono nada
      if (this.simulacion.cartaGanadora.numero == "X" && this.simulacion.cartaGanadora.palo == "X"){
        this.esGanador = true;        
      }
    }
    
    this.terminoElJuego = true;
    this.MostrarMensaje()
  }

  MostrarMensaje(){
    if (this.esGanador){
      this.mensaje = this.simulacion.mensajeGanador;
      this.puntos++;      
    }
    else{
      this.mensaje = this.simulacion.mensajePerdedor;
      this.puntos--;
    }
  }

  Reiniciar(soloReiniciar:boolean){
    this.mensaje = "";
    this.terminoElJuego = false;
    this.esGanador = false;
    if (soloReiniciar)
      this.ComenzarJuego();
  }

  Guardar(){
    this.Reiniciar(false);
    this.router.navigate(['home']);
  }

}
