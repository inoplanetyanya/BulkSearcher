import { Component } from '@angular/core';
import { RadioButton } from './radioButtons/radioButtons.component';
import { RequestService } from './shared/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Blight-bulk-searcher';
  
  constructor(public requestService: RequestService) {}
}
