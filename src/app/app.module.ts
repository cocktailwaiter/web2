import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CocktailDetailComponent }  from './cocktail-detail/cocktail-detail.component';
import { CocktailsComponent }      from './cocktails/cocktails.component';
import { CocktailSearchComponent }  from './cocktail-search/cocktail-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CocktailsComponent,
    CocktailDetailComponent,
    MessagesComponent,
    CocktailSearchComponent,
    HeaderComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
