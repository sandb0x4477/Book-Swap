import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './_pipes/truncate.pipe';
import { BookCardComponent } from './books/book-card/book-card.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { GoggleSearchService } from './_services/goggle-search.service';
import { HomeComponent } from './home/home.component';
import { AuthorsPipe } from './_pipes/authors.pipe';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TruncatePipe,
    AuthorsPipe,
    BookCardComponent,
    BookListComponent,
    BookAddComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GoggleSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
