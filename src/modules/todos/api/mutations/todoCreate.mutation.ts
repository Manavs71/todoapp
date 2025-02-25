import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'


import { TodoService } from '../services/todo.service'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'

export function useSettingRoleCreateMutation(): UseMutationReturnType<TodoCreateForm, void> {
  return useMutation<TodoCreateForm, void>({
    queryFn: async ( {body} ) => {
      await TodoService.create( body )
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
