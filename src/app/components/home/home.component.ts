import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private route : ActivatedRoute){}
  name : any;
  ngOnInit() : void{
    this.route.paramMap.subscribe((p:ParamMap)=>{
      // console.log(p.get('name'l));
      this.name = p.get('name');
    })
  }
  toChat(){
    window.location.href = "http://127.0.0.1:8000/qa";
  }
}
