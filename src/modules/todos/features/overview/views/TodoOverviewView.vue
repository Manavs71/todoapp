<script setup lang="ts">
import {
  useDialog,
  usePagination,
  VcButton,
  VcDropdownMenu,
  VcIconButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/layout/AppPage.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { useTodoDeleteMutation } from '@/modules/todos/api/mutations/todoDelete.mutation'
import { useTodoIndexQuery } from '@/modules/todos/api/queries/todoIndex.query'

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()

const pagination = usePagination<TodoIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)
const todoDeleteMutation = useTodoDeleteMutation()
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

async function onDeleteTodo(todoUuid: TodoUuid): Promise<void> {
  try {
    await todoDeleteMutation.execute({
      body: todoUuid,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-GB', options).format(date)
}
</script>

<template>
  <AppPage :title="i18n.t('module.todo.title')">
    <div class="space-y-8">
      <ul v-if="todos.length > 0" class="space-y-4">
        <li v-for="todo in todos" :key="todo.id ?? undefined"
          class="flex items-start justify-between gap-4 p-4 bg-gray-200 rounded-lg shadow-md">
          <div class="flex items-start gap-4">
            <input type="checkbox" class="w-5 h-5 mt-1">
            <div class="flex flex-col">
              <span class="text-lg font-semibold text-gray-800">
                {{ todo.title }}
              </span>
              <span class="text-gray-600">
                {{ todo.description }}
              </span>
              <span class="text-gray-600">
                {{ formatDate(todo.deadline) }}
              </span>
            </div>
          </div>

          <VcDropdownMenu :items="[
            {
              icon: 'edit',
              label: 'Bewerk to do',
              type: 'option',
              onSelect: () => onEditTodo(todo.id),
            },
            {
              icon: 'trash',
              label: 'Verwijder to do',
              type: 'option',
              onSelect: () => onDeleteTodo(todo.id),
              isDestructive: true,
            },
          ]">
            <template #trigger>
              <VcButton class="bg-transparent text-gray-950">
                ...
              </VcButton>
            </template>
          </VcDropdownMenu>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500">
        {{ i18n.t('module.todo.no_todos') }}
      </p>
    </div>
    <div class="fixed bottom-4 right-4">
      <VcIconButton variant="default" icon="plus" label="add"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        @click="onAddTodoCreateDialog" />
    </div>
  </AppPage>
</template>
