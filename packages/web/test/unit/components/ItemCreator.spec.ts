import { describe, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ItemCreator from "@/components/ItemCreator.vue";

describe("ItemCreator.vue", () => {
  it("render forms", () => {
    // expect(1).toBe(1);
    const wrapper = shallowMount(ItemCreator, { props: { tag: "journal" } });
    console.log(wrapper.find("input"));
  });
});
