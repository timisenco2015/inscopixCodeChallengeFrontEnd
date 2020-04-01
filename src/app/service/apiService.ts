import { Injectable, Injector,Inject } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { APP_CONFIG, AppConfigInterface } from 'src/app.config';
import { throwError } from 'rxjs';


@Injectable()
export class ApiService 
{
  api_url: string;


  constructor(
    private injector: Injector,
    private _http: HttpClient,
    
    @Inject(APP_CONFIG) private config: AppConfigInterface) 
    {
      this.api_url = this.config.GETNEURON_ENDPOINT;
     
    }
 
  private formatErrors(error: any) 
  {
    
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> 
  {
    
    return this._http.get(`${this.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any>
   {

      return this._http.post(
      
       `${this.api_url}${path}`, body
     ).pipe(catchError(this.formatErrors));
   }

 

  
}