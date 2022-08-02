import { computed } from 'vue'
import { useResourceForm } from '@/services/form'
import { IFormField } from '@/interfaces'
import has from 'lodash/has'
import get from 'lodash/get'
import startCase from 'lodash/startCase'

const resourceForm = useResourceForm()

export const useFormField = (props: { data: IFormField, path: string }) => {

    const field: IFormField = props.data

    const value = (defaultValue: any = null, cb: Function | null = null) => {
        const { path } = props

        return computed({
            get() {
                return resourceForm.get(path) || defaultValue
            },
            set(value) {
                value = (cb) ? cb(value) : value
                resourceForm.set(path, value)
            }
        })
    }
    
    return {
        has(param: string) {
            return has(field, param)
        },

        check(param: string, value: any) {
            return get(field, param) == value
        },

        get(param: string, ifNull?: any) {
            return get(field, param, ifNull)
        },

        label() {
            if (has(field, 'label'))
                return field.label

            let id: string = field.id.split('.').pop() || field.id

            return startCase(id)
        },

        info() {
            get(field, 'info', false)
        },

        value
    }
}

