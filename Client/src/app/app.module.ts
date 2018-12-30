import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { PaginationModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { GoggleSearchService } from './_services/goggle-search.service';
import { BookService } from './_services/book.service';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './_pipes/truncate.pipe';
import { BookCardComponent } from './books/book-card/book-card.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { HomeComponent } from './home/home.component';
import { AuthorsPipe } from './_pipes/authors.pipe';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { UserService } from './_services/user.service';
import { MemberBooksComponent } from './members/member-books/member-books.component';
import { BookLatestComponent } from './books/book-latest/book-latest.component';
import { MemberTradeComponent } from './members/member-trade/member-trade.component';
import { WebsocketService } from './_services/websocket.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

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
    LoginComponent,
    MemberListComponent,
    MemberBooksComponent,
    BookLatestComponent,
    MemberTradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4001/apibs'],
        blacklistedRoutes: ['localhost:4001/apibs/auth'],
      },
    }),
  ],
  providers: [
    GoggleSearchService,
    BookService,
    UserService,
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider,
    AuthGuard,
    WebsocketService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
