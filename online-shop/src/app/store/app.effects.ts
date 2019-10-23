import { ProductEffects } from '../modules/products/store/product.effects';
import { AuthEffects } from '../modules/auth/store/auth.effects';
import { ShoppingCartEffects } from '../modules/shopping-cart/store/shopping-cart.effects';

export const appEffects: any[] = [AuthEffects, ProductEffects, ShoppingCartEffects];
