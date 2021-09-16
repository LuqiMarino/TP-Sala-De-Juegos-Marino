export class Usuario{
    mail:string;
    password:string;
    alias:string;

    constructor (mail:string, password:string, alias?:string){
        this.mail = mail;
        this.password = password;
        if (alias != null)
            this.alias = alias;
        else
            this.alias = "";
    }
}