import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'product-edit/:id',
    component: ProductEditorComponent
  },
  {
    path: 'product-add',
    component: ProductAddComponent
  },
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent
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
