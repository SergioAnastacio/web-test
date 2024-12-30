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
        <ProductTableComponent @edit-product=""/>
        
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
              <div v-for="(url, index) in currentProduct.images" :key="index" class="mb-3">
                <FormKit
                  type="url"
                  :name="'url' + index"
                  :label="'Imagen de producto ' + (index + 1)"
                  validation="required|url"
                  v-model="currentProduct.images[index].url"
                  :classes="{
                    outer: 'mb-4 outer',
                    label: 'form-label label',
                    input: 'form-control form-control-lg input',
                    help: 'form-text text-muted help',
                    messages: 'messages',
                    message: 'text-danger message'
                  }"
                />
              </div>
              <button type="button" class="btn btn-primary mb-3" @click="addUrl" :disabled="currentProduct.images.length >= 5">Agregar URL</button>
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
import type { ProductDTO } from "@/core/adapter/DTOs/ProductDTO";
import ProductTableComponent from "@/components/dashboard/ProductTableComponent.vue";

const { openModal, closeModal } = useModalStore(); //* Usefull to open and close modals

const productStore = useProductStore();
const currentProduct = ref<ProductDTO>({
	id: 0,
	name: "",
	price: 0,
	qty: 0,
	images: [{ id: 0, url: "" }],
	created_at: "",
	updated_at: "",
});

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

const addUrl = () => {
	if (currentProduct.value.images.length < 5) {
		const newId =
			currentProduct.value.images.length > 0
				? Math.max(...currentProduct.value.images.map((img) => img.id)) + 1
				: 1;
		currentProduct.value.images.push({ id: newId, url: "" }); // Will push url to images array
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
		created_at: "",
		updated_at: "",
	};
	fileErrors.value = [];
	openModal("productModal");
};

const submitProduct = () => {
	// just use create new product use case

	closeModal("productModal");
};
</script>