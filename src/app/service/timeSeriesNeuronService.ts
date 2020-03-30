import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of,EMPTY,throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { ApiService } from './apiService';



@Injectable()
export class TimeSeriesNeuronService
{
  private _http: HttpClient;
  _apiService: ApiService;
  
 
  constructor(private http: HttpClient,_apiService: ApiService)
  {
    this._http=http;
    this._apiService = _apiService;

  }


  
  getFirstTwoCellsNeuralData(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/firstTwoCellsNeuralData`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null)
        {
          return EMPTY;
        }
        else
        {
         
          return response;
        }
      }), 
      
      catchError(this.handleError)
    )
  }

  
  getBoutMomentDetails(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/boutMomentDetails`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null)
        {
          return EMPTY;
        }
        else
        {
          console.log(response);
          return response;
        }
      }), 
      
      catchError(this.handleError)
    )
  }


  
  getSessionFullDetails(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/sessionFullDetails`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null)
        {
          return EMPTY;
        }
        else
        {
          return response;
        }
      }), 
      
      catchError(this.handleError)
    )
  }

  public uploadSession(formData:any) 
  {
    
    
      return this._apiService.post(`neuron/importSessionJSON`, formData).pipe(

        map((response) => 
        {
          
          if(response==null)
          {
            return EMPTY;
          }
          else
          {
            return response;
          }
        }), 
        
        catchError(this.handleError)
      ) 
    }

    public uploadCellSetFile(formData:any) 
    {
   
      
      return this._apiService.post(`neuron/importCellsCSV`, formData).pipe(

        map((response) => 
        {
          
          if(response==null)
          {
            return EMPTY;
          }
          else
          {
            return response;
          }
        }), 
        
        catchError(this.handleError)
      ) 
    }

    public uploadGPIOFile(formData:any) 
    {
    
      return this._apiService.post(`neuron/importGPIOCSV`, formData).pipe(

        map((response) => 
        {
          console.log(response);
          if(response==null)
          {
            return EMPTY;
          }
          else
          {
            return response;
          }
        }), 
        
        catchError(this.handleError)
      ) 
    }
    
 

  private handleError(error: Response) 
  {
    console.log("--++--> ",error);
      return throwError( error);
    
    
  }
}