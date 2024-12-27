import { defineStore } from "pinia";
import { ref } from "vue";
import * as bootstrap from "bootstrap";

export const useModalStore = defineStore("modalStore", () => {
	const modals = ref<{ [key: string]: boolean }>({});

	const openModal = (modalId: string) => {
		modals.value[modalId] = true;
		const modalElement = document.getElementById(modalId);
		if (modalElement) {
			const modal = new bootstrap.Modal(modalElement);
			modal.show();
		}
	};

	const closeModal = (modalId: string) => {
		modals.value[modalId] = false;
		const modalElement = document.getElementById(modalId);
		if (modalElement) {
			const modal = bootstrap.Modal.getInstance(modalElement);
			modal?.hide();
		}
	};

	return {
		modals,
		openModal,
		closeModal,
	};
});
