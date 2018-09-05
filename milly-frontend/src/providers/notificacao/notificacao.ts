import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the NotificacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacaoProvider {

      url: string = "http://192.168.0.8:3000";

      constructor(public http: HttpClient) {
      }


      criaNotificacao(usuario, mensagem, componente):Observable<any> {
            return this.http.post(this.url+'/notificacoes/novo', {
               mensagem: mensagem,
               usuario:usuario,
               componente: componente
            });
      }


}