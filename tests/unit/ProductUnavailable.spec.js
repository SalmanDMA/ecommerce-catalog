import { mount } from '@vue/test-utils';
import ProductUnavailable from '@/components/ProductUnavailable.vue';

describe('ProductUnavailable.vue', () => {
 it('should render the component with the correct data', () => {
  const nextProduct = jest.fn();
  const wrapper = mount(ProductUnavailable, {
   propsData: {
    nextProduct,
   },
  });

  // Memastikan gambar triggereed dengan benar
  expect(wrapper.find('.card__image-unavailable').attributes('src')).toBe(wrapper.vm.sadFace);

  // Memeriksa pesan yang ditampilkan dengan benar
  expect(wrapper.find('.card__title-unavailable').text()).toBe('This product is unavailable to show');

  // Memeriksa tombol "Next Product" dengan benar
  const button = wrapper.find('.card__btn-unavailable');
  expect(button.exists()).toBe(true);

  // Memeriksa bahwa metode handleNextProduct dipanggil saat tombol diklik
  button.trigger('click');
  expect(nextProduct).toHaveBeenCalled();
 });
});
