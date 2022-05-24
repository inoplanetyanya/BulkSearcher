import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-inputsGroup',
  templateUrl: './inputsGroup.component.html',
  styleUrls: ['./inputsGroup.component.css'],
})
export class InputsGroupComponent implements OnInit {

  @Input() inputGroup: any;

  @Output() onInputValueChange: EventEmitter<string>[] | any;

  onInput(value: any, index: number) {
    this.onInputValueChange[index].emit(value);
  }

  ngOnInit(): void {

    for (let i = 0; i < this.inputGroup.placeholders.length; i++) {
      this.onInputValueChange.push(new EventEmitter());
    }
  }

  constructor(public optionsService: OptionsService) {}
}
