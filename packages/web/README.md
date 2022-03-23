# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Contribution Guide

1. Project structure
    - `/main.ts` \
    Entry of an app
    - `/views` \
    View components for every url path
    - `/store` \
    State management, **Publications and Fields data is stored here**
    - `/router` \
    Routes for each page
    - `/i18n` \
    Translation content

3. Run app on local device
    1. clone the project from GitHub
        ```shell
        git clone git@github.com:NTHU-LSALAB/website.git
        ```
    2. Install dependencies
        ```shell
        cd website
        yarn
        ```
    3. Rename `.env.example` to `.env`

4. Create a pull request from your feature branch

## TODOS

- SCC information and history

- Graduation project content (high)

- Group meeting slide patch (high)

- Research content (high)

- Server details

- CV

- Connection

- Homepage news

- Translation

- Search website
