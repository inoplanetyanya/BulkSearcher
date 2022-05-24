import { Injectable, OnInit } from '@angular/core';

export interface Options {
  tierMin: number | null;
  tierMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  stockMin: number | null;
  blightType: string;
}

@Injectable({ providedIn: 'root' })
export class OptionsService implements OnInit {
  public options: Options = {
    blightType: 'blighted',
    tierMin: null,
    tierMax: null,
    priceMin: null,
    priceMax: null,
    stockMin: null,
  };

  ngOnInit(): void {}

  constructor() {}
}
