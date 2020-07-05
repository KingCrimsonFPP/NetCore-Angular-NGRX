import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeContainerComponent } from './containers/home/home-container.component';
import { WeatherContainerComponent } from './containers/weather/weather-container.component';
import { RootStoreModule } from './root-store/root-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { CounterContainerComponent } from './containers/counter/counter-container.component';
import { BoardComponent } from './components/board/board.component';
import { NotesContainerComponent } from './containers/notes/notes-container.component';
import { NoteComponent } from './components/note/note.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeContainerComponent,
    CounterContainerComponent,
    NoteComponent,
    NotesContainerComponent,
    BoardComponent,
    WeatherContainerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeContainerComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterContainerComponent },
      { path: 'notes', component: NotesContainerComponent },
      { path: 'weather', component: WeatherContainerComponent },
    ]),
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      name: 'Instruments Devtools',
      maxAge:25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
