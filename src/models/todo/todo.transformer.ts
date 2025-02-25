import type { TodoCreateDto } from './create/todoCreateDto.model'
import type { TodoCreateForm } from './create/todoCreateForm.model'
import type { todoIndexDto } from './index/todoDto.model'
import type { TodoIndex } from './index/todoIndex.model'
import type { TodoIndexFilters } from './index/todoIndexFilters.model'
import type { TodoIndexFiltersDto } from './index/todoIndexFiltersDto.model'

export class TodoIndexTransformer {
  static fromDto(dto: todoIndexDto): TodoIndex {
    return {
      id: dto.uuid,
      title: dto.title,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      completed: dto.completed,
      description: dto.description,
      deadline: dto.deadline ?? 'deadline not set'
    }
  }
}

export class TodoIndexFiltersTransformer {
  static toDto(filters: TodoIndexFilters): TodoIndexFiltersDto {
    return filters
  }
}


  export class TodoCreateTransformer {
    static toDto(form: TodoCreateForm): TodoCreateDto {
      return {
        title: form.title,
        description: form.description,
        deadline: form.deadline
      }
    }
  }
  