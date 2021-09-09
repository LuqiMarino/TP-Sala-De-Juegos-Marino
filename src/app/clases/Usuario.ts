export class Usuario{
    mail:string;
    contraseña:string;

    constructor (mail:string, contraseña:string){
        this.mail = mail;
        this.contraseña = contraseña;
    }
}