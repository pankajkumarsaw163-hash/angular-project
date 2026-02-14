import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerListComponent } from './customer-list.component';
import { ToastComponent } from './toast.component';

@NgModule({
  declarations: [AppComponent, CustomerFormComponent, CustomerListComponent, ToastComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
