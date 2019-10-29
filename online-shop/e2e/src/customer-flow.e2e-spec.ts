import { LoginPage } from './login/login.po';
import { AppPage } from './app/app.po';
import { ProductListPage } from './product-list/product-list.po';
import { ProductDetailPage } from './product-detail/product-detail.po';

describe('user doej from login to product details', () => {
  let appPage: AppPage;
  let loginPage: LoginPage;
  let productListPage: ProductListPage;
  let productDetailPage: ProductDetailPage;

  beforeEach(() => {
    appPage = new AppPage();
    loginPage = new LoginPage();
    productListPage = new ProductListPage();
    productDetailPage = new ProductDetailPage();
  });

  it('user should be redirected to the login screen', () => {
    appPage.navigateTo();
    expect(appPage.getTitleText()).toEqual('Online-Shop');
  });

  it('when login is successful  user should redirect to the product list page', () => {
    appPage.navigateTo();
    expect(loginPage.getPageTitleText()).toEqual('SIGN IN');
    loginPage.navigateTo();
    loginPage.fillCredentials();
    expect(productListPage.getPageHeadingText()).toEqual('Products');
  });

  it('product list should display a list of products', () => {
    appPage.navigateTo();
    loginPage.fillCredentials();
    expect(productListPage.getProductListElements().count()).toBe(51);
  });

  it('product detail should display the first product', () => {
    appPage.navigateTo();
    loginPage.fillCredentials();
    productListPage.getProductDetails().click();
    expect(productListPage.getFirstProductElement()).toBeTruthy();
    expect(productListPage.getProductDetails()).toBeTruthy();
    expect(productDetailPage.getPageHeadingText()).toBe('Product: Notebook Basic 15');
  });

});
