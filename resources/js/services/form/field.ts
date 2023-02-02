import { IFormField } from '@/interfaces'

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
            }
        })
    }

    const isReadOnly = computed(() => {

        if (resourceForm.readOnly)
            return true

        if (field.readOnly) {
            if (typeof field.readOnly === 'boolean') {
                return field.readOnly
            } else {
                return useFieldCondition(field.readOnly, props.formId).value
            }
        }
        return false
    })
    
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
            
            let readOnlyString = isReadOnly.value
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

        value,

        disabled: isReadOnly.value
    }
}

