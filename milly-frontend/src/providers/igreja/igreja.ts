import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IgrejaProvider {
      url: string = "http://localhost:3000";

      constructor(public http: HttpClient) {
            
      }

      //Retorna todas as igrejas que há no banco
      getIgrejas(): Observable<any>{
            return this.http.get(this.url+"/igrejas");
      }


      
}
