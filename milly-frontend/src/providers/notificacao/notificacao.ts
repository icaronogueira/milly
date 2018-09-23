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

      url: string = "http://192.168.0.16:3000";

      constructor(public http: HttpClient) {
      }


      criaNotificacao(usuario, mensagem, componente, autor, idImagem?, versaoImagem?, dataAdicional?):Observable<any> {
            console.log(`Provider cria notificacao: ${usuario} - ${mensagem} - ${componente}`);
            return this.http.post(this.url+'/notificacoes/novo', {
               mensagem: mensagem,
               usuario:usuario,
               componente: componente,
               autor: autor,
               idImagem: idImagem ? idImagem : undefined,
               versaoImagem: versaoImagem ? versaoImagem : undefined,
               dataAdicional: dataAdicional ? dataAdicional : undefined
            });
      }

      getNotificacoes(usuario): Observable<any> {
            return this.http.post(this.url+'/notificacoes', {
                  usuario: usuario
            });
      }

      leNotificacao(usuario,notificacao):Observable<any> {
            return this.http.post(this.url+'/notificacoes/lida', {
                  usuario: usuario,
                  notificacao: notificacao
            });
      }

      leTodas(usuario): Observable<any> {
            return this.http.post(this.url+'/notificacoes/lertodas',{
                  usuario: usuario
            });
      }

}
