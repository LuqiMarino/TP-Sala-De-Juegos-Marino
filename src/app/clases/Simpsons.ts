export class Simpsons{
    public img:string;
    public nombre:string;
    public activa:boolean = false;
    public yaSalio:boolean = false;
    constructor(nombre:string, img:string){
        this.img = img;
        this.nombre = nombre;
    }
}

export class JuegoSimpsons{
    public personajes:Array<Simpsons>;

    constructor(personajes:Array<Simpsons>, traducir:boolean){
        this.personajes = personajes;
        console.log("const");
        this.ReiniciarTodo();
        if (traducir)
            this.Traducir();
    }

    ReiniciarTodo(){
        this.personajes.forEach(p => {
            p.activa = false;
            p.yaSalio = false;
        });
    }

    Traducir(){
        for(var i=0;i<this.personajes.length;i++){
            switch(this.personajes[i].nombre){                
                case "Abe Simpson":
                    this.personajes[i].nombre = "Abraham Simpson";
                    break;
                case "Rainier Wolfcastle":
                    this.personajes[i].nombre = "Mc Bain";
                    break;
                case "Homer Simpson":
                    this.personajes[i].nombre = "Homero Simpson";
                    break;
                case "Mr. Burns":
                    this.personajes[i].nombre = "Montgomery Burns";
                    break;
                case "Otto":
                    this.personajes[i].nombre = "Otto";
                    break;
                case "Ralph Wiggum":
                    this.personajes[i].nombre = "Rafa Gorgory";
                    break;
                case "Dr. Nick":
                    this.personajes[i].nombre = "Doctor Nick";
                    break;
                case "Bart Simpson":
                    this.personajes[i].nombre = "Bart Simpson";
                    break;
                case "Chief Wiggum":
                    this.personajes[i].nombre = "Clancy Gorgory";
                    break;
                case "Comic Book Guy":
                    this.personajes[i].nombre = "Hombre de las Historietas";
                    break;
                case "Mayor Quimby":
                    this.personajes[i].nombre = "Alcalde Diamante";
                    break;
                case "Principal Skinner":
                    this.personajes[i].nombre = "Simur Skinner";
                    break;
                case "Waylon Smithers":
                    this.personajes[i].nombre = "Smithers";
                    break;
                case "Milhouse Van Houten":
                    this.personajes[i].nombre = "Milhouse Van Houten";
                    break;
                case "Nelson Muntz":
                    this.personajes[i].nombre = "Nelson Rufino";
                    break;
                case "Groundskeeper Willie":
                    this.personajes[i].nombre = "Willie";
                    break;
                case "Duffman":
                    this.personajes[i].nombre = "Hombre Duff";
                    break;
            }   
        }
    }

    
}