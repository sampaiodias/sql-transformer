import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TransformConfigComponent } from './transform-config/transform-config.component';
import { TransformOutputComponent } from './transform-output/transform-output.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    TransformConfigComponent,
    TransformOutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
