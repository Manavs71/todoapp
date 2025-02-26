import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'

import { TodoService } from '../services/todo.service'

export function useTodoCreateMutation(): UseMutationReturnType<TodoCreateForm, void> {
  return useMutation<TodoCreateForm, void>({
    queryFn: async ({ body }) => {
      await TodoService.create(body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
