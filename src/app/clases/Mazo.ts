export class Mazo{
    cartas:Array<Carta> = new Array<Carta>();
    empezoElJuego:boolean;
    numeros = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    palos = ['C', 'T', 'P', 'D']; 

    constructor(){
        this.empezoElJuego = false;
    }

    public CrearNuevoMazo(){
        this.cartas = new Array<Carta>();        
        this.numeros.forEach(n => {
            this.palos.forEach(p => {
                this.cartas.push(new Carta(n, p));
                
            });
        });        
        this.empezoElJuego = true;
        
        this.SacarCartaAleatoria();
    }

    public SacarCartaAleatoria():Carta{
        var randomNum = Math.floor(Math.random() * (13 - 0)) + 0;
        var randomPalo = Math.floor(Math.random() * (4 - 0)) + 0;
        var palo = this.palos[randomPalo];
        var numero = this.numeros[randomNum];

        var index = this.cartas.findIndex(a => a.numero == numero && a.palo == palo);
        if (index != -1){
            this.cartas.splice(index, 1);
            return new Carta(numero, palo);
        }
        else{
            return this.SacarCartaAleatoria();
        }
    }
}

export class Carta{
    public numero:string;
    public palo:string;
    public img:string;
    
    constructor(numero:string, palo:string){
        this.numero = numero;
        this.palo = palo;
        this.img = "./../../../assets/cartas/" + numero + palo + ".png";
    }
}