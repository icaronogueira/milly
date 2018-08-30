import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from '../../../node_modules/ionic-angular/umd';

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



}
