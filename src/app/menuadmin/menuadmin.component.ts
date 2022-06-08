import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickusr():void{
    this.router.navigate(['/registro']);
  }

  onClickfac():void{
    this.router.navigate(['/facuadmin']);
  }

  onClickprog():void{
    this.router.navigate(['/progradmin']);
  }

}
