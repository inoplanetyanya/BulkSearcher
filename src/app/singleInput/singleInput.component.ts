import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-singleInput',
  templateUrl: './singleInput.component.html',
  styleUrls: ['./singleInput.component.css'],
})
export class SingleInputComponent implements OnInit {
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() inputValue: any;

  @Output() onInputChange = new EventEmitter();

  onInput() {
    if (this.inputValue !== null) this.inputValue = parseFloat(this.inputValue);
    this.onInputChange.emit(this.inputValue)
  }

  ngOnInit(): void {}

  constructor() {}
}
