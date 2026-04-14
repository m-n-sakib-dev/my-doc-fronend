<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Categories</h1>
      <NuxtLink
        to="/article/create"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + New Article
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="cat in store.categories"
        :key="cat.id"
        :to="`/category/${cat.name.toLowerCase()}`"
        class="p-10 border rounded-xl shadow hover:shadow-lg text-center bg-white transition"
      >
        <span class="text-4xl block mb-2">{{ cat.icon }}</span>
        <span class="text-xl font-semibold">{{ cat.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from "~/stores/articleStore";
const store = useArticleStore();
</script>
