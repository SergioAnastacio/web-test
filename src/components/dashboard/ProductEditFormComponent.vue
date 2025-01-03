<template>
  <div>
    <FormKit
      type="form"
      id="productEditForm"
      enctype="multipart/form-data"
      :actions="false"
      @submit="submitProduct"
    >
      <FormKit
        type="text"
        name="name"
        label="Nombre del Producto"
        validation="required"
        v-model="currentProduct.name"
        :classes="{
          outer: 'mb-4 outer',
          label: 'form-label label',
          input: 'form-control form-control-lg input',
          help: 'form-text text-muted help',
          messages: 'messages',
          message: 'text-danger message'
        }"
      />
      <FormKit
        type="number"
        name="price"
        label="Precio"
        validation="required|number|min:0"
        v-model="priceString"
        :classes="{
          outer: 'mb-4 outer',
          label: 'form-label label',
          input: 'form-control form-control-lg input',
          help: 'form-text text-muted help',
          messages: 'messages',
          message: 'text-danger message'
        }"
      />
      <FormKit
        type="number"
        name="quantity"
        label="Cantidad"
        validation="required|number|min:0"
        v-model.number="qtyString"
        :classes="{
          outer: 'mb-4 outer',
          label: 'form-label label',
          input: 'form-control form-control-lg input',
          help: 'form-text text-muted help',
          messages: 'messages',
          message: 'text-danger message'
        }"
      />
      
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary me-2" @click="cancel">Eliminar</button>
        <button type="submit" class="btn btn-primary">Actualizar Producto</button>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import { FormKit } from "@formkit/vue";
import { useProductStore } from "@/stores/useProductStore";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";
import { watch } from "vue";

const props = defineProps<{ initialProduct: ProductSaveDTO }>();
const emit = defineEmits(["saved", "cancelled"]);

const currentProduct = ref<ProductSaveDTO>({ ...props.initialProduct });

watch(
	() => props.initialProduct,
	(newProduct) => {
		currentProduct.value = { ...newProduct };
	},
);

//* Helper to format price
const priceString = computed({
	get: () => currentProduct.value.price.toString(),
	set: (value) => (currentProduct.value.price = parseFloat(value)),
});

//* Helper to format qty
const qtyString = computed({
	get: () => currentProduct.value.qty.toString(),
	set: (value) => (currentProduct.value.qty = parseFloat(value)),
});

const submitProduct = async () => {
	const token = localStorage.getItem("token");
	const productId = currentProduct.value.id;

	const response = await fetch(
		`http://localhost:80/api/products/${productId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: currentProduct.value.name,
				price: currentProduct.value.price,
				qty: currentProduct.value.qty,
			}),
		},
	);
	emit("saved");
};

const cancel = () => {
	emit("cancelled");
};
</script>

<style scoped>
.btn-tertiary {
  background-color: var(--color-complement);
  border-color: transparent; 
}
.btn-secondary {
  background-color: var(--color-primary);
  border-color: transparent; 
}
.btn-primary {
  background-color: var(--color-tertiary);
  border-color: transparent; 
}
</style>