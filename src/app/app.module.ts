// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceryService } from './services/grocery.service';
import { GroceryComponent } from './grocery/grocery.component';
import { HeaderComponent } from './header/header.component';
import { ModalsComponent } from './modals/modals.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GroceryComponent,
    HeaderComponent,
    ModalsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,
  ReactiveFormsModule,HttpClientModule,RouterModule],
  providers: [GroceryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
