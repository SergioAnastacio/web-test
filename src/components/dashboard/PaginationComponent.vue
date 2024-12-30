<template>
  <nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="$emit('goToPrevious')">Anterior</a>
      </li>
      <li class="page-item" :class="{ disabled: endPage }">
        <a class="page-link" href="#" @click.prevent="$emit('goToNext')">Siguiente</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineEmits(["goToPrevious", "goToNext"]);

defineProps({
	currentPage: {
		type: Number,
		default: 1,
	},
	endPage: {
		type: Boolean,
		default: false,
	},
});
</script>