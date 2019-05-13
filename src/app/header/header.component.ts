import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'COCKTAIL WAITER';

  constructor(
    private route: AppRoutingModule
  ) { }

  ngOnInit() {
  }

}
