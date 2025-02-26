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
</script>

<template>
  <AppPage :title="i18n.t('module.todo.title')">
    <div class="space-y-8">
      <!-- Todo List -->
      <div>
        <ul v-if="todos.length > 0" class="space-y-4 ml-20 mr-20">
          <li v-for="todo in todos" :key="todo.id" class="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
            <h3 class="text-lg font-semibold">
              {{ todo.title }}
            </h3>
          </li>

          <VcButton v-for="variant in variants" :key="variant" :variant="variant"
            class="w-full py-3 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            @click="onAddTodoCreateDialog">
            {{ i18n.t('module.todo.addbutton.text') }}
          </VcButton>
        </ul>
        <p v-else class="text-gray-500">
          {{ i18n.t('module.todo.no_todos') }}
        </p>
      </div>
    </div>
  </AppPage>
</template>
