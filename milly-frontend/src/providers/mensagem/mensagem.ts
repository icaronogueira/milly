import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MensagemProvider {

      url: string = "http://192.168.43.194:3000";

            
      constructor(public http: HttpClient) {
      }

      enviaMensagem(texto, assunto, tipoDestinatario, paraDepartamento, igreja): Observable<any> {
            console.log(`${texto} - ${assunto} - ${tipoDestinatario} - ${paraDepartamento} - ${igreja}`);
            return this.http.post(`${this.url}/mensagens/enviar`, {
                  texto: texto,
                  assunto: assunto,
                  tipoDestinatario: tipoDestinatario,
                  remetente: 'Administração',
                  paraDepartamento: paraDepartamento ? paraDepartamento: null,
                  igreja: igreja
            });
      }

      enviaMensagemParaUsuario(texto, assunto, usuario, remetente): Observable<any> {
            return this.http.post(`${this.url}/mensagens/enviaUsuario`, {
                  texto: texto,
                  assunto: assunto,
                  usuario: usuario,
                  remetente: remetente
            });
      }

}
