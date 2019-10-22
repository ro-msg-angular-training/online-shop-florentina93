import { ProductEffects } from '../modules/products/store/product.effects';
import { AuthEffects } from '../modules/auth/store/auth.effects';

export const appEffects: any[] = [AuthEffects, ProductEffects];
