<template>
  <div class="container mt-5">
    <div class="card shadow-lg border-0">
      <div class="card-body p-5">
        <h2 class="text-center mb-4 text-primary">Listado de Productos</h2>
        
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <button @click="openCreateModal" class="btn btn-primary">
            Crear Nuevo Producto
          </button>
        </div>
        <ProductTableComponent/>
        
      </div>
    </div>

    <!-- Modal para crear -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel"><i class="bi bi-file-earmark-plus"> Crear Nuevo Producto</i></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <FormKit
              type="form"
              id="productForm"
              :actions="false"
              @submit="submitProduct"
              #default="{ state }"
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
                  :name="'image-' + index"
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
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Producto</button>
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { FormKit } from "@formkit/vue";
import { useProductStore } from "@/stores/useProductStore";
import { useModalStore } from "@/stores/useModalStore";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";
import ProductTableComponent from "@/components/dashboard/ProductTableComponent.vue";

const { openModal, closeModal } = useModalStore();

const productStore = useProductStore();
const currentProduct = ref<ProductSaveDTO>({
	id: 0,
	name: "",
	price: 0,
	qty: 0,
	images: [],
	urls: [],
});

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

const isEditing = ref(false);

const addImage = () => {
	if (currentProduct.value.images.length < 5) {
		currentProduct.value.images.push(
			new File([], "placeholder.jpg", { type: "image/jpeg" }),
		);
	}
};

const addUrl = () => {
	if (currentProduct.value.urls.length < 5) {
		currentProduct.value.urls.push("");
	}
};

const fileErrors = ref<string[]>([]);

const openCreateModal = () => {
	currentProduct.value = {
		id: 0,
		name: "",
		price: 0,
		qty: 0,
		images: [],
		urls: [],
	};
	fileErrors.value = [];
	useUrls.value = false;
	openModal("productModal");
};

const handleFileChange = (event: Event, index: number) => {
	const file = (event.target as HTMLInputElement).files?.[0];
	if (file) {
		currentProduct.value.images[index] = file;
	}
};

const submitProduct = () => {
	//TODO: Implement save product
	//* use saveproduct method inside use saveproduct class from product appservice.
	// productStore.saveProduct(currentProduct.value);
	closeModal("productModal");
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