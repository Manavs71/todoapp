<script setup lang="ts">
import type {
  VcButtonProps,
} from '@wisemen/vue-core'
import {
  useDialog,
  usePagination,
  VcButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/layout/AppPage.vue'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'

const variants: VcButtonProps['variant'][] = [
  'default',
]
const i18n = useI18n()

const pagination = usePagination<TodoIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

const todos = computed<TodoIndex[]>(() => todoIndexQuery.data.value?.data as TodoIndex[] || [])

const addTodoCreateDialog = useDialog({
  component: () => import('@/modules/todos/components/TodoCreateDialog.vue'),
})

function onAddTodoCreateDialog(): void {
  addTodoCreateDialog.open({
    id: 'addTodo',
  })
}

function onEditTodo(id: TodoUuid): void {
  addTodoCreateDialog.open({
    todoUuid: id,
  })
}
</script>

<template>
  <AppPage :title="i18n.t('module.todo.title')">
    <div class="space-y-8">
      <!-- Todo List -->
      <div>
        <ul v-if="todos.length > 0" class="space-y-4">
          <li v-for="todo in todos" :key="todo.id ?? undefined"
            class="flex justify-between items-center border border-black-600 p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ todo.title }}
            </h3>
            <p>
              {{ todo.description }}
            </p>
            <p>
              {{ todo.deadline }}
            </p>
            <VcButton v-for="variant in variants" :key="variant" :variant="variant"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
              @click="onEditTodo(todo.id)">
              {{ i18n.t('module.todo.editbutton.text') }}
            </VcButton>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          {{ i18n.t('module.todo.no_todos') }}
        </p>
      </div>

      <!-- Add Todo Button -->
      <div class="flex justify-center">
        <VcButton v-for="variant in variants" :key="variant" :variant="variant"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          @click="onAddTodoCreateDialog">
          {{ i18n.t('module.todo.addbutton.text') }}
        </VcButton>
      </div>
    </div>
  </AppPage>
</template>
