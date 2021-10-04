import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // const data = null;
  // const xhr = new XMLHttpRequest();
  private url = ""

  public header:HttpHeaders = new HttpHeaders({'x-rapidapi-host': 'api-football-v1.p.rapidapi.com', 'x-rapidapi-key': 'cba6e7ecb7msh8139a5898a7f9ccp1d4744jsn029b0c05ee9c'});
  constructor(private http:HttpClient) { }



  public getalgo(){
    // return this.http.get('https://api-football-v1.p.rapidapi.com/v3/teams?id=33', {headers: this.header});
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=10');
  }

}
