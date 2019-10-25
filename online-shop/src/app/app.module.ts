import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ProductEditorComponent } from './modules/products/product-editor/product-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './modules/products/product-add/product-add.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { LoadingSpinnerComponent } from './shared/component/loading-spinner/loading-spinner.component';
import { EffectsModule } from '@ngrx/effects';
import { appEffects } from './store/app.effects';
import * as fromApp from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

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
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(appEffects),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [
      // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
