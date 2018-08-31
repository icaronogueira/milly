import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioProvider {
      url:string = "http://192.168.0.8:3000";

      constructor(public http: HttpClient) {
      
      }

      cadastraUsuario(nome, email, igreja, senha, imagem): Observable<any>{
         
            return this.http.post(this.url+'/cadastro', {
                  nome: nome,
                  email: email,
                  igreja: igreja,
                  senha: senha,
                  imagem: imagem
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
