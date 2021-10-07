export class Mensaje{
    public alias:string;
    public texto:string;
    public dia:string="";
    public mes:string="";
    public hora:string="";
    public minuto:string="";
    public fechaString="";

    constructor(alias:string, texto:string){
        this.alias = alias;
        this.texto = texto;
    }

    SetHoras(fechaRecibida:string){
        var fechaNueva = fechaRecibida.split(' ');
        var fecha = fechaNueva[0].split('-');
        var horario = fechaNueva[1].split(':');
        
        this.dia = fecha[0];
        if (this.dia.length == 1)
            this.dia = "0" + this.dia;
        this.mes = fecha[1];
        if (this.mes.length == 1)
            this.mes = "0" + this.mes;
        this.hora = horario[0];
        if (this.hora.length == 1)
            this.hora = "0" + this.hora;
        this.minuto = horario[1];
        if (this.minuto.length == 1)
            this.minuto = "0" + this.minuto;
        this.fechaString = this.dia + "/" + this.mes + " " + this.hora + ":" + this.minuto;
    }
}