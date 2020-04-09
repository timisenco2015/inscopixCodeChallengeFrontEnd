import { Component, OnDestroy  } from '@angular/core';
import {TimeSeriesNeuronService} from "../../../app/service/timeSeriesNeuronService"
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import {Subject,} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'file-upload-location',
  templateUrl: './fileLocationUpload.html',
  styleUrls: ['./fileLocationUpload.css']
})
export class FileLocationUploadComponent implements OnDestroy
{
  
  

    isSessionError=false;

    isSessionIdError=false;

    isCellsError=false;

    isGPIOSError=false;

    _spinner: NgxSpinnerService;

    _timeSeriesNeuronService:TimeSeriesNeuronService;

    cellsFilesLocationTextChanged: Subject<string> = new Subject<string>();

    gpiosFilesLocationTextChanged: Subject<string> = new Subject<string>();

    sessionsFilesLocationTextChanged: Subject<string> = new Subject<string>();

    sessionsIdTextChanged: Subject<string> = new Subject<string>();


    sessionIdValue:string;

    errorMessage:any;

    gPIOsFileName:string;

    sessionsFileName:string;

    cellsFileName:string;


    constructor(timeSeriesNeuronService:TimeSeriesNeuronService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar)
    {
        this._timeSeriesNeuronService=timeSeriesNeuronService;

        this._spinner = spinner;

        
        
    }

    ngOnInit() 
    {
        // listen to input from cells file location text input
        this.cellsFilesLocationTextChanged.pipe(debounceTime(1000)).subscribe(response=>
        {
            if(response=="")
            {
             this.cellsFileName = null;
            }
            else
            {
                
                this.cellsFileName=response;
                
            }
        });

        // listen to input from sessions file location text input
        this.sessionsFilesLocationTextChanged.pipe(debounceTime(2000)).subscribe(response=>
        {
            if(response=="")
            {
                this.sessionsFileName = null;
            }
            else
            {
                
                this.sessionsFileName=response;
                
            }
        });

        // listen to input from gpios file location text input
        this.gpiosFilesLocationTextChanged.pipe(debounceTime(2000)).subscribe(response=>
        {
            if(response=="")
            {
                this.gPIOsFileName = null;
            }
            else
            {
               
                this.gPIOsFileName=response;
                
            }
        });

        // listen to input from session id text input
        this.sessionsIdTextChanged.pipe(debounceTime(2000)).subscribe(response=>
        {
            if(response=="")
            {
                this.sessionIdValue = null;
            }
            else
            {
                
                this.sessionIdValue=response;
               
            }
        });
    }

    ngOnDestroy() 
    {
        this.cellsFilesLocationTextChanged.unsubscribe();

        this.gpiosFilesLocationTextChanged.unsubscribe();


        this.sessionsFilesLocationTextChanged.unsubscribe();

        this.sessionsIdTextChanged.unsubscribe();
     
    }

    
    // this method is used to upload session files
    uploadSessionFilesClick() 
    {  
        this.errorMessage="";

        this.isGPIOSError = false;

        this.isCellsError = false;
            
        this.isSessionError = false;

        this.isSessionIdError=false;
        
        if (this.sessionsFileName==null)
        {
            this.isSessionError=true;
        }

      
        if (this.sessionsFileName!=null)
        {
            this.spinner.show();

            
            this._timeSeriesNeuronService.uploadSessionByLocation({"fileName": this.sessionsFileName})
            .subscribe(response => 
            {
            
                this.spinner.hide(); 
               
           
                this.errorMessage=JSON.stringify(response["object"]) ;
                
            
                },
            error => 
            {
                this.errorMessage=JSON.stringify(error) ;

                this.spinner.hide(); 
               
                this._snackBar.open(error.message, 'close', 
                {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 3000,
                    direction: 'ltr'
                });
            
            });
        
        }
        
       
    }



    // this method is used to upload gpio files
    uploadGPIOFilesClick() 
    {  
        this.errorMessage="";

        this.isGPIOSError = false;

        this.isCellsError = false;

        this.isSessionError = false;

        this.isSessionIdError=false;

        var formData = new FormData(); 

        formData.append('fileName', this.gPIOsFileName);

        formData.append('sessionId', this.sessionIdValue);
           
        if (this.gPIOsFileName==null)
        {

            this.isGPIOSError=true;
        
        }
        if(this.sessionIdValue==null)
        {

            this.isSessionIdError=true;

        }
        if (this.sessionIdValue!=null && this.gPIOsFileName!=null)
        {
            this.spinner.show();

            this._timeSeriesNeuronService.uploadGPIOFileByLocation({"fileName": this.gPIOsFileName,"sessionId":this.sessionIdValue})
            .subscribe(response => 
            {
            
                this.spinner.hide(); 

           
                this.errorMessage=JSON.stringify(response["object"]) ;
                
               
            
            },
            error => 
            {

                this.errorMessage=JSON.stringify(error["object"]);

                this.spinner.hide(); 
               
                this._snackBar.open(error.message, 'close', 
                {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 3000,
                    direction: 'ltr'
                });
            
            
            });
            
        }
       
       
    }


    // this method is used to upload cells files
    uploadCellSetFilesClick()  
    {   
        this.errorMessage="";

        this.isGPIOSError = false;

        this.isCellsError = false;
            
        this.isSessionError = false;

        this.isSessionIdError=false;
      
        if (this.cellsFileName==null)
        {
            this.isCellsError = true;
        }

        if(this.sessionIdValue==null)
        {
            this.isSessionIdError=true;
        }

        if (this.sessionIdValue!=null && this.cellsFileName!=null)
        {
            this.spinner.show();
            this._timeSeriesNeuronService.uploadCellSetFileByLocation({"fileName": this.cellsFileName,"sessionId":this.sessionIdValue})
            .subscribe(response => 
            {
            
                this.spinner.hide(); 

           
                
                this.errorMessage=JSON.stringify(response["object"]) ;
               
                
            },
            error => 
            {

                this.errorMessage=JSON.stringify(error["object"]);

                this.spinner.hide(); 
                
                this._snackBar.open(error.message, 'close', 
                {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 3000,
                    direction: 'ltr'
                });
            
            
            });
        }
       
    }
       
    //angular keyup method in the neualDisplay html
    gPIOFileLocationInput(event)
    {
       
      this.gpiosFilesLocationTextChanged.next(event.target.value);
    }
    
    //angular keyup method in the neualDisplay html
    cellsFileLocationInput(event)
    {
      
      this.cellsFilesLocationTextChanged.next(event.target.value);
    }
   
    //angular keyup method in the neualDisplay html
    sessionIdInput(event)
    {
      
      this.sessionsIdTextChanged.next(event.target.value);
    }

    //angular keyup method in the neualDisplay html
    sessionsFileLocationInput(event)
    {
      
      this.sessionsFilesLocationTextChanged.next(event.target.value);
    }
    
}

