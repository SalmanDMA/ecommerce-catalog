import { mount } from '@vue/test-utils';
import ProductDisplay from '@/components/ProductDisplay.vue';

describe('ProductDisplay', () => {
 // Data produk contoh
 const products = [
  {
   title: 'Product 1',
   category: "men's clothing",
   rating: { rate: 4.5 },
   description: 'Description for Product 1',
   price: 19.99,
  },
  {
   title: 'Product 2',
   category: "women's clothing",
   rating: { rate: 3.8 },
   description: 'Description for Product 2',
   price: 24.99,
  },
 ];

 let wrapper;
 const currentProduct = products[0];
 const nextProduct = jest.fn();

 beforeEach(() => {
  wrapper = mount(ProductDisplay, {
   propsData: {
    products,
    currentProduct,
    nextProduct,
   },
  });
 });

 // Pengujian pertama: Memastikan komponen merender data dengan benar
 it('should render the component with the correct data', () => {
  expect(wrapper.find('.card__title').text()).toBe(currentProduct.title);
  expect(wrapper.find('.card__category').text()).toBe(currentProduct.category);
  expect(wrapper.find('.card__rating').text()).toBe(`Rating: ${currentProduct.rating.rate}`);
  expect(wrapper.find('.card__description').text()).toBe(currentProduct.description);
  expect(wrapper.find('.card__price').text()).toBe(`$${currentProduct.price}`);

  const button = wrapper.find('.card__btn:last-child');
  button.trigger('click');
  expect(nextProduct).toHaveBeenCalled();
 });

 // Pengujian kedua: Memastikan kelas CSS yang benar diterapkan untuk kategori 'men's clothing'
 it("should apply correct CSS classes based on category (men's clothing)", () => {
  expect(wrapper.classes()).toContain('blue-background');
  expect(wrapper.find('.card__title').classes()).toContain('man-title');
 });

 // Pengujian ketiga: Memastikan kelas CSS yang benar diterapkan untuk kategori 'women's clothing'
 it("should apply correct CSS classes based on category (women's clothing)", () => {
  const currentProduct = products[1];
  const nextProduct = jest.fn();

  const wrapper = mount(ProductDisplay, {
   propsData: {
    products,
    currentProduct,
    nextProduct,
   },
  });

  expect(wrapper.classes()).toContain('pink-background');
  expect(wrapper.find('.card__title').classes()).toContain('woman-title');
 });

 // Pengujian keempat: Memastikan tidak ada kelas CSS yang diterapkan jika kategori tidak sesuai
 it('should apply correct CSS classes based on category (default)', () => {
  const currentProduct = {
   title: 'Product 3',
   category: 'other',
   rating: { rate: 3.0 },
   description: 'Description for Product 3',
   price: 12.99,
  };
  const nextProduct = jest.fn();

  const wrapper = mount(ProductDisplay, {
   propsData: {
    products,
    currentProduct,
    nextProduct,
   },
  });

  expect(wrapper.classes()).not.toContain('blue-background');
  expect(wrapper.classes()).not.toContain('pink-background');
  expect(wrapper.find('.card__title').classes()).not.toContain('man-title');
  expect(wrapper.find('.card__title').classes()).not.toContain('woman-title');
 });

 // Pengujian kelima: Memastikan metode getMainClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getMainClass method', () => {
  expect(wrapper.vm.getMainClass("men's clothing")).toBe('blue-background');
  expect(wrapper.vm.getMainClass("women's clothing")).toBe('pink-background');
  expect(wrapper.vm.getMainClass('other')).toBe('');
 });

 // Pengujian keenam: Memastikan metode getTitleClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getTitleClass method', () => {
  expect(wrapper.vm.getTitleClass("men's clothing")).toBe('man-title');
  expect(wrapper.vm.getTitleClass("women's clothing")).toBe('woman-title');
  expect(wrapper.vm.getTitleClass('other')).toBe('');
 });

 // Pengujian ketujuh: Memastikan metode getStarClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getStarClass method', () => {
  // Kategori 'men's clothing', rating 4.5 (harusnya full stars)
  expect(wrapper.vm.getStarClass(1, "men's clothing", 4.5)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(2, "men's clothing", 4.5)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(3, "men's clothing", 4.5)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(4, "men's clothing", 4.5)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(5, "men's clothing", 4.5)).toBe('man_filled');
  // Kategori 'men's clothing', rating 3.2 (3 full stars dan 1 half star)
  expect(wrapper.vm.getStarClass(1, "men's clothing", 3.2)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(2, "men's clothing", 3.2)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(3, "men's clothing", 3.2)).toBe('man_filled');
  expect(wrapper.vm.getStarClass(4, "men's clothing", 3.2)).toBe('man-start');
  expect(wrapper.vm.getStarClass(5, "men's clothing", 3.2)).toBe('man-start');
  // Lanjutkan dengan pengujian lain sesuai kebutuhan
 });

 // Pengujian Kedelapan: Memastikan metode getPriceClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getPriceClass method', () => {
  // Kategori 'men's clothing' (harusnya man-price)
  expect(wrapper.vm.getPriceClass("men's clothing")).toBe('man-price');
  // Kategori 'women's clothing' (harusnya woman-price)
  expect(wrapper.vm.getPriceClass("women's clothing")).toBe('woman-price');
  // Kategori lain (harusnya kosong)
  expect(wrapper.vm.getPriceClass('other')).toBe('');
 });

 // Pengujian Kesembilan: Memastikan metode getBuyClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getBuyClass method', () => {
  // Kategori 'men's clothing' (harusnya man-btn)
  expect(wrapper.vm.getBuyClass("men's clothing")).toBe('man-btn');
  // Kategori 'women's clothing' (harusnya woman-btn)
  expect(wrapper.vm.getBuyClass("women's clothing")).toBe('woman-btn');
  // Kategori lain (harusnya kosong)
  expect(wrapper.vm.getBuyClass('other')).toBe('');
 });

 // Pengujian Kesepuluh: Memastikan metode getNextClass mengembalikan kelas CSS yang benar
 it('should return the correct CSS class from getNextClass method', () => {
  // Kategori 'men's clothing' (harusnya man-button-next)
  expect(wrapper.vm.getNextClass("men's clothing")).toBe('man-button-next');
  // Kategori 'women's clothing' (harusnya woman-button-next)
  expect(wrapper.vm.getNextClass("women's clothing")).toBe('woman-button-next');
  // Kategori lain (harusnya kosong)
  expect(wrapper.vm.getNextClass('other')).toBe('');
 });
});
