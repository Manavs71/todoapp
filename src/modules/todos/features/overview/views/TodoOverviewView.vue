<script setup lang="ts">
import type {
  PaginationOptions,
  VcButtonProps,
} from '@wisemen/vue-core'
import { useDialog, VcButton } from '@wisemen/vue-core'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/layout/AppPage.vue'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import { TodoService } from '@/modules/todos/api/services/todo.service'

const variants: VcButtonProps['variant'][] = [
  'default',
]
const todos = ref<TodoIndex[]>([])

const i18n = useI18n()

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

const addTodoCreateDialog = useDialog({
  component: () => import('@/modules/todos/components/TodoCreateDialog.vue'),
})

function onAddTodoCreateDialog(): void {
  addTodoCreateDialog.open({
    id: 'addTodo',
  })
}
</script>

<template>
  <AppPage :title="i18n.t('module.todo.title')">
    <div>
      <ul v-if="todos.length > 0">
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
      <p v-else>
        {{ i18n.t('module.todo.no_todos') }}
      </p>
    </div>

    <div class="grid grid-cols-3 gap-8">
      <VcButton v-for="variant in variants" :key="variant" :variant="variant" @click="onAddTodoCreateDialog">
        {{ i18n.t('module.todo.addbutton.text') }}
      </VcButton>
    </div>
  </AppPage>
</template>

<style scoped>
/* Add your styles here */
</style>
