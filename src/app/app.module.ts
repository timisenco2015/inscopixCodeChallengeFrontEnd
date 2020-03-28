import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FileUploadComponent} from "../app/component/fileUploadComponent/fileUpload.component";
import {NeuralDisplayComponent} from "./component/neuralDataDisplayComponent/nerualDataDisplayDisplay.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../app.config';
import { MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatButtonModule,
  MatSnackBarModule,  
  MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TimeSeriesNeuronService} from "../../src/app/service/timeSeriesNeuronService";
import {ApiService} from "../../src/app/service/apiService";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    NeuralDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,  
    AppRoutingModule,    
    MatToolbarModule,
    MatSnackBarModule,
    FormsModule,
    NgxSpinnerModule,
    MatIconModule,  
    MatButtonModule,
    HttpClientModule, 
    MatCardModule,  
    MatProgressBarModule, BrowserAnimationsModule 
  ],
  providers: [ { provide: APP_CONFIG, useValue: AppConfig },TimeSeriesNeuronService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
