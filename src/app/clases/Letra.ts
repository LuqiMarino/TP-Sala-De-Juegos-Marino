export class Letra{
    public letra:string;
    public adivinada:boolean;
    public yaPresionada:boolean;
    constructor(letra:string){
        this.letra = letra;
        this.adivinada = false;
        this.yaPresionada = false;
    }
}