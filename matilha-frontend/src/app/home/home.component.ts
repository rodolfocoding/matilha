import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  badgeNumber: string;

  constructor() {}

  ngOnInit(): void {}

  registrarMarcacao(): void {
    console.log(this.badgeNumber);
  }
}
