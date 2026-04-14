<script setup>
import { useArticleStore } from "~/stores/articleStore";
const store = useArticleStore();
const router = useRouter();

const form = ref({
  title: "",
  content: {},
  notes: [],
  multimedia: [], // Can store {type: 'audio', url: '...'}
});

const handleSave = async () => {
  console.log(form.value);

  await store.saveArticle(form.value);
};
</script>
<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Create New Article</h1>

    <div class="space-y-4">
      <input
        v-model="form.title"
        placeholder="Article Title"
        class="w-full p-3 border rounded"
      />

      <!-- Main Content -->
      <label class="block font-semibold">Main Article Content</label>
      <EditorTiptapEditor v-model="form.content" />

      <!-- Accordion Notes (Dynamic) -->
      <div class="mt-8 border-t pt-4">
        <h3 class="font-bold mb-2">Extra Info (Accordions)</h3>
        <div
          v-for="(note, index) in form.notes"
          :key="index"
          class="mb-4 p-4 border rounded bg-gray-50"
        >
          <input
            v-model="note.title"
            placeholder="Accordion Title"
            class="w-full mb-2 p-2 border rounded"
          />
          <EditorTiptapEditor v-model="note.body" />
          <button
            @click="form.notes.splice(index, 1)"
            class="text-red-500 text-sm mt-2"
          >
            Remove Note
          </button>
        </div>
        <button
          @click="form.notes.push({ title: '', body: '' })"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Accordion Note
        </button>
      </div>

      <button
        @click="handleSave"
        class="w-full bg-green-600 text-white p-4 rounded-lg font-bold"
      >
        Save & Publish Article
      </button>
    </div>
  </div>
</template>
