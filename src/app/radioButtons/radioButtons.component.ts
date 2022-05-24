import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionsService } from '../shared/options.service';

export interface RadioButton {
  text: string;
  value: string;
}

@Component({
  selector: 'app-radioButtons',
  templateUrl: './radioButtons.component.html',
  styleUrls: ['./radioButtons.component.css'],
})
export class RadioButtonsComponent implements OnInit {
  @Input() buttons: RadioButton[] = [];
  @Input() groupName: string = '';

  @Output() onRadioValueChange = new EventEmitter();

  onRadioClick(value: string) {
    this.onRadioValueChange.emit(value);
    // console.log(this.optionsService.options.blightType)
  }

  ngOnInit(): void {}
  
  constructor(public optionsService: OptionsService) {}
}
