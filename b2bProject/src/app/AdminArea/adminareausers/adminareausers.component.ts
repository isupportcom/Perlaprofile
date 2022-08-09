import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminareausers',
  templateUrl: './adminareausers.component.html',
  styleUrls: ['./adminareausers.component.css']
})
export class AdminareausersComponent implements OnInit {
  public users =[
      {
        name:'Kostakis',

        Role:'Fidi'
      },
    {
      name:'Nektarios',
      Role:'FIDAROS'
    },
    {
      name:'Alex',
      Role:'Giteutis Fidion'
    }

    ]
  constructor() { }

  ngOnInit(): void {
  }

}
