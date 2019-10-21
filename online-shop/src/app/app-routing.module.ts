import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ProductEditorComponent } from './modules/products/product-editor/product-editor.component';
import { ProductAddComponent } from './modules/products/product-add/product-add.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guard/auth/auth.guard';

const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-edit/:id',
    component: ProductEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
