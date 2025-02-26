import type { TodoUuid } from '../todoUuid.model'

export interface TodoIndex {
  id: TodoUuid
  title: string
  createdAt: string
  updatedAt: string
  completed: boolean
  deadline: string
  description: string | null
}
