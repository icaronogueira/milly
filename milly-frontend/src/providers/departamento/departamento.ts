import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DepartamentoProvider {

      url: string = "http://192.168.0.8:3000";

      constructor(public http: HttpClient) {
             console.log('Hello DepartamentoProvider Provider');
      }

      criaDepartamento(nome, igreja, diretor, logo): Observable<any>{
            return this.http.post(this.url+'/departamentos/novo', {
                  nome: nome,
                  igreja: igreja,
                  diretor: diretor,
                  logo: logo
            });
      }


}