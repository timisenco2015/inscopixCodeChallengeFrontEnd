import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'inscopixCodeChallengeFrontEnd';
  isSelectionA=false;

  isSelectionB=false;

  isSelectionC=false;

  constructor()
  {

  }

  sectionAClick()
  {
    this.isSelectionA=true;

    this.isSelectionB=false;

    this.isSelectionC=false;
    
  }

  sectionBClick()
  {
    this.isSelectionA=false;

    this.isSelectionB=true;

    this.isSelectionC=false;
  }

  sectionCClick()
  {
    this.isSelectionA=false;
    
    this.isSelectionB=false;

    this.isSelectionC=true;
  }
}
