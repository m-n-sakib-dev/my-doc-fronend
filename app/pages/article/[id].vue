<script setup>
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useArticleStore } from "~/stores/articleStore";

const route = useRoute();
const store = useArticleStore();
const article = ref(null);
const activeNote = ref(null);
const modalText = ref(null);

// 1. Fetch Data
onMounted(async () => {
  await store.fetchArticles();
  article.value = store.articles.find((a) => a.id == route.params.id);
  console.log("Store Articles:", store.articles);
  console.log("Looking for ID:", route.params.id);
  const found = store.articles.find((a) => a.id == route.params.id);
  if (found) {
    article.value = found;
  } else {
    console.error("Article not found in store!");
  }
  // Logic for Modal Click handling
  window.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.getAttribute("href")?.startsWith("#modal:")) {
      e.preventDefault();
      modalText.value = link
        .getAttribute("href")
        .replace("#modal:", "")
        .replace(/%20/g, " ");
    }
  });
});

// 2. Render Logic
const renderJson = (json) => {
  if (!json || Object.keys(json).length === 0) return "";
  return generateHTML(json, [StarterKit, Link]);
};

const htmlContent = computed(() => renderJson(article.value?.content));

const getIcon = (type) => {
  const icons = { audio: "🎵", video: "📺", image: "🖼️", text: "📄" };
  return icons[type] || "🔘";
};

const handleMedia = (btn) => {
  alert(`Playing/Showing: ${btn.type} from ${btn.url || "embedded data"}`);
};
</script>

<style>
/* Style the clickable modal words within the rendered HTML */
.article-body a[href^="#modal:"] {
  @apply bg-yellow-100 text-yellow-800 px-1 rounded border-b-2 border-yellow-400 no-underline cursor-help;
}
</style>

<template>
  <div
    v-if="article"
    class="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8"
  >
    <!-- Left: Content -->
    <div class="flex-1">
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-4xl font-bold">{{ article.title }}</h1>
        <NuxtLink
          :to="`/article/edit/${article.id}`"
          class="bg-gray-100 px-3 py-1 rounded text-sm"
          >Edit</NuxtLink
        >
      </div>

      <!-- Top Multimedia Buttons -->
      <div class="flex gap-4 mb-8">
        <button
          v-for="btn in article.buttons"
          :key="btn.id"
          @click="handleMedia(btn)"
          class="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition"
        >
          <span>{{ getIcon(btn.type) }}</span> {{ btn.label }}
        </button>
      </div>

      <!-- Main Article (Rendered from JSON) -->
      <div
        class="prose prose-blue lg:prose-xl max-w-none article-body"
        v-html="htmlContent"
      ></div>
    </div>

    <!-- Right: Accordion Extra Info -->
    <div class="w-full md:w-80">
      <h3 class="font-bold border-b pb-2 mb-4 text-gray-700">Detailed Notes</h3>
      <div
        v-for="(note, i) in article.notes"
        :key="i"
        class="border rounded-lg mb-3 overflow-hidden"
      >
        <button
          @click="activeNote = activeNote === i ? null : i"
          class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between font-medium"
        >
          {{ note.title }}
          <span>{{ activeNote === i ? "−" : "+" }}</span>
        </button>
        <div
          v-if="activeNote === i"
          class="p-4 border-t bg-white prose prose-sm"
          v-html="renderJson(note.body)"
        ></div>
      </div>
    </div>

    <!-- Modal for Clickable Words -->
    <div
      v-if="modalText"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl">
        <h4 class="font-bold text-lg mb-2">Info</h4>
        <p class="text-gray-600">{{ modalText }}</p>
        <button
          @click="modalText = null"
          class="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
