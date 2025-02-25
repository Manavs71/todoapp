import { z } from 'zod'

import {
  type ContactResponse,
  createRoleControllerCreateRoleV1,
  deleteRoleControllerDeleteRoleV1,
  updateRolesBulkControllerUpdateRolesBulkV1,
  viewRolesControllerGetRolesV1,
} from '@/client'
import type { SettingRole } from '@/models/setting-role/role.model.ts'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import { SettingRoleBulkUpdateTransformer } from '@/models/setting-role/settingRole.transformer.ts'
import type { SettingRoleBulkUpdateForm } from '@/models/setting-role/settingRoleBulkUpdateForm.model.ts'

export class SettingRoleService {
  static async create(roleName: string): Promise<void> {
    await createRoleControllerCreateRoleV1({
      body: {
        name: roleName,
      },
    })
  }

  static async delete(roleUuid: RoleUuid): Promise<void> {
    await deleteRoleControllerDeleteRoleV1({
      path: {
        role: roleUuid,
      },
    })
  }

  static async getAll(): Promise<SettingRole[]> {
    const response = await viewRolesControllerGetRolesV1({
      responseValidator: async (data) => {
        return await z.object({
          items: z.object({
            uuid: z.string().uuid(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
            isActive: z.boolean(),
            email: z.string().nullable(),
            firstName: z.string().nullable(),
            lastName: z.string().nullable(),
            phone: z.string().nullable(),
          }).array(),
        }).parseAsync(data)
      },
    })

    return response.data.items.map((contact: ContactResponse) => {
      return {
        uuid: contact.uuid as RoleUuid,
        name: `${contact.firstName} ${contact.lastName}`,
        permissions: [],
      } as SettingRole
    })
  }

  static async updateRolesInBulk(form: SettingRoleBulkUpdateForm): Promise<void> {
    await updateRolesBulkControllerUpdateRolesBulkV1({
      body: SettingRoleBulkUpdateTransformer.toDto(form),
    })
  }
}
