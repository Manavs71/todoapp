import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  type CreateTodoCommand,
  createTodoControllerCreateTodoV1,
  getTodosControllerGetTodosV1,
} from '@/client'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexFilters } from '@/models/todo/index/todoIndexFilters.model'
import {
  TodoIndexFiltersTransformer,
  TodoIndexTransformer,
} from '@/models/todo/todo.transformer'
import { ObjectUtil } from '@/utils/object.util'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class TodoService {
  static async create(form: TodoCreateForm): Promise<void> {
    await createTodoControllerCreateTodoV1({
      body: {
        title: form.title,
        deadline: form.deadline,
        description: form.description,
      } as CreateTodoCommand,
    })
  }

  static async getAll(paginationOptions: PaginationOptions<TodoIndexFilters>): Promise<PaginatedData<TodoIndex>> {
    const response = await getTodosControllerGetTodosV1({
      query: new PaginationDtoBuilder(paginationOptions).build(TodoIndexFiltersTransformer.toDto),
      querySerializer: ObjectUtil.serialize,
    })

    return {
      data: response.data.items.map(TodoIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }
}
