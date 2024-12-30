<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Detalles del Producto -->
      <div class="col-md-6">
        <div class="card shadow-lg border-0">
          <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div v-if="useproductstore.product && useproductstore.product.images" v-for="(image, index) in useproductstore.product.images" :key="index" class="carousel-item" :class="{ active: index === 0 }">
                <div class="ratio ratio-16x9 rounded">
                  <img :src="image.url.url" class="d-block w-100" :alt="`${image.id} - Imagen ${index + 1}`">
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon custom-carousel-control" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon custom-carousel-control" aria-hidden="true"></span>
              <span class="visually-hidden">Siguiente</span>
            </button>
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ useproductstore.product?.name }}</h2>
            <p class="card-text"><strong>Precio:</strong>{{ formatCurrency(useproductstore.product?.price.amount,useproductstore.product?.price.currency) }} </p>
            <p class="card-text"><strong>Cantidad:</strong> {{ useproductstore.product?.qty }}</p>
          </div>
        </div>
      </div>

      <!-- Formulario de Edición -->
      <div class="col-md-6">
        <div class="card shadow-lg border-0">
          <div class="card-body">
            <h3 class="card-title mb-4">Editar Producto</h3>
            <FormKit
              type="form"
              @submit="updateProduct"
              :actions="false"
            >
              <FormKit
                type="text"
                name="name"
                label="Nombre del Producto"
                v-model="editedProduct.name"
                validation="required"
                :classes="{
                  outer: 'mb-3',
                  label: 'form-label',
                  input: 'form-control'
                }"
              />
              <FormKit
                type="number"
                name="price"
                label="Precio"
                v-model="priceString"
                validation="required|number|min:0"
                :classes="{
                  outer: 'mb-3',
                  label: 'form-label',
                  input: 'form-control'
                }"
              />
              <FormKit
                type="number"
                name="qty"
                label="Cantidad"
                v-model="qtyString"
                validation="required|number|min:0"
                :classes="{
                  outer: 'mb-3',
                  label: 'form-label',
                  input: 'form-control'
                }"
              />
              <div class="d-flex gap-3">
                <button type="submit" class="btn btn-primary mb-3">Actualizar Producto</button>
                <button type="button" @click="confirmDelete" class="btn btn-danger mb-3">Eliminar Producto</button>
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { FormKit } from "@formkit/vue";
import { useProductStore } from "@/stores/useProductStore";
import { useModalStore } from "@/stores/useModalStore";
import type { ProductDTO } from "@/core/adapter/DTOs/ProductDTO";
import { computed } from "vue";

const props = defineProps<{ productId: number }>();
const useproductstore = useProductStore();
const { openModal, closeModal } = useModalStore();

const editedProduct = ref<ProductDTO>({
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
	get: () => editedProduct.value.price.toString(),
	set: (value) => (editedProduct.value.price = parseFloat(value)),
});

//* Helper to format qty
const qtyString = computed({
	get: () => editedProduct.value.qty.toString(),
	set: (value) => (editedProduct.value.qty = parseFloat(value)),
});

const fetchProduct = async (id: number) => {
	await useproductstore.getProductById(id);
};

onMounted(async () => {
	await fetchProduct(props.productId);
});

watch(
	() => props.productId,
	async (newId) => {
		await fetchProduct(newId);
	},
);

const updateProduct = () => {
	//TODO: Implement update product
};

const confirmDelete = () => {
	openModal("deleteConfirmationModal");
};

const deleteProduct = () => {
	const productId = useproductstore.product?.id;
	if (productId !== undefined) {
		useproductstore.delteProduct(productId);
	}

	closeModal("deleteConfirmationModal");
};

const formatCurrency = (value?: number, currency?: string) => {
	if (!currency) {
		return value ?? 0;
	}
	return new Intl.NumberFormat(currency, {
		style: "currency",
		currency: currency,
	}).format(value ?? 0);
};
</script>

<style scoped>
.card {
  height: 100%;
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.custom-carousel-control {
  background-color: rgba(0,0,0,0.5); /* Cambia el color aquí */
  border-radius: 50%; 
  padding: 1.4rem 1.5rem; 
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Añade sombra para resaltar */
}
</style>