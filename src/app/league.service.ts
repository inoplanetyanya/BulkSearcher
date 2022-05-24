import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private _leagues: string[] = [];
  private _selectedLeague: string = '';

  public get leagues(): string[] {
    return this._leagues;
  }

  public get selectedLeague(): string {
    return this._selectedLeague;
  }

  public set selectedLeague(value: string) {
    this._selectedLeague = value;
  }

  public async fetchLeagues() {
    this._leagues = [];

    const response = await fetch(
      'https://api.pathofexile.com/leagues?type=main&realm=pc',
      {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
        },
      }
    );
    let res = await response.json();
    // console.log(res);
    let tmp: any[] = [];
    res.map(function (el: any) {
      if (!el.id.includes('SSF') && !el.id.includes('(')) tmp.push(el.id);
    });
    // console.log(tmp)
    if (tmp) {
      this._leagues.push(tmp[2]);
      this._leagues.push(tmp[3]);
      this._leagues.push(tmp[0]);
      this._leagues.push(tmp[1]);
    }
    if (this.selectedLeague === '') {
      this.selectedLeague = this.leagues[0];
    }
    // console.log(this.leagues);
    // console.log(this.selectedLeague);
  }

  constructor() {}
}
