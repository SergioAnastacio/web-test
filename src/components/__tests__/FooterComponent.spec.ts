import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FooterComponent from "../footer/FooterComponent.vue";

describe("FooterComponent", () => {
	it("renders properly", () => {
		const wrapper = mount(FooterComponent);
		expect(wrapper.find("footer").exists()).toBe(true);
		expect(wrapper.find("span").text()).toContain("©");
	});

	it("displays the correct year", () => {
		const wrapper = mount(FooterComponent);
		const year = new Date().getFullYear();
		expect(wrapper.find("span").text()).toContain(year.toString());
	});

	it("displays the correct email", () => {
		const wrapper = mount(FooterComponent);
		expect(wrapper.find("div.col-md-4.text-end span").text()).toBe(
			"dev@sergioanastacio.icu",
		);
	});

	it("displays the logo", () => {
		const wrapper = mount(FooterComponent);
		const logo = wrapper.find("img");
		expect(logo.exists()).toBe(true);
		expect(logo.attributes("src")).toBe("/logo1.png");
		expect(logo.attributes("alt")).toBe("Logo");
	});
});
