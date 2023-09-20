import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    AppRoutingModule
  ]
})
export class NavbarModule { }
