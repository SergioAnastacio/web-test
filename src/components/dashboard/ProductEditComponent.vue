<template>
  <div class="container mt-5">
    <div v-if="useproductstore.loading" class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
    <div v-else class="row">
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
            

            <ProductEditFormComponent :initialProduct="editedProduct" @saved="handleSave" @cancelled="handleCancel" />
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
import { useProductStore } from "@/stores/useProductStore";
import { useModalStore } from "@/stores/useModalStore";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";
import ProductEditFormComponent from "./ProductEditFormComponent.vue";
import router from "@/router";

const props = defineProps<{ productId: number }>();
const useproductstore = useProductStore();
const { openModal, closeModal } = useModalStore();

const editedProduct = ref<ProductSaveDTO>({
	id: useproductstore.product?.id ?? 0,
	name: useproductstore.product?.name ?? "",
	price: useproductstore.product?.price.amount ?? 0,
	qty: useproductstore.product?.qty ?? 0,
	images: [],
	urls: [],
});

watch(
	() => useproductstore.product,
	(newProduct) => {
		editedProduct.value = {
			id: newProduct?.id ?? 0,
			name: newProduct?.name ?? "",
			price: newProduct?.price.amount ?? 0,
			qty: newProduct?.qty ?? 0,
			images: [],
			urls: [],
		};
	},
);

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

const handleSave = () => {
	router.push({ name: "dashboard" });
};

const handleCancel = () => {
	confirmDelete();
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