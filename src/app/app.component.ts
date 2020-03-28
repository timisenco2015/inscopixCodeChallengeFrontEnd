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
  constructor()
  {

  }

  sectionAClick()
  {
    this.isSelectionA=true;
    this.isSelectionB=false;
    console.log("--->");
  }

  sectionBClick()
  {
    this.isSelectionA=false;
    this.isSelectionB=true;
  }
}
