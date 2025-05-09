import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [], // Eliminar AppComponent de las declaraciones
  imports: [BrowserModule, HttpClientModule, AppComponent]
})
export class AppModule {}