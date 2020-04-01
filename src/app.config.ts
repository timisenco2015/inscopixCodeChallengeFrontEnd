import { InjectionToken } from '@angular/core';

export interface AppConfigInterface {
  GETNEURON_ENDPOINT: string;
 
}

export const APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: AppConfigInterface = {
  //GETNEURON_ENDPOINT: 'http://localhost:8080/',
  GETNEURON_ENDPOINT: 'http://15.223.94.187/',
  //GETCELEBRITY_ENDPOINT: 'http://localhost:8080/api/' //for testing purpose
    
  
};