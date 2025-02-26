import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

import { TodoService } from '../services/todo.service'

export function useTodoUpdateMutation(todoUuid?: TodoUuid): UseMutationReturnType<TodoCreateForm, void> {
    return useMutation<TodoCreateForm, void>({
        queryFn: async ({ body }) => {
            if (todoUuid !== undefined) {
                await TodoService.update(todoUuid, body)
            }
            else {
                throw new Error('todoUuid is undefined')
            }
        },
        queryKeysToInvalidate: {
            todoIndex: {},
        },
    })
}
