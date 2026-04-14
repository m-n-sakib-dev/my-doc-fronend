import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    categories: [
      { id: 1, name: 'Science', icon: '🧪' },
      { id: 2, name: 'History', icon: '📜' },
      { id: 3, name: 'Technology', icon: '💻' }
    ]
  }),
  actions: {
    async saveArticle(articleData) {
      // BACKEND CALL (Commented for Vercel/Local testing)
      /* 
      const config = useRuntimeConfig()
      await $fetch(`${config.public.backendUrl}/articles`, { method: 'POST', body: articleData })
      */
      
      // Local Storage Implementation
      const saved = JSON.parse(localStorage.getItem('my_articles') || '[]')
      const newArticle = { ...articleData, id: Date.now() }
      saved.push(newArticle)
      localStorage.setItem('my_articles', JSON.stringify(saved))
      this.articles = saved
    },
    async fetchArticles() {
      const saved = JSON.parse(localStorage.getItem('my_articles') || '[]')
      this.articles = saved
      return saved
    }
  }
})
