import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

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
