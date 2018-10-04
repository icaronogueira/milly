import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IgrejaProvider {
      url: string = "http://192.168.0.7:3000";

      constructor(public http: HttpClient) {
            
      }

      //Retorna todas as igrejas que há no banco
      getIgrejas(): Observable<any>{
            return this.http.get(this.url+"/igrejas");
      }

      getIgreja(igreja): Observable<any> {
            return this.http.get(this.url+`/igrejas/${igreja}`);
      }

      atualizaConfiguracoes(igreja, nome, senhaAdmin): Observable<any> {
            console.log(igreja + ', ' + nome + ' ,' + senhaAdmin);
            return this.http.post(this.url+'/igrejas/configuracoes', {
                  igreja: igreja,
                  nome: nome,
                  senhaAdmin: senhaAdmin
            });
      }
      
      getMembros(idIgreja: string) : Observable<any> {
            return this.http.get(this.url+`/igrejas/membros/${idIgreja}`);
      }
      
}
