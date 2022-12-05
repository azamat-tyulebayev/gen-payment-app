import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { GeneratorComponent } from './generator/generator.component';
import { BaseComponent } from './base/base.component';
import { LiveCodeComponent } from './Shared/live-code/live-code.component';
import { InputFieldComponent } from './Shared/input-field/input-field.component';
import { ButtonComponent } from './Shared/button/button.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    GeneratorComponent,
    BaseComponent,
    LiveCodeComponent,
    InputFieldComponent,
    ButtonComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
