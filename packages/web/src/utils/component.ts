import { NIcon } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";

export const renderHref = (text: string, link: string) => {
  return h(
    "a",
    {
      class: "text-blue-400",
      href: link,
      target: "_blank",
    },
    { default: () => text }
  );
};

export const renderLink = (
  label: string,
  params: string | { name: string; params: any }
) => {
  if (typeof params === "string")
    return () =>
      h(RouterLink, { to: { name: params } }, { default: () => label });
  else return () => h(RouterLink, { to: params }, { default: () => label });
};

export function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
