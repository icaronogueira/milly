import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider {
      url: string = "http://192.168.0.7:3000";
      
      constructor(public http: HttpClient) {
            console.log('Hello EventoProvider Provider');
      }

      criaEvento(departamento, para, cartaz, titulo, data, horario, descricao, contas,
            departamentosParticipantes, doacoes): Observable<any>{
            console.log('data no provider');
            console.log(departamentosParticipantes);
            return this.http.post(this.url+'/eventos/cadastra', {
                  departamento,
                  para,
                  cartaz,
                  titulo,
                  data,
                  horario,
                  descricao,
                  contas,
                  departamentosParticipantes,
                  doacoes
            });
      }

      adicionaImagem(evento, imagem): Observable<any>{
            return this.http.post(this.url+'/eventos/adicionaimagem', {
                  evento,
                  imagem
            });
      }

}
