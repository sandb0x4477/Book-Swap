import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookListComponent } from './books/book-list/book-list.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberBooksComponent } from './members/member-books/member-books.component';
import { BookLatestComponent } from './books/book-latest/book-latest.component';
import { MemberTradeComponent } from './members/member-trade/member-trade.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'members', component: MemberListComponent},
  { path: 'members/:id', component: MemberBooksComponent},
  { path: 'booklatest', component: BookLatestComponent},
  { path: 'trades', component: MemberTradeComponent},
  { path: 'booklist', component: BookListComponent},
  { path: 'bookadd', component: BookAddComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [
   ]
})
export class AppRoutingModule { }
