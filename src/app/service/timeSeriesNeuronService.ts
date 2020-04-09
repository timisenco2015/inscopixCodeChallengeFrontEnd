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


  // get neural first two cells(rows) of the cellset table
  getFirstTwoCellsNeuralData(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/firstTwoCellsNeuralData`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null || response==undefined)
        {
          return EMPTY;
        }
        else
        {
         
         
          return response.data;
        }
      }), 
      
      catchError(this.handleError)
    )
  }

  //get bout monent of the animal
  getBoutMomentDetails(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/boutMomentDetails`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null || response==undefined)
        {
          return EMPTY;
        }
        else
        {
         
          return response.data;
        }
      }), 
      
      catchError(this.handleError)
    )
  }


  // get full details from the session table
  getSessionFullDetails(data:any): Observable<any>
  {
    
    return  this._apiService.get(`neuron/sessionFullDetails`, data)
    .pipe(

      map((response) => 
      {
        
        if(response==null || response==undefined)
        {
          return EMPTY;
        }
        else
        {
          return response.data;
        }
      }), 
      
      catchError(this.handleError)
    )
  }

  // upload session files
  public uploadSession(formData:any) 
  {
    
    
      return this._apiService.post(`neuron/importSessionJSON`, formData).pipe(

        map((response) => 
        {
          
          if(response==null || response==undefined)
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

  // upload session files by providing location url
  public uploadSessionByLocation(formData:any) 
  {
    
    
      return this._apiService.post(`neuron/importSessionsFromLocation`, formData).pipe(

        map((response) => 
        {
          
          if(response==null || response==undefined)
          {
            return EMPTY;
          }
          else
          {
            return response.data;
          }
        }), 
        
        catchError(this.handleError)
      ) 
    }

    // upload cell files
    public uploadCellSetFile(formData:any) 
    {
   
      
      return this._apiService.post(`neuron/importCellsCSV`, formData).pipe(

        map((response) => 
        {
          
          if(response==null || response==undefined)
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

     // upload cell files by providing location url
     public uploadCellSetFileByLocation(data:any) 
     {
    
       
       return this._apiService.post(`neuron/importCellsCSVFromLocation`, data).pipe(
 
         map((response) => 
         {
           
           if(response==null || response==undefined)
           {
             return EMPTY;
           }
           else
           {
             return response.data;
           }
         }), 
         
         catchError(this.handleError)
       ) 
     }

    // upload gpio files
    public uploadGPIOFile(formData:any) 
    {
    
      return this._apiService.post(`neuron/importGPIOCSV`, formData).pipe(

        map((response) => 
        {
          
          if(response==null || response==undefined)
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
    
  // upload gpio files by providing file location
  public uploadGPIOFileByLocation(formData:any) 
  {
  
    return this._apiService.post(`neuron/importGpiosCSVFromFileLocation`, formData).pipe(

      map((response) => 
      {
        
        if(response==null || response==undefined)
        {
          return EMPTY;
        }
        else
        {
          return response.data;
        }
      }), 
      
      catchError(this.handleError)
    ) 
  }

  private handleError(error: Response) 
  {
    
      return throwError( error);
    
    
  }
}