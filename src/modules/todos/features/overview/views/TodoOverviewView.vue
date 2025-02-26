<script setup lang="ts">
import type { PaginationOptions } from '@wisemen/vue-core'
import { onMounted, ref } from 'vue'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import { TodoService } from '@/modules/todos/api/services/todo.service'

const todos = ref<TodoIndex[]>([])

async function fetchTodos(): Promise<void> {
  const paginationOptions: PaginationOptions<TodoIndexFilters> = {
    pagination: {
      limit: 10,
      offset: 0,
    },
  }

  try {
    const response = await TodoService.getAll(paginationOptions)

    todos.value = response.data
  }
  catch (error) {
    console.error('Error fetching todos:', error)
  }
}

onMounted(fetchTodos)
</script>

<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
