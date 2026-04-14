<template>
  <nav class="bg-white border-b p-4 mb-6">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-xl text-blue-600"
        >ArticleHub</NuxtLink
      >
      <div class="space-x-4">
        <NuxtLink to="/" class="hover:text-blue-500">Categories</NuxtLink>
        <NuxtLink
          to="/article/create"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >Create Article</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>
