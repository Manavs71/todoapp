import type { PaginationOptions } from '@wisemen/vue-core'

import type { SortDirection } from '@/client'

const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

export interface PaginationDtoParams<TFilterSchema, TSortKeys> {
  filter: TFilterSchema
  pagination: {
    limit: number
    offset: number
  }
  search?: string
  sort: {
    key: TSortKeys
    order: SortDirection
  }[]
}

interface PaginationSort {
  direction: SortDirection
  key: string
}

export class PaginationDtoBuilder<TFilterSchema, TSortKeys = Record<string, string>> {
  private paginationOptions: PaginationDtoParams<TFilterSchema, TSortKeys>

  constructor(paginationOptions?: PaginationOptions<TFilterSchema>) {
    const limit = (paginationOptions?.pagination.limit ?? DEFAULT_LIMIT)
    const offset = (paginationOptions?.pagination.offset ?? DEFAULT_OFFSET) * limit

    const allFilters = {
      ...paginationOptions?.filters ?? {},
      ...paginationOptions?.staticFilters ?? {},
    }

    this.paginationOptions = {
      pagination: {
        limit,
        offset,
      },
      search: paginationOptions?.search,
    } as PaginationDtoParams<TFilterSchema, TSortKeys>

    Object.entries(allFilters).forEach(([
      key,
      value,
    ]) => {
      this.withFilter(key as keyof TFilterSchema, value as TFilterSchema[keyof TFilterSchema])
    })

    if (paginationOptions?.sort !== undefined) {
      this.withSort({
        direction: paginationOptions.sort.direction as SortDirection,
        key: paginationOptions.sort.key,
      })
    }
  }

  public build<TFilterSchemaDto, TSortKeys>(
    transformer?: (filters: TFilterSchema) => TFilterSchemaDto,
  ): PaginationDtoParams<TFilterSchemaDto, TSortKeys> {
    return {
      ...this.paginationOptions,
      filter: transformer?.(this.paginationOptions.filter as TFilterSchema) as TFilterSchemaDto,
      sort: this.paginationOptions?.sort?.map((sort) => ({
        key: sort.key as unknown as TSortKeys,
        order: sort.order,
      })) ?? [],
    }
  }

  public withFilter<TKey extends keyof TFilterSchema>(
    key: TKey,
    value: TFilterSchema[TKey] | null | undefined,
  ): PaginationDtoBuilder<TFilterSchema, TSortKeys> {
    if (value !== null && value !== '') {
      this.paginationOptions.filter = {
        ...this.paginationOptions.filter,
        [key]: value,
      } as TFilterSchema
    }

    return this
  }

  public withLimit(limit: number): PaginationDtoBuilder<TFilterSchema, TSortKeys> {
    this.paginationOptions.pagination.limit = limit

    return this
  }

  public withOffset(offset: number): PaginationDtoBuilder<TFilterSchema, TSortKeys> {
    this.paginationOptions.pagination.offset = offset

    return this
  }

  public withSearch(search: string): PaginationDtoBuilder<TFilterSchema, TSortKeys> {
    this.paginationOptions.search = search

    return this
  }

  public withSort(sort: PaginationSort): PaginationDtoBuilder<TFilterSchema, TSortKeys> {
    this.paginationOptions.sort = [
      {
        key: sort.key as TSortKeys,
        order: sort.direction,
      },
    ]

    return this
  }
}
