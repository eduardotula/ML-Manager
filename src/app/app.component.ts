import { Component, OnInit } from '@angular/core';
import { MlServiceService } from './services/ml-service.service';
import { Produto } from './services/models/Produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private service: MlServiceService){

  }
  title = 'ML-Manager-Front';

  users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Doe', age: 22 }
  ];

  ngOnInit(): void {
    this.service.getProdutoByMlId("MLB1607818285").subscribe(prod => {
      console.log(prod);
    });
  }
}
