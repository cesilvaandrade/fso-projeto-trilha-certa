import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {

  matutinoVagas = 5; // Replace with actual data
  vespertinoVagas = 0

  constructor() { }

  ngOnInit(): void {
  }

}
