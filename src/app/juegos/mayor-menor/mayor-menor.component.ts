import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doc } from '@firebase/firestore';
import { validateArgCount } from '@firebase/util';
import { Carta, Mazo } from 'src/app/clases/Mazo';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { DbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  public mazo = new Mazo();
  public manos:number = 0;
  public puntos:number = 0;
  public carta1:Carta = new Carta("X", "X");
  public carta2:Carta = new Carta("X", "X");
  public deshabilitar = false;
  public reiniciar = false;
  constructor(private router:Router, private auth:AuthServiceService, private db:DbService) { }

  ngOnInit(): void {
  }

  ComenzarJuego(){
    this.mazo.CrearNuevoMazo();
    this.carta1 = this.mazo.SacarCartaAleatoria();
  }

  Aplicar(boton:number){
    switch(boton){
      case 1: //Mayor
        this.carta2 = this.mazo.SacarCartaAleatoria();
        var num1 = this.SetValorCarta(this.carta1.numero);
        var num2 = this.SetValorCarta(this.carta2.numero);
        this.manos++;
        if (num1 > num2){
          this.puntos++;
        }
        break;

      case 2: //Igual
        this.carta2 = this.mazo.SacarCartaAleatoria();
        var num1 = this.SetValorCarta(this.carta1.numero);
        var num2 = this.SetValorCarta(this.carta2.numero);
        this.manos++;
        if (num1 == num2){
          this.puntos = this.puntos + 10;
        }
        break;

      case 3: //Menor
        this.carta2 = this.mazo.SacarCartaAleatoria();
        var num1 = this.SetValorCarta(this.carta1.numero);
        var num2 = this.SetValorCarta(this.carta2.numero);
        this.manos++;
        if (num1 < num2){
          this.puntos++;
        }
        break;
    }
    this.NuevaMano();

  }

  SetValorCarta(nroRecibido:string):number{
    var nrosNoValidos = ['A', 'T', 'J', 'Q', 'K'];
    var esNoValido = nrosNoValidos.includes(nroRecibido);
    var nroAux = "";
    if (esNoValido){
      switch(nroRecibido){
        case 'A': nroAux = "1"; break;
        case 'T': nroAux = "10"; break;
        case 'J': nroAux = "11"; break;
        case 'Q': nroAux = "12"; break;
        case 'K': nroAux = "13"; break;
      }
    }
    else
        nroAux = nroRecibido;
    
    var nro = parseInt(nroAux);
    if (nro != undefined)
      return nro;
    else
      return 0;
  }

  NuevaMano(){
    this.deshabilitar = true;
    setTimeout(() => {
      this.deshabilitar = false;
      this.ValidarTerminoJuego();

      this.carta2 = new Carta("X", "X");
      if (this.reiniciar)
        this.carta1 = new Carta("X", "X");
      else
        this.carta1 = this.mazo.SacarCartaAleatoria();
      
      
    }, 1000);
  }

  ValidarTerminoJuego(){
    if (this.manos == 5){
      this.deshabilitar = true;
      this.reiniciar = true;
    }
  }

  Guardar(salir:boolean){
    this.reiniciar = false;
    this.manos = 0;
    this.deshabilitar = false;
    if (salir){
      var alias = this.auth.getUsuarioLogueado().alias;
      this.db.grabarJuego("mayormenor", alias, this.puntos);
      this.puntos = 0;
      this.router.navigate(['home']);
    }    
    else
      this.ComenzarJuego();
  }
}
