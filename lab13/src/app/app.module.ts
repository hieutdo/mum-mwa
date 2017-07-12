import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { DbService } from './db.service';

const MY_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(MY_ROUTES)
  ],
  providers: [
    DbService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
