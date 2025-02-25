import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'

import { TodoService } from '../services/todo.service'

export function useTodoIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<TodoIndexFilters>>,
): UseQueryReturnType<PaginatedData<TodoIndex>> {
  return useQuery<PaginatedData<TodoIndex>>({
    queryFn: () => {
      return TodoService.getAll(paginationOptions.value)
    },
    queryKey: {
      todoIndex: {
        paginationOptions,
      },
    },
  })
}
