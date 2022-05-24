import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../league.service';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  buttons = [
    { text: 'Blighted', value: 'blighted' },
    { text: 'Ravaged', value: 'uberblighted' },
  ];

  public leagues: any;

  changeLeague(event: Event) {
    this.leagueServise.selectedLeague = (event.target as HTMLSelectElement).value;
  }

  ngOnInit() {
    this.leagueServise.fetchLeagues();
  }

  constructor(public optionsService: OptionsService, public leagueServise: LeagueService) {}
}
