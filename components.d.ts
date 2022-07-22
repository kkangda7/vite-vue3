// components.d.ts

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AppPagenation: typeof import('./src/components/app/AppPagenation.vue')['default']
    AppAlert: typeof import('./src/components/app/AppAlert.vue')['default']
    AppCard: typeof import('./src/components/app/AppCard.vue')['default']
    AppModal: typeof import('./src/components/app/AppModal.vue')['default']
    AppGrid: typeof import('./src/components/app/AppGrid.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

export {}