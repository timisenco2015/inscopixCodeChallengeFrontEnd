import { Component,  ViewChild, ElementRef  } from '@angular/core';
import {TimeSeriesNeuronService} from "../../../app/service/timeSeriesNeuronService"
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";

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

    constructor(timeSeriesNeuronService:TimeSeriesNeuronService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar)
    {
        this._timeSeriesNeuronService=timeSeriesNeuronService;

        this._spinner = spinner;
        
    }

   

    

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

                // this.spinner.show();
       
                this._timeSeriesNeuronService.uploadSession(formData).subscribe(response => 
                {
            
                    this.spinner.hide(); 

           
                    if(response["objectType"]=="Error Object")
                    {
                
                        this.errorMessage=response["object"]["Insert Error"];
                    }
                    else
                    {
                        this.errorMessage=JSON.stringify(response["object"]) ;
                    }
            
                },
                error => 
                {
                    this.spinner.hide(); 

                    console.log(error);
      
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

                // this.spinner.show();
       
                this._timeSeriesNeuronService.uploadGPIOFile(formData).subscribe(response => 
                {
            
                    this.spinner.hide(); 

                    
           
                    if(response["objectType"]=="Error Object")
                    {
                
                        this.errorMessage=response["object"]["Insert Error"];
                    }
                    else
                    {
                        this.errorMessage=JSON.stringify(response["object"]) ;
                    }
            
                },
                error => 
                {

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

                    if(response["objectType"]=="Error Object")
                    {
                
                        this.errorMessage=response["object"]["Insert Error"];
                    }
                    else
                    {
                        this.errorMessage=JSON.stringify(response["object"]) ;
                    }
            
                },
                error => 
                {
                    this.spinner.hide(); 

                    console.log(error);
      
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
    
}

