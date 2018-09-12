import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MensagemProvider {

      url: string = "http://localhost:3000";

            
      constructor(public http: HttpClient) {
      }

      enviaMensagem(texto, assunto, tipoDestinatario, paraDepartamento, igreja): Observable<any> {
            console.log(`${texto} - ${assunto} - ${tipoDestinatario} - ${paraDepartamento} - ${igreja}`);
            return this.http.post(`${this.url}/mensagens/enviar`, {
                  texto: texto,
                  assunto: assunto,
                  tipoDestinatario: tipoDestinatario,
                  paraDepartamento: paraDepartamento ? paraDepartamento: null,
                  igreja: igreja
            });
      }

      enviaMensagemParaUsuario(texto, assunto, usuario): Observable<any> {
            return this.http.post(`${this.url}/mensagens/enviaUsuario`, {
                  texto: texto,
                  assunto: assunto,
                  usuario: usuario
            });
      }

}
