import { CalendarDateTransformer } from '../date/calendarDate.transformer'
import type { TodoCreateDto } from './create/todoCreateDto.model'
import type { TodoCreateForm } from './create/todoCreateForm.model'
import type { todoIndexDto } from './index/todoDto.model'
import type { TodoIndex } from './index/todoIndex.model'
import type { TodoIndexFilters } from './index/todoIndexFilters.model'
import type { TodoIndexFiltersDto } from './index/todoIndexFiltersDto.model'
import type { TodoUuid } from './todoUuid.model'

export class TodoIndexTransformer {
  static fromDto(dto: todoIndexDto): TodoIndex {
    return {
      id: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      completed: dto.completed,
      deadline: dto.deadline ?? 'deadline not set',
      description: dto.description,
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
      deadline: CalendarDateTransformer.toNullableDto(form.deadline),
      description: form.description,
    }
  }
}
