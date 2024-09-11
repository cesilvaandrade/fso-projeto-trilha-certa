import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss']
})
export class TrilhaComponent implements OnInit {

  enegreSerVagas = 5; // Replace with actual data
  dinheiroVagas = 3; // Replace with actual data
  admiravelVagas = 4; // Replace with actual data
  agroecologiaVagas = 0; // Replace with actual data

  constructor() { }

  ngOnInit(): void {
  }

}
