import { computed } from 'vue'
import { useResourceForm } from '@/services/form'
import { IFormField } from '@/interfaces'
import has from 'lodash/has'
import get from 'lodash/get'
import startCase from 'lodash/startCase'

export const useFormField = (props: { formId: string, data: IFormField, path: string }) => {
    
    const resourceForm = useResourceForm(props.formId)

    const field: IFormField = props.data

    const value = (defaultValue: any = null, cb: Function | null = null) => {

        const { path } = 'path' in props.data ? props.data : props

        return computed({
            get() {
                return resourceForm.get(path) || defaultValue
            },
            set(value) {
                console.log('setting field', path, value)

                value = (cb) ? cb(value) : value
                resourceForm.set(path, value)

                // if (!defaultValue) {
                //     resourceForm.dirty = true
                // }
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

        label(readOnly = false) {
            
            let readOnlyString = readOnly 
                ? ' <span>Read Only</span>'
                : ''

            if (has(field, 'label'))
                return `${field.label}${readOnlyString}`

            let id: string = field.id.split('.').pop() || field.id

            return `${startCase(id)}${readOnlyString}`
        },

        info() {
            get(field, 'info', false)
        },

        value
    }
}

