<template>
  <div class="border rounded-lg overflow-hidden bg-white">
    <!-- Basic Toolbar -->
    <div v-if="editor" class="bg-gray-100 p-2 border-b flex gap-2 flex-wrap">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'bg-blue-200': editor.isActive('bold') }"
        class="p-1 px-2 border rounded"
      >
        B
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'bg-blue-200': editor.isActive('italic') }"
        class="p-1 px-2 border rounded"
      >
        I
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        class="p-1 px-2 border rounded"
      >
        List
      </button>
      <button
        @click="setModalLink"
        class="p-1 px-2 border rounded bg-green-100 text-xs"
      >
        Add Modal Word
      </button>
    </div>

    <editor-content
      :editor="editor"
      class="prose max-w-none p-4 min-h-[200px] focus:outline-none"
    />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
    }),
  ],
  onUpdate: () => {
    emit("update:modelValue", editor.value.getJSON());
  },
});

const setModalLink = () => {
  const url = window.prompt("Enter the info to show in modal:");
  if (url) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: `#modal:${url}` })
      .run();
  }
};
</script>
