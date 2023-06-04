<script setup lang="ts">
import type { ProductInterface } from "@/interface";
import ShopProduct from "./ShopProduct.vue";
import { inject, onUpdated, ref, watch } from "vue";
import { pageKey } from "@/shared/injectionKeys/pageKey";

const props = defineProps<{
  products: ProductInterface[];
  moreResults: boolean;
}>();

const emit = defineEmits<{
  (e: "addProductToCart", productId: string): void;
  (e: "incPage"): void;
}>();

const page = inject(pageKey)!;

const scrollablediv = ref<HTMLDivElement | null>(null);

watch(page, () => {
  if (page.value === 1) {
    scrollablediv.value?.scrollTo(0, 0);
  }
});
</script>

<template>
  <div ref="scrollablediv" class="d-flex flex-column p-20">
    <div class="grid mb-20">
      <ShopProduct
        v-for="product of products"
        :key="product._id"
        :product="product"
        @add-product-to-cart="emit('addProductToCart', $event)"
      />
    </div>
    <div
      v-if="moreResults"
      class="d-flex flex-row align-items-center justify-content-center"
    >
      <button @click="emit('incPage')" class="btn btn-primary">
        Charger plus de produit
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/mixins" as m;
.grid {
  display: grid;
  grid-template-columns: 1fr;
  @include m.md {
    grid-template-columns: 1fr 2fr;
  }
  @include m.lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include m.xl {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  grid-auto-rows: 350px;
  gap: 20px;
}
</style>
