import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  email = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.email = this.tokenService.getEmail();
    } else {
      this.isLogged = false;
      this.email = '';
    }
  }

}
