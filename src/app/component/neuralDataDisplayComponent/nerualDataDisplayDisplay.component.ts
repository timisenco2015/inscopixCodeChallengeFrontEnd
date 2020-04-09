import { Component  } from '@angular/core';
import { Subject } from 'rxjs';  
import {TimeSeriesNeuronService} from "../../service/timeSeriesNeuronService"
import {debounceTime} from 'rxjs/operators';
import { isValid,format,addDays } from 'date-fns'
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'neural_display',
  templateUrl: './nerualDataDisplay.html',
  styleUrls: ['./neuralDataDisplay.css']
})
export class NeuralDisplayComponent 
{
  experimentEndDate:string;
  experimentStartDate:string;
  experimenterName:string;
  cellsList:[];
  firstTwoCellsNeuralDataList:[];
  boutMomentDetailsList:[];
  sessionList:[];
  neuralDataSesssionId:any="";
  boutMovementSessionId:any="";
  _timeSeriesNeuronService:TimeSeriesNeuronService;
  neuralDataTextChanged: Subject<string> = new Subject<string>();
  boutMovementTextChanged: Subject<string> = new Subject<string>();
  isExperimentStartDateError=false;
  isExperimentEndDateError=false;
  isExperimenterNameError=false;
  _spinner: NgxSpinnerService;
 

  constructor(timeSeriesNeuronService:TimeSeriesNeuronService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar)
  {
    this._timeSeriesNeuronService =timeSeriesNeuronService;
    this._spinner = spinner;
  }

  ngOnInit() 
  {
      
    this.boutMovementTextChanged.pipe(debounceTime(4000)).subscribe(response=>
    {

      if(response=="")
      {
        this.boutMovementSessionId = "";

        this.boutMomentDetailsList=[];
      }
      else
      {
       // if(Number.isInteger(Number(response)))
       // {
         this.getBoutMovement(response);
       // }
      }  
      
    });
   
       
    this.neuralDataTextChanged.pipe(debounceTime(4000)).subscribe(response=>
    {

      if(response=="")
      {
        this.neuralDataSesssionId = "";

        this.firstTwoCellsNeuralDataList=[];
      }
      else
      {
        this.getNeutralDataFirstTwoRows(response); 
      }
    });
  }

  // get session data from database and populate to session table on the interface
  getSessionData()
  {
    this.isExperimentEndDateError=false;

    this.isExperimentStartDateError=false;

    this.isExperimenterNameError=false;

    this.sessionList=[];
      
    if(!isValid(new Date(this.experimentEndDate)))
    {
      this.isExperimentEndDateError=true;
    }
    else
    {
      this.isExperimentEndDateError=false;
    }


    try
    {
      this.experimentEndDate=format(addDays(new Date(this.experimentEndDate), 1),'yyyy-MM-dd');
    }
    catch(error)
    {
      this.isExperimentEndDateError=true;
    }

    if(!isValid(new Date(this.experimentStartDate)))
    {
      this.isExperimentStartDateError=true;
    }

    try
    {
      this.experimentStartDate=format(addDays(new Date(this.experimentStartDate), 1),'yyyy-MM-dd');
    }
    catch(error)
    {
      this.isExperimentStartDateError=true;
    }
      
    if(!this.validateExperimentalName(this.experimenterName))
    {
      this.isExperimenterNameError=true
    }

    if(!this.isExperimentEndDateError && !this.isExperimentStartDateError && !this.isExperimenterNameError)
    {
      this._timeSeriesNeuronService.getSessionFullDetails({"startDate":this.experimentStartDate,"endDate":this.experimentEndDate,"experimenterName":this.experimenterName})
      .subscribe(response => 
      {
        
        this.spinner.hide(); 

        this.sessionList=response["object"];
        
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
    }
  }

    
  neuralDataInput(event)
  {
    this.neuralDataTextChanged.next(event.target.value);
  }

  boutMovementSessionIdInput(event)
  {
    this.boutMovementTextChanged.next(event.target.value);
  }

  // get NeutralDataFirstTwoRows from database and populate to session table on the interface
  getNeutralDataFirstTwoRows(sessionId:string)
  {
    this.spinner.show(); 
    this._timeSeriesNeuronService.getFirstTwoCellsNeuralData({"sessionId":sessionId})
    .subscribe(response => 
    { 
     
        this.firstTwoCellsNeuralDataList=response["object"];
        
        this.spinner.hide(); 
      
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
  }


  // get Bout Movement from database and populate to session table on the interface
  getBoutMovement(sessionId:string)
  {
    this.spinner.show();

    this._timeSeriesNeuronService.getBoutMomentDetails({"sessionId":sessionId})
    .subscribe(response => 
    {
      this.spinner.hide();
      
      this.boutMomentDetailsList=response["object"];

    },error => 
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
  }

  validateExperimentalName(value:string) 
  {
    if(value==null)
    {
      return false;
    }
    else
    {
      for(let i=0; i<value.length; i++) 
      {    
        if(!(value.charCodeAt(0)>=97 && value.charCodeAt(0)<=122) &&
        !(value.charCodeAt(0)>=65 && value.charCodeAt(0)<=90) && (value.charCodeAt(0)!=32))
        {
          return false;
        }
      }
    }
    return true;
  }
}
