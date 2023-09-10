<template>
 <div id="app">
  <ProductDisplay v-if="shouldRenderProductDisplay" :nextProduct="nextProduct" :currentProduct="currentProduct" />
  <ProductUnavailable v-else :nextProduct="nextProduct" />
 </div>
</template>

<script>
import ProductUnavailable from './components/ProductUnavailable.vue';
import ProductDisplay from './components/ProductDisplay.vue';
export default {
 name: 'App',
 components: {
  ProductUnavailable,
  ProductDisplay,
 },
 data() {
  return {
   products: [],
   currentIndex: 0,
  };
 },
 computed: {
  currentProduct() {
   return this.products[this.currentIndex];
  },
  shouldRenderProductDisplay() {
   return this.currentProduct && (this.currentProduct.category === "men's clothing" || this.currentProduct.category === "women's clothing");
  },
 },
 methods: {
  nextProduct() {
   if (this.currentIndex < this.products.length - 1) {
    this.currentIndex += 1;
   } else {
    // Kembali ke produk pertama jika sudah mencapai yang terakhir
    this.currentIndex = 0;
   }
  },
 },
 mounted() {
  // Lakukan permintaan HTTP untuk mengambil data produk
  fetch('https://fakestoreapi.com/products')
   .then((response) => response.json())
   .then((data) => {
    const dataProduct = data.filter((product) => product.category === "men's clothing" || product.category === "women's clothing");
    this.products = dataProduct;
   })
   .catch((error) => {
    console.error('Terjadi kesalahan dalam mengambil data produk:', error);
   });
 },
};
</script>

<style>
@import './assets/styles/page.css';
@import './assets/styles/page-unavailable.css';
</style>
