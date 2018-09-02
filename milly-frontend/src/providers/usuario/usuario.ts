import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioProvider {
      url:string = "http://localhost:3000";

      constructor(public http: HttpClient) {
      
      }

      cadastraUsuario(nome, email, igreja, senha, imagem, tipoLogin?): Observable<any>{
            console.log(nome);
            console.log(email);
            console.log(igreja);
            console.log(senha);
            console.log(imagem);
            console.log(tipoLogin);
            return this.http.post(this.url+'/cadastro', {
                  nome: nome,
                  email: email,
                  igreja: igreja,
                  senha: senha,
                  imagem: imagem,
                  tipoLogin: tipoLogin
            });
      }

      deletaUsuario(email): Observable<any> {
            return this.http.post(this.url+'/deleta', {email:email});
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

      recuperaSenha(email): Observable<any> {
            return this.http.post(this.url+'/esqueceusenha', {
                  email: email
            });
      }

      dadosFacebook(accessToken):Observable<any> {
            return this.http.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,about,picture`);
      }

}
