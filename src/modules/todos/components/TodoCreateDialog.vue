<script lang="ts" setup>
import { VcDialog, VcTextField } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import AppDialogActionCancel from '@/components/app/dialog/AppDialogActionCancel.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { toFormField } from '@/helpers/formango.helper'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import { useTodoCreateMutation } from '@/modules/todos/api/mutations/todoCreate.mutation'

const emit = defineEmits<{
    close: []
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()
const todoCreateMutation = useTodoCreateMutation()

const form = useForm({
    schema: todoCreateFormSchema,
    onSubmit: async (values) => {
        try {
            await todoCreateMutation.execute({
                body: values,
            })
            onClose()
        }
        catch (error) {
            apiErrorToast.show(error)
        }
    },
})

const title = form.register('title')
const deadline = form.register('deadline')
const description = form.register('description')

function onClose(): void {
    emit('close')
}
</script>

<template>
    <VcDialog @close="onClose">
        <AppDialogContent class="w-dialog-sm">
            <AppDialogHeader :title="i18n.t('module.todo.create_dialog.title')" />
            <div class="py-4">
                <AppForm :form="form">
                    <VcTextField :label="i18n.t('module.todo.form.fields.title')" v-bind="toFormField(title)" />
                    <VcTextField :label="i18n.t('module.todo.form.fields.deadline')" v-bind="toFormField(deadline)" />
                    <VcTextField :label="i18n.t('module.todo.form.fields.description')"
                        v-bind="toFormField(description)" />
                    <AppDialogActions>
                        <AppDialogActionCancel :label="i18n.t('shared.cancel')" @click="onClose" />
                        <FormSubmitButton :form="form" :label="i18n.t('shared.save')" />
                    </AppDialogActions>
                </AppForm>
            </div>
        </AppDialogContent>
    </VcDialog>
</template>
