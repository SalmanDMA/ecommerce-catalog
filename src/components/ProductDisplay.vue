<template>
 <main class="main" v-if="currentProduct" :class="getMainClass(currentProduct.category)">
  <!-- Tampilkan data produk di sini -->
  <section class="card">
   <div class="card__image">
    <img :src="currentProduct.image" :alt="currentProduct.title" />
   </div>
   <div class="card__content">
    <h1 class="card__title" :class="getTitleClass(currentProduct.category)">{{ currentProduct.title }}</h1>
    <div class="card__wrapper">
     <p class="card__category">{{ currentProduct.category }}</p>
     <div class="card__ratings">
      <p class="card__rating">Rating: {{ currentProduct.rating.rate }}</p>
      <div class="card__rating-stars">
       <span v-for="star in 5" :key="star" class="card__star" :class="getStarClass(star, currentProduct.category, currentProduct.rating.rate)"></span>
      </div>
     </div>
    </div>
    <div class="card__wrapper-description">
     <p class="card__description">{{ currentProduct.description }}</p>
    </div>

    <div class="card__wrapper-cta">
     <p class="card__price" :class="getPriceClass(currentProduct.category)">${{ currentProduct.price }}</p>
     <div class="card__cta">
      <button class="card__btn button-buy" :class="getBuyClass(currentProduct.category)">Buy Now</button>
      <button class="card__btn" :class="getNextClass(currentProduct.category)" @click="handleNextProduct">Next Product</button>
     </div>
    </div>
   </div>
  </section>
 </main>
</template>

<script>
export default {
 name: 'ProductDisplay',
 props: {
  products: {
   type: Array,
   required: true,
  },
  currentProduct: {
   type: Object,
   required: true,
  },
  nextProduct: {
   type: Function,
   required: true,
  },
 },
 methods: {
  handleNextProduct() {
   this.nextProduct();
  },
  getMainClass(category) {
   if (category === "men's clothing") {
    return 'blue-background';
   } else if (category === "women's clothing") {
    return 'pink-background';
   } else {
    return '';
   }
  },
  getTitleClass(category) {
   if (category === "men's clothing") {
    return 'man-title';
   } else if (category === "women's clothing") {
    return 'woman-title';
   } else {
    return '';
   }
  },
  getStarClass(star, category, rating) {
   let fullStar = null;
   const decimal = String(rating).split('.')[1]; // Mengambil bagian desimal dari rating

   // Menentukan apakah harus menambahkan 0.5 ke rating jika desimal >= 5
   if (decimal >= 5) {
    fullStar = Math.ceil(rating); // Memutuskan ke atas jika desimal >= 5
   } else {
    fullStar = Math.floor(rating); // Memutuskan ke bawah jika desimal < 5
   }

   // Tentukan kelas CSS berdasarkan kategori dan rating
   if (category === "men's clothing") {
    return star <= fullStar ? 'man_filled' : 'man-start';
   } else if (category === "women's clothing") {
    return star <= fullStar ? 'woman_filled ' : 'woman-start';
   } else {
    return '';
   }
  },

  getPriceClass(category) {
   if (category === "men's clothing") {
    return 'man-price';
   } else if (category === "women's clothing") {
    return 'woman-price';
   } else {
    return '';
   }
  },
  getBuyClass(category) {
   if (category === "men's clothing") {
    return 'man-btn';
   } else if (category === "women's clothing") {
    return 'woman-btn';
   } else {
    return '';
   }
  },
  getNextClass(category) {
   if (category === "men's clothing") {
    return 'man-button-next';
   } else if (category === "women's clothing") {
    return 'woman-button-next';
   } else {
    return '';
   }
  },
 },
};
</script>

<style scoped></style>
