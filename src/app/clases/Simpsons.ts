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

    constructor(personajes:Array<Simpsons>){
        this.personajes = personajes;
        this.ReiniciarTodo();
    }

    ReiniciarTodo(){
        this.personajes.forEach(p => {
            p.activa = false;
            p.yaSalio = false;
        });
    }

    Traducir(nombre:string):string{
        switch(nombre){                
            case "Abe Simpson":
                return "Abraham Simpson";
                
            case "Rainier Wolfcastle":
                return "Mc Bain";
                
            case "Homer Simpson":
                return "Homero Simpson";
                
            case "Mr. Burns":
                return "Montgomery Burns";
                
            case "Otto":
                return "Otto";
                
            case "Ralph Wiggum":
                return "Rafa Gorgory";
                
            case "Dr. Nick":
                return "Doctor Nick";
                
            case "Bart Simpson":
                return "Bart Simpson";
                
            case "Chief Wiggum":
                return "Clancy Gorgory";
                
            case "Comic Book Guy":
                return "Hombre de las Historietas";
                
            case "Mayor Quimby":
                return "Alcalde Diamante";
                
            case "Principal Skinner":
                return "Simur Skinner";
                
            case "Waylon Smithers":
                return "Smithers";
                
            case "Milhouse Van Houten":
                return "Milhouse Van Houten";
                
            case "Nelson Muntz":
                return "Nelson Rufino";
                
            case "Groundskeeper Willie":
                return "Willie";
                
            case "Duffman":
                return "Hombre Duff";
            default: return nombre;
                
        }  
    }

    
}