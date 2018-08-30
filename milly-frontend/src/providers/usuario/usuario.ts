import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioProvider {
      url:string = "http://localhost:3000";

      constructor(public http: HttpClient) {
      
      }

      cadastraUsuario(nome, email, igreja, senha): Observable<any>{
         
            return this.http.post(this.url+'/cadastro', {
                  nome: nome,
                  email: email,
                  igreja: igreja,
                  senha: senha
            });
      }

      loginUsuario(email, senha): Observable<any>{
            return this.http.post(this.url+'/login', {
                  email: email,
                  senha: senha  
            });
      }

      getDadosUsuario(email): Observable<any>{
            return this.http.get(`${this.url}/usuario/${email}`);
      }

}
