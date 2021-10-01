import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Letra } from 'src/app/clases/Letra';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  palabras:string[] = []; 
  letras1:Array<Letra> = new Array<Letra>(); letras2:Array<Letra> = new Array<Letra>(); letras3:Array<Letra> = new Array<Letra>(); 
  palabraEnJuego:Array<Letra> = new Array<Letra>();
  empezoElJuego=false; reiniciar = false;
  cantidadErrores = 0; puntos = 0; totalDePuntos = 0;
  
  constructor(private router:Router){}

  ngOnInit(){
    this.ComenzarJuego();
  }

  RellenarPalabras(){
    this.palabras = ['gato', 'perro', 'ventilador', 'diccionario', 'teclado', 'monitor', 'frasco', 'tijera', 'alicate', 'mesa', 'sillon', 'gabinete', 'ave', 'baranda', 'papel', 'cartuchera',
    'pantalon', 'camisa', 'gaseosa', 'auto', 'colectivo', 'peluca', 'oreja', 'tobillo', 'zapato', 'juego', 'baraja', 'ficha', 'bolsa', 'paraguas', 'heladera', 'congelado',
    'manzana', 'banana', 'polvo', 'martillo', 'ropa', 'montaña', 'atardecer', 'asado', 'vacio', 'manija', 'anteojos', 'cordon', 'vereda', 'avenida'];
  }

  ComenzarJuego(){
    this.cantidadErrores = 0;
    this.RellenarPalabras();
    var randomNum = Math.floor(Math.random() * (this.palabras.length - 0)) + 0;
    var palabraAux = this.palabras[randomNum];
    this.SetPalabraEnJuego("pedo");
    this.SetLetrasEnJuego();

    var index = this.palabras.findIndex(a => a == palabraAux);
    if (index != -1){
      this.palabras.splice(index, 1);
    }
    this.empezoElJuego=true;
    this.ValidarCantidadErrores();
  }

  SetPalabraEnJuego(palabraRecibida:string){
    this.totalDePuntos = palabraRecibida.length;
    for(var i=0;i<this.totalDePuntos;i++){
      this.palabraEnJuego.push(new Letra(palabraRecibida[i]));
    }
  }

  SetLetrasEnJuego(){
    var aux:string = 'ABCDEFGHI';
    for(var i=0;i<aux.length;i++){
      this.letras1.push(new Letra(aux[i]));
    }
    aux = 'JKLMNÑOPQ';
    for(var i=0;i<aux.length;i++){
      this.letras2.push(new Letra(aux[i]));
    }
    aux = 'RSTUVWXYZ';
    for(var i=0;i<aux.length;i++){
      this.letras3.push(new Letra(aux[i]));
    }
  }

  ValidarLetra(letra:string){
    this.DeshabilitarLetra(letra); 
    var indexPalabra = this.palabraEnJuego.findIndex(a => a.letra.toUpperCase() == letra && a.adivinada == false);
    
    if (indexPalabra == -1){
      this.cantidadErrores++;
      this.ValidarCantidadErrores();
    }
    else{
      this.palabraEnJuego[indexPalabra].adivinada = true;
      if (this.ValidarGano()){
        this.puntos = this.puntos + this.totalDePuntos;
        this.reiniciar = true;
      }
      else
        this.ValidarLetraDeNuevo(letra);
    }
  }

  ReiniciarJuego(){    
    setTimeout(() => {
      this.reiniciar = false;
      this.cantidadErrores = 0;
      this.totalDePuntos = 0;
      this.palabras = []; this.letras1 = []; this.letras2 = []; this.letras3 = []; this.palabraEnJuego = [];
      this.empezoElJuego = true;
      this.ComenzarJuego();
    }, 1500);
    
  }

  ValidarGano():boolean{
    for (var i=0;i<this.palabraEnJuego.length;i++){      
        if (this.palabraEnJuego[i].adivinada == false)
          return false;
    }
    return true;
  }

  DeshabilitarLetra(letra:string){
    var indexLetras = this.letras1.findIndex(a => a.letra.toUpperCase() == letra);
    if (indexLetras != -1)
      this.letras1[indexLetras].yaPresionada = true;
    else{
      var indexLetras = this.letras2.findIndex(a => a.letra.toUpperCase() == letra);
      if (indexLetras != -1){
        this.letras2[indexLetras].yaPresionada = true;
      }
      else{
        var indexLetras = this.letras3.findIndex(a => a.letra.toUpperCase() == letra);
        if (indexLetras != -1){
          this.letras3[indexLetras].yaPresionada = true;
        }
      }
    }  
    
  }

  ValidarLetraDeNuevo(letra:string){
    var index = this.palabraEnJuego.findIndex(a => a.letra.toUpperCase() == letra && a.adivinada == false);
    if (index != -1){
      this.palabraEnJuego[index].adivinada = true;
      this.ValidarLetraDeNuevo(letra);
    }
  }

  ValidarCantidadErrores(){
    // this.img0 = false; this.img1 = false; this.img2 = false; this.img3 = false; this.img4 = false; this.img5 = false; this.img6 = false; this.img7 = false;
    // if (this.cantidadErrores == 0)
    //   this.img7 = true;
    // else if (this.cantidadErrores == 1)
    //   this.img6 = true;
    // else if (this.cantidadErrores == 2)
    //   this.img5 = true;
    // else if (this.cantidadErrores == 3)
    //   this.img4 = true;
    // else if (this.cantidadErrores == 4)
    //   this.img3 = true;
    // else if (this.cantidadErrores == 5)
    //   this.img2 = true;
    // else if (this.cantidadErrores == 6)
    //   this.img1 = true;
    if (this.cantidadErrores == 7){
      this.puntos = this.puntos - this.totalDePuntos;
      this.reiniciar = true;
    }
      
  }
  
  
  Guardar(salir:boolean){   
    // var alias = this.auth.getUsuarioLogueado().alias;
    // this.db.grabarJuego("mayormenor", alias, this.puntos);
    // this.reiniciar = false;
    // this.deshabilitar = false; 
    // this.puntos = 0;
    // this.manos = 0;

    if (salir)
      this.router.navigate(['home']);
    else
      this.ReiniciarJuego();
  }

}
