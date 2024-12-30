<template>
  
  <div class="table-responsive">

    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
            <tbody>
        <tr v-if="useproductstore.loading">
          <td colspan="6" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
        <tr v-if="!useproductstore.loading" v-for="product in useproductstore.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <img :src="product.images[0].url.url" alt="product.name" class="img-fluid" style="max-width: 50px" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price.amount,product.price.currency) }}</td>
          <td>{{ product.qty }}</td>
          <td>
            <button @click="$emit('editProduct', product)" class="btn btn-sm btn-outline-primary me-2">Editar</button>
          </td>
        </tr>
        

        <tr v-if="useproductstore.endPage">
          <td colspan="6" class="text-center">
            <div class="alert alert-warning" role="alert">
              No hay más productos
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :currentPage="currentPage" :endPage="useproductstore.endPage"  @goToPrevious="goToPrevious" @goToNext="goToNext" />  

  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/useProductStore";
import { ref, onMounted, computed } from "vue";
import { defineProps } from "vue";
import PaginationComponent from "./PaginationComponent.vue";
import { watch } from "vue";

const useproductstore = useProductStore();
const itemsPerPage = ref<number>(5);
const currentPage = ref<number>(2);

const fetchProducts = async () => {
	await useproductstore.fetchProducts(itemsPerPage.value, currentPage.value);
};

const goToPrevious = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const goToNext = () => {
	if (!useproductstore.error) {
		currentPage.value++;
	}
};

onMounted(async () => {
	await fetchProducts();
});

watch([currentPage, itemsPerPage], async () => {
	await fetchProducts();
});
const finalpage = useproductstore.products.length / 5;
const formatCurrency = (value: number, contry: string) => {
	return new Intl.NumberFormat(contry, {
		style: "currency",
		currency: contry,
	}).format(value);
};

defineEmits(["editProduct"]);
</script>