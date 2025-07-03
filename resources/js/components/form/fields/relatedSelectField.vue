<template>
    <FieldBase :form-id="formId" :field-props="props" class="related-field">
        <el-select v-model="fieldValue" valueKey="id" :remote-method="getRemote" :loading="loading" :teleported="false"
            :disabled="field.disabled" v-bind="data.props">
            <el-option v-for="item in relatedOptions" :key="item.key" :value="item.value" :label="item.label" />
        </el-select>
    </FieldBase>
</template>

<script setup>
const props = defineProps({
    formId: String,
    data: Object,
    path: String
})

const loading = ref(false)

const field = useFormField(props)
const fieldValue = field.value()

const resourceForm = useResourceForm(props.formId)

// console.log('I have resource form', resourceForm)
const titleField = get(props.data, 'titleField', 'title')
const remote = 'props' in props.data
    ? get(props.data.props, 'remote', false)
    : false
const relatedUrl = `/api/resource/${resourceForm.settings.handle}/relationship/${props.data.id}`

const relatedOptions = ref([])
const relatedFromValue = ref([])

onMounted(() => {

    if (remote) {
        relatedFromValue.value = relatedOptions.value = map(fieldValue.value, (item) => {
            return { key: item.id, value: { id: item.id, name: item[titleField] }, label: item[titleField] }
        })
    } else {

        let params = {
            title: titleField
        }
        params = prepareParams(params)

        getRelatedOptions(params)
    }
})

async function getRemote(query) {
    // console.log('why are you not running', query)
    if (query !== '') {
        let params = {
            title: titleField,
            search: query
        }

        params = prepareParams(params)

        await getRelatedOptions(params, true)
    } else {
        relatedOptions.value = []
    }
}

function getRelatedOptions(params, remote = false) {

    loading.value = true

    Invicta.fetch.get(relatedUrl, { params })
        .then((data) => {
            let remoteOptions = map(data, (value, label) => {
                let _value = ('path' in props.data)
                    ? Number(value)
                    : { id: Number(value) }
                return { key: value, value: _value, label: label }
            })

            if (remote) {
                relatedOptions.value = [...relatedFromValue.value, ...remoteOptions]
            } else {
                relatedOptions.value = remoteOptions
            }

            loading.value = false
        })
}

function prepareParams(params) {
    if (props.data.where) {
        // console.log('getting remote hwerde')
        params.where = props.data.where
    }

    if (props.data.sortBy) {
        params.sort_by = props.data.sortBy
    }

    if (props.data.sortOrder) {
        params.sort_order = props.data.sortOrder
    }

    return params
}
</script>

<style lang="scss">
.related-field {

    .el-select,
    .items-stack {
        width: 100%;
    }
}
</style>
