<template>
  <div>
    <FormKit
      type="form"
      id="productForm"
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

      <div class="mb-3">
        <button type="button" class="btn btn-tertiary me-2" @click="toggleUploadMethod">
          {{ useUrls ? 'Usar Imágenes' : 'Usar URLs' }}
        </button>
      </div>
      <button v-if="useUrls" type="button" class="btn btn-primary mb-3" @click="addUrl" :disabled="currentProduct.urls.length >= 5">Agregar URL</button>
      <button v-if="!useUrls" type="button" class="btn btn-primary mb-3" @click="addImage" :disabled="currentProduct.images.length >= 5">Agregar Imagen</button>
      
      <div v-if="!useUrls" v-for="(image, index) in currentProduct.images" :key="index" class="mb-3">
        <FormKit
          type="file"
          :name="'images[]'"
          :accept="'image/*'"
          :label="'Archivo de Imagen ' + (index + 1)"
          @change="handleFileChange($event, index)"
          :classes="{
            outer: 'mb-3',
            label: 'form-label',
            input: 'form-control'
          }"
        />
      </div>
    
      <div v-if="useUrls" v-for="(url, index) in currentProduct.urls" :key="index" class="mb-3">
        <FormKit
          type="text"
          :name="'url-' + index"
          :label="'URL ' + (index + 1)"
          v-model="currentProduct.urls[index]"
          :classes="{
            outer: 'mb-3',
            label: 'form-label',
            input: 'form-control'
          }"
        />
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary me-2" @click="cancel">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar Producto</button>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import { FormKit } from "@formkit/vue";
import { useProductStore } from "@/stores/useProductStore";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";

const props = defineProps<{ initialProduct: ProductSaveDTO }>();
const emit = defineEmits(["saved", "cancelled"]);

const productStore = useProductStore();
const currentProduct = ref<ProductSaveDTO>({ ...props.initialProduct });

const useUrls = ref(false);

const toggleUploadMethod = () => {
	useUrls.value = !useUrls.value;
	currentProduct.value.images = [];
	currentProduct.value.urls = [];
};

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

const addImage = () => {
	if (currentProduct.value.images.length < 5) {
		currentProduct.value.images.push({} as File);
	}
};

const addUrl = () => {
	if (currentProduct.value.urls.length < 5) {
		currentProduct.value.urls.push("");
	}
};

const handleFileChange = (event: Event, index: number) => {
	const file = (event.target as HTMLInputElement).files?.[0];
	if (file) {
		currentProduct.value.images[index] = file;
	}
};

const submitProduct = () => {
	try {
		productStore.saveProduct(currentProduct.value);

		emit("saved");
	} catch (error: any) {
		throw new Error(error + "Error to save product");
	}
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