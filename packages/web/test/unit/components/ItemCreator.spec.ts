import { describe, it, expect } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import ItemCreator from "@/components/ItemCreator.vue";
import { NInput, NButton } from "naive-ui";

describe("ItemCreator.vue", () => {
  it("render journal form", () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "journals" },
    });
    expect(wrapper.find(".n-dialog__title").text()).toBe("Create a item");
    expect(wrapper.findAllComponents(NInput)).toHaveLength(5);
    wrapper.unmount();
  });
  it("render link form", () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "links" },
    });
    expect(wrapper.find(".n-dialog__title").text()).toBe("Create a link");
    expect(wrapper.findAllComponents(NInput)).toHaveLength(3);
    wrapper.unmount();
  });
  it("close journal form", async () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "journals" },
    });
    const cancel = wrapper.findAllComponents(NButton)[0];
    expect(cancel.text()).toBe("Cancel");

    await cancel.trigger("click");
    expect(wrapper.emitted("cancel")).toBeTruthy();
    wrapper.unmount();
  });
  it("close link form", async () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "links" },
    });
    const cancel = wrapper.findAllComponents(NButton)[0];
    expect(cancel.text()).toBe("Cancel");

    await cancel.trigger("click");
    expect(wrapper.emitted("cancel")).toBeTruthy();
    wrapper.unmount();
  });

  it("create journal item", async () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "journals" },
    });

    const inputs = wrapper.findAllComponents(NInput);
    for (const input of inputs) {
      let val = "";
      switch (input.vm.placeholder) {
        case "type":
          val = "Journal";
          break;
        case "Title":
          val = "Test";
          break;
        case "Link":
          val = "http://example.com";
          break;
        case "Deadline":
          val = "2022-06-15";
          break;
        case "Ranking":
          val = "A+";
          break;
      }
      input.find("input").setValue(val);
    }
    const confirm = wrapper.findAllComponents(NButton)[1];
    expect(confirm.text()).toBe("Create");

    await confirm.trigger("click");

    await flushPromises();

    expect(wrapper.emitted("confirm")?.at(0)).toEqual([
      {
        type: "Journal",
        title: "Test",
        link: "http://example.com",
        deadline: "2022-06-15",
        ranking: "A+",
      },
    ]);

    wrapper.unmount();
  });
  it("create link item", async () => {
    const wrapper = mount(ItemCreator, {
      props: { tag: "links" },
    });

    const inputs = wrapper.findAllComponents(NInput);
    for (const input of inputs) {
      let val = "";
      switch (input.vm.placeholder) {
        case "type":
          val = "Tool";
          break;
        case "Title":
          val = "Test";
          break;
        case "Link":
          val = "http://tool.com";
          break;
      }
      input.find("input").setValue(val);
    }
    const confirm = wrapper.findAllComponents(NButton)[1];
    expect(confirm.text()).toBe("Create");

    await confirm.trigger("click");

    await flushPromises();

    expect(wrapper.emitted("confirm")?.at(0)).toEqual([
      {
        type: "Tool",
        title: "Test",
        link: "http://tool.com",
      },
    ]);

    wrapper.unmount();
  });
});
