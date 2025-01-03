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
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" :inert="!isModalOpen" :aria-hidden="!isModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel"><i class="bi bi-file-earmark-plus"> Crear Nuevo Producto</i></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
           <ProductFormComponent :initialProduct="currentProduct" @saved="handleSave" @cancelled="handleCancel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useModalStore } from "@/stores/useModalStore";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";
import ProductTableComponent from "@/components/dashboard/ProductTableComponent.vue";
import ProductFormComponent from "@/components/dashboard/ProductFormComponent.vue";

const { openModal, closeModal } = useModalStore();
const currentProduct = ref<ProductSaveDTO>({
	id: 0,
	name: "",
	price: 0,
	qty: 0,
	images: [],
	urls: [],
});
const isModalOpen = ref(false);
const openCreateModal = () => {
	currentProduct.value = {
		id: 0,
		name: "",
		price: 0,
		qty: 0,
		images: [],
		urls: [],
	};
	isModalOpen.value = true;
	openModal("productModal");
};

const handleSave = () => {
	isModalOpen.value = false;
	closeModal("productModal");
};

const handleCancel = () => {
	isModalOpen.value = false;
	closeModal("productModal");
};
</script>