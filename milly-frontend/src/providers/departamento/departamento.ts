import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DepartamentoProvider {

      url: string = "http://localhost:3000";

      constructor(public http: HttpClient) {
             console.log('Hello DepartamentoProvider Provider');
      }

      criaDepartamento(nome, igreja, diretor, logo, idDepartamento): Observable<any>{
            return this.http.post(this.url+'/departamentos/novo', {
                  nome: nome,
                  igreja: igreja,
                  diretor: diretor,
                  logo: logo,
                  idDepartamento: idDepartamento
            });
      }

      getDepartamentos(idIgreja: string) : Observable<any> {
            return this.http.get(`${this.url}/departamentos/${idIgreja}`);
      }

      removeDepartamento(departamento): Observable<any> {
            return this.http.post(this.url+'/departamentos/remover', {
                  departamento: departamento
            });
      }

      seguirDepartamento(usuario, departamento): Observable<any> {
            return this.http.post(this.url+'/departamentos/segue',{
                  usuario: usuario,
                  departamento: departamento
            });
      }

      deixarSeguirDepartamento(usuario, departamento): Observable<any> {
            return this.http.post(this.url+'/departamentos/deixa',{
                  usuario: usuario,
                  departamento: departamento
            });
      }

      getDepartamento(idDepartamento):Observable<any> {
            return this.http.get(`${this.url}/departamento/${idDepartamento}`);
      }


}
