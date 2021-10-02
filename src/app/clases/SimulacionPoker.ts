import { Carta } from "./Mazo";

export class SimulacionPoker{
    public carta1V!:Carta;
    public carta2V!:Carta;
    public carta1H!:Carta;
    public carta2H!:Carta;
    public carta1C!:Carta;
    public carta2C!:Carta;
    public carta3C!:Carta;
    public carta4C!:Carta;
    public carta5C:Carta = new Carta("B", "B");
    public carta1B!:Carta;
    public carta2B!:Carta;
    public carta3B!:Carta;
    public carta4B!:Carta;
    public gano = false;
    public mensajePerdedor = "Has perdido, el rival tiene ";
    public mensajeGanador = "Felicidades, has ganado con ";
    public cartaGanadora!:Carta;
    
    constructor(juego:number){
        this.SetJuego(juego);
        this.carta5C.selected = true;
    }

    private SetJuego(juego:number){
        switch (juego){
            case 1: //color vs escalera
                this.carta1H = new Carta("2", "C");
                this.carta2H = new Carta("5", "C");
                this.carta1V = new Carta("J", "T");
                this.carta2V = new Carta("6", "P");

                this.carta1C = new Carta("7", "C");
                this.carta2C = new Carta("8", "P");
                this.carta3C = new Carta("9", "C");
                this.carta4C = new Carta("T", "D");

                this.carta1B = new Carta("5", "T");
                this.carta2B = new Carta("A", "D");
                this.carta3B = new Carta("Q", "C");
                this.carta4B = new Carta("2", "P");
                this.mensajePerdedor += "escalera!";
                this.mensajeGanador += "color a la Dama!"
                this.cartaGanadora = this.carta3B;
                break;
            case 2: //color vs color al As
                this.carta1H = new Carta("3", "D");
                this.carta2H = new Carta("6", "D");
                this.carta1V = new Carta("K", "C");
                this.carta2V = new Carta("A", "D");

                this.carta1C = new Carta("2", "D");
                this.carta2C = new Carta("6", "T");
                this.carta3C = new Carta("Q", "D");
                this.carta4C = new Carta("K", "D");
                
                this.carta1B = new Carta("5", "D");
                this.carta2B = new Carta("J", "T");
                this.carta3B = new Carta("T", "D");
                this.carta4B = new Carta("2", "D");
                this.mensajePerdedor += "color al As!";
                this.mensajeGanador += "color al Rey!";
                this.cartaGanadora = this.carta2B;
                break;
            case 3: //full con trio vs dobles
                this.carta1H = new Carta("8", "D");
                this.carta2H = new Carta("T", "T");
                this.carta1V = new Carta("A", "C");
                this.carta2V = new Carta("3", "P");

                this.carta1C = new Carta("3", "T");
                this.carta2C = new Carta("T", "P");
                this.carta3C = new Carta("A", "P");
                this.carta4C = new Carta("2", "C");

                this.carta1B = new Carta("5", "D");
                this.carta2B = new Carta("A", "T");
                this.carta3B = new Carta("8", "P");
                this.carta4B = new Carta("T", "C");
                this.mensajePerdedor += "Doble Pareja de Ases y 3!";
                this.mensajeGanador += "Trio de 10!";
                this.cartaGanadora = this.carta4B;
                break;
            case 4: //Escalera color vs poker
                this.carta1H = new Carta("4", "T");
                this.carta2H = new Carta("8", "T");
                this.carta1V = new Carta("J", "C");
                this.carta2V = new Carta("J", "P");

                this.carta1C = new Carta("7", "T");
                this.carta2C = new Carta("J", "D");
                this.carta3C = new Carta("6", "T");
                this.carta4C = new Carta("J", "T");

                this.carta1B = new Carta("Q", "D");
                this.carta2B = new Carta("5", "T");
                this.carta3B = new Carta("2", "C");
                this.carta4B = new Carta("7", "C");
                this.mensajePerdedor += "Poker de Jacks!";
                this.mensajeGanador += "Escalera de color al 8!";
                this.cartaGanadora = this.carta2B;
                break;
            case 5: //Color vs Poker (DD)
                this.carta1H = new Carta("A", "P");
                this.carta2H = new Carta("K", "P");
                this.carta1V = new Carta("3", "C");
                this.carta2V = new Carta("3", "P");

                this.carta1C = new Carta("3", "T");
                this.carta2C = new Carta("2", "P");
                this.carta3C = new Carta("T", "P");
                this.carta4C = new Carta("3", "D");

                this.carta1B = new Carta("Q", "P");
                this.carta2B = new Carta("4", "D");
                this.carta3B = new Carta("J", "C");
                this.carta4B = new Carta("7", "C");
                this.mensajePerdedor += "Poker de 3!";
                this.mensajeGanador = "Felicidades, era imposible ganar la mano!";
                this.cartaGanadora = new Carta("X", "X");
                break;
            case 6: //Trio vs dobles
                this.carta1H = new Carta("5", "T");
                this.carta2H = new Carta("K", "P");
                this.carta1V = new Carta("Q", "C");
                this.carta2V = new Carta("9", "D");

                this.carta1C = new Carta("9", "T");
                this.carta2C = new Carta("5", "P");
                this.carta3C = new Carta("Q", "P");
                this.carta4C = new Carta("2", "D");

                this.carta1B = new Carta("5", "C");
                this.carta2B = new Carta("4", "D");
                this.carta3B = new Carta("J", "C");
                this.carta4B = new Carta("7", "C");
                this.mensajePerdedor += "Doble Pareja de Damas y 9!";
                this.mensajeGanador += "Trio de 5!";
                this.cartaGanadora = this.carta1B;
                break;
            case 7: //As High vs dobles
                this.carta1H = new Carta("2", "P");
                this.carta2H = new Carta("A", "D");
                this.carta1V = new Carta("3", "C");
                this.carta2V = new Carta("3", "P");

                this.carta1C = new Carta("8", "T");
                this.carta2C = new Carta("8", "P");
                this.carta3C = new Carta("T", "C");
                this.carta4C = new Carta("J", "C");

                this.carta1B = new Carta("Q", "D");
                this.carta2B = new Carta("3", "T");
                this.carta3B = new Carta("4", "P");
                this.carta4B = new Carta("J", "D");
                this.mensajePerdedor += "Doble Pareja de 8 y 3!";
                this.mensajeGanador += "Doble Pareja de Jacks y 8 + Kicker As";
                this.cartaGanadora = this.carta4B;
                break;
            case 8: //Escalera vs Color (DD)
                this.carta1H = new Carta("T", "P");
                this.carta2H = new Carta("9", "D");
                this.carta1V = new Carta("2", "T");
                this.carta2V = new Carta("5", "T");

                this.carta1C = new Carta("K", "T");
                this.carta2C = new Carta("6", "T");
                this.carta3C = new Carta("Q", "P");
                this.carta4C = new Carta("3", "T");

                this.carta1B = new Carta("J", "P");
                this.carta2B = new Carta("3", "D");
                this.carta3B = new Carta("4", "P");
                this.carta4B = new Carta("6", "D");
                this.mensajePerdedor += "Color al Rey";
                this.mensajeGanador = "Felicidades, era imposible ganar la mano!";
                this.cartaGanadora = new Carta("X", "X");
                break;
            case 9: //Full vs Escalera
                this.carta1H = new Carta("7", "C");
                this.carta2H = new Carta("7", "P");
                this.carta1V = new Carta("6", "T");
                this.carta2V = new Carta("8", "C");

                this.carta1C = new Carta("T", "T");
                this.carta2C = new Carta("A", "T");
                this.carta3C = new Carta("7", "D");
                this.carta4C = new Carta("9", "P");

                this.carta1B = new Carta("Q", "P");
                this.carta2B = new Carta("2", "C");
                this.carta3B = new Carta("T", "T");
                this.carta4B = new Carta("K", "C");
                this.mensajePerdedor += "Escalera al Diez!";
                this.mensajeGanador += "Full de 7 y Diez!";
                this.cartaGanadora = this.carta3B;
                break;
            case 10: //Color vs Full (DD)
                this.carta1H = new Carta("Q", "P");
                this.carta2H = new Carta("A", "P");
                this.carta1V = new Carta("9", "C");
                this.carta2V = new Carta("9", "T");

                this.carta1C = new Carta("2", "T");
                this.carta2C = new Carta("J", "P");
                this.carta3C = new Carta("8", "P");
                this.carta4C = new Carta("2", "C");

                this.carta1B = new Carta("2", "P");
                this.carta2B = new Carta("7", "D");
                this.carta3B = new Carta("5", "D");
                this.carta4B = new Carta("K", "C");
                this.mensajePerdedor += "Full de 9 y 2!";
                this.mensajeGanador = "Felicidades, era imposible ganar la mano!";
                this.cartaGanadora = new Carta("X", "X");
                break;
            case 11: //Escalera vs Escalera Mejor (DD)
                this.carta1H = new Carta("A", "P");
                this.carta2H = new Carta("2", "T");
                this.carta1V = new Carta("K", "T");
                this.carta2V = new Carta("6", "D");

                this.carta1C = new Carta("3", "C");
                this.carta2C = new Carta("4", "P");
                this.carta3C = new Carta("K", "C");
                this.carta4C = new Carta("2", "D");

                this.carta1B = new Carta("9", "C");
                this.carta2B = new Carta("5", "D");
                this.carta3B = new Carta("J", "D");
                this.carta4B = new Carta("K", "P");
                this.mensajePerdedor += "Escalera al 6!";
                this.mensajeGanador = "Felicidades, era imposible ganar la mano!";
                this.cartaGanadora = new Carta("X", "X");
                break;
        }
    }

    
}