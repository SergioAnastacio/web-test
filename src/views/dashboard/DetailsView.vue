<template>
  <main>
    <ProductEditComponent v-if="productId !== null" :productId="productId" />
  </main>
</template>

<script setup lang="ts">
import ProductEditComponent from "@/components/dashboard/ProductEditComponent.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = ref<number | null>(null);

onMounted(() => {
	const id = Number(route.params.id);
	if (!isNaN(id)) {
		productId.value = id;
	}
});
</script>