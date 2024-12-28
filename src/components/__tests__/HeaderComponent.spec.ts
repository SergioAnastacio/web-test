import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HeaderComponent from "../header/HeaderComponent.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createPinia } from "pinia";

describe("HeaderComponent", () => {
	it("renders properly", () => {
		const wrapper = mount(HeaderComponent, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub,
				},
				plugins: [createPinia()],
			},
		});
		expect(wrapper.find("img").attributes("src")).toBe("/logo1.png");
	});
});
