import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-minMax',
  templateUrl: './minMax.component.html',
  styleUrls: ['./minMax.component.css'],
})
export class MinMaxComponent {
  @Input() title: string = '';
  @Input() min: any;
  @Input() max: any;

  @Output() onMinChange = new EventEmitter();
  @Output() onMaxChange = new EventEmitter();

  onInputMin() {
    this.min = parseFloat((this.min as string).replace(/[^\d.]/g, ''));
    if (typeof this.min !== 'number' || isNaN(this.min)) this.min = null;
    this.onMinChange.emit(this.min);
  }

  onInputMax() {
    this.max = parseFloat((this.max as string).replace(/[^\d.]/g, ''));
    if (typeof this.max !== 'number' || isNaN(this.max)) this.max = null;
    this.onMaxChange.emit(this.max);
  }

  constructor(public optionsService: OptionsService) {}
}
