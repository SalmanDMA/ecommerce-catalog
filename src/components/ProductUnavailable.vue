<template>
 <main class="main__unavailable">
  <section class="card__unavailable">
   <img :src="sadFace" alt="Sad Face" class="card__image-unavailable" />
   <p class="card__title-unavailable">This product is unavailable to show</p>
   <button type="button" class="card__btn-unavailable" @click="handleNextProduct">Next Product</button>
  </section>
 </main>
</template>

<script>
import sadFace from '../assets/sad-face.png';
export default {
 data() {
  return {
   sadFace,
  };
 },
 props: {
  nextProduct: {
   type: Function,
   required: true,
  },
 },
 methods: {
  handleNextProduct() {
   this.nextProduct();
  },
 },
};
</script>

<style></style>
