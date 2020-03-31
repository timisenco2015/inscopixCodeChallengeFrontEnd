import { Component,  ViewChild, ElementRef,OnDestroy  } from '@angular/core';
import {TimeSeriesNeuronService} from "../../../app/service/timeSeriesNeuronService"
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import {Subject,} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'file-upload',
  templateUrl: './fileUpload.html',
  styleUrls: ['./fileUpload.css']
})
export class FileUploadComponent 
{
  
    @ViewChild("fileSessionUpload", {static: false}) fileSessionUpload: ElementRef;

    @ViewChild("fileCellSetUpload", {static: false}) fileCellSetUpload: ElementRef;

    @ViewChild("fileGPIOUpload", {static: false}) fileGPIOUpload: ElementRef;

    isSessionIdError=false;

    _spinner: NgxSpinnerService;

    _timeSeriesNeuronService:TimeSeriesNeuronService;

    cellSetfiles  = [];  

    gPIOFiles=[];

    sessionFiles=[];

    uploadType:string;

    sessionIdValue:string;

    errorMessage:any;

    file:any;

    sessionsIdTextChanged: Subject<string> = new Subject<string>();

    constructor(timeSeriesNeuronService:TimeSeriesNeuronService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar)
    {
        this._timeSeriesNeuronService=timeSeriesNeuronService;

        this._spinner = spinner;
        
    }

    ngOnInit() 
    {
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

    
    // this method is used to upload session files
    uploadSessionFiles() 
    {  
        
        this.fileSessionUpload.nativeElement.value = '';

        this.uploadType="Session";

       
    
            this.sessionFiles.forEach(file => 
            {  
                const formData = new FormData(); 

                formData.append('file', file.data);

                formData.append('sessionId', this.sessionIdValue);

                file.inProgress = true;  

                 this.spinner.show();
       
                this._timeSeriesNeuronService.uploadSession(formData).subscribe(response => 
                {
            
                    this.spinner.hide(); 

    
                    this.errorMessage=JSON.stringify(response["object"]) ;
                    
            
                },
                error => 
                {
                    this.spinner.hide(); 

                    
      
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
       
            });  
    }
       
   
    // this method is used to upload gpio files
    uploadGPIOFiles() 
    {  
        this.fileGPIOUpload.nativeElement.value = '';
        
        this.uploadType=="Gpio";

        if (this.sessionIdValue!=null)
        {
            this.gPIOFiles.forEach(file => 
            {  
                const formData = new FormData(); 

                formData.append('file', file.data);

                formData.append('sessionId', this.sessionIdValue);
                file.inProgress = true;  

                 this.spinner.show();
       
                this._timeSeriesNeuronService.uploadGPIOFile(formData).subscribe(response => 
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
        
            }); 
        }
        else
        {
            this.isSessionIdError=true;
        } 
    }

    // this method is used to upload cells files
    uploadCellSetFiles() 
    {  
        this.uploadType=="Cell";

        if (this.sessionIdValue!=null)
        {
            
            this.fileCellSetUpload.nativeElement.value = '';

            this.cellSetfiles.forEach(file => 
            {  
                
                const formData = new FormData(); 

                formData.append('file', file.data);
                formData.append('sessionId', this.sessionIdValue);
                file.inProgress = true;  

                 this.spinner.show();
       
                this._timeSeriesNeuronService.uploadCellSetFile(formData).subscribe(response => 
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
        
            });
        }
        else
        {
            this.isSessionIdError=true;
        }  
    }

    //button click to upload session file
    onSessionFileUploadClick() 
    {  
        const fileUpload = this.fileSessionUpload.nativeElement;
       
        this.isSessionIdError=false;

        
        
        fileUpload.onchange = () => 
        {  
            
            const file = fileUpload.files[0];  
            this.sessionFiles=[];
            this.sessionFiles.push({ data: file, inProgress: false});  
            this.uploadSessionFiles();  
        };  

        fileUpload.click();  
    }


    //button click to upload cell file
    onCellSetFileUploadClick()
    {
        const fileUpload = this.fileCellSetUpload.nativeElement;
        this.isSessionIdError=false;
        fileUpload.onchange = () => 
        {  
   
            const file = fileUpload.files[0]; 
           
            this.cellSetfiles=[]
            this.cellSetfiles.push({ data: file, inProgress: false});  
            this.uploadCellSetFiles();  
        };  

        fileUpload.click(); 
    }

    //button click to upload gpio file
    onGPIOFileUploadClick()
    {
        const fileUpload = this.fileGPIOUpload.nativeElement;
        this.isSessionIdError=false;
        fileUpload.onchange = () => 
        {  
   
            const file = fileUpload.files[0];  
            this.gPIOFiles=[];
            this.gPIOFiles.push({ data: file, inProgress: false});  
            this.uploadGPIOFiles();  
        };  

        fileUpload.click(); 
    }


    sessionIdInput(event)
    {
      
      this.sessionsIdTextChanged.next(event.target.value);
    }
    
}

