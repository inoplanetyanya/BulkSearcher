import { Component, Input, OnInit } from '@angular/core';
import { OptionsService } from '../shared/options.service';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-search-button',
  templateUrl: './searchButton.component.html',
  styleUrls: ['./searchButton.component.css'],
})
export class ButtonComponent implements OnInit {
  onButtonClick() {
    this.requestService.search();
  }

  @Input() text: string = '';

  ngOnInit(): void {}

  constructor(
    public optionsService: OptionsService,
    public requestService: RequestService
  ) {}
}
