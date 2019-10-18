import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add/product-add.component';
import { LoginComponent } from './login/login.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
    ProductEditorComponent,
    ProductAddComponent,
    LoginComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
      // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
