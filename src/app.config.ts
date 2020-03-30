import { InjectionToken } from '@angular/core';

export interface AppConfigInterface {
  GETCELEBRITY_ENDPOINT: string;
 
}

export const APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: AppConfigInterface = {
 
   GETCELEBRITY_ENDPOINT: 'http://35.183.29.245/',
  //GETCELEBRITY_ENDPOINT: 'http://localhost:8080/api/' //for testing purpose
    
  
};