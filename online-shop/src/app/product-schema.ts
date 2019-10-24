import { schema } from 'normalizr';

const productSchema = new schema.Entity('products');
const subcategories = new schema.Array(productSchema);

productSchema.define({subcategories});
