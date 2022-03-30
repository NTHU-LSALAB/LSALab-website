import { describe, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ItemCreator from "@/components/ItemCreator.vue";

describe("ItemCreator.vue", () => {
  it("render forms", () => {
    const wrapper = shallowMount(ItemCreator);
    console.log(wrapper.find("input"));
  });
});
