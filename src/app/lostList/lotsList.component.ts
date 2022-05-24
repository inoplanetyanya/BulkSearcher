import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';

export interface InputsGroup {
  title: string;
  placeholders: string[];
}

@Component({
  selector: 'app-lostList',
  templateUrl: './lostList.component.html',
  styleUrls: ['./lostList.component.css'],
})
export class LotsListComponent implements OnInit {
  ngOnInit(): void {}

  constructor(public requestService: RequestService) {}
}
