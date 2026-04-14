<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 capitalize">
      Category: {{ route.params.id }}
    </h1>
    <div class="grid gap-4">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="p-4 border rounded bg-white flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-bold">{{ article.title }}</h2>
          <p class="text-gray-500 text-sm">JSON Data ID: {{ article.id }}</p>
        </div>
        <NuxtLink
          :to="`/article/${article.id}`"
          class="text-blue-600 font-medium"
          >View Article →</NuxtLink
        >
      </div>
      <p v-if="filteredArticles.length === 0" class="text-gray-400">
        No articles found in this category.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from "~/stores/articleStore";
const route = useRoute();
const store = useArticleStore();

const filteredArticles = computed(() => {
  return store.articles.filter(
    (a) => a.category?.toLowerCase() === route.params.name,
  );
});

onMounted(() => store.fetchArticles());
</script>
