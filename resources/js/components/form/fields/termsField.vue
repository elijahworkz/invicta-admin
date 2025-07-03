<template>
	<FieldBase :form-id="formId" :field-props="props" class="checkbox-group stacked">
		<label 
			v-for="(item, index) in options" 
			class="el-checkbox el-checkbox--large !mx-0" 
			:class="{'is-checked': fieldValues.includes(item.id), 'primary': checkPrimary(item.id)}">

			<span class="el-checkbox__input" :class="{'is-checked': fieldValues.includes(item.id)}">
				<input 
					class="el-checkbox__original" 
					type="checkbox" 
					:value="item.id" 
					:id="`term-${item.id}`" 
					:checked="fieldValues.includes(item.id)" 
					@change="updateValue">
				<span class="el-checkbox__inner"></span>
			</span>
			<label :for="`term-${item.id}`" class="el-checkbox__label">{{ item.title }}</label>

			<span 
				v-if="data.hasPrimary && fieldValues.includes(item.id) && resourceForm.settings.mode === 'edit'"
				class="ml-auto make-primary"
				@click.prevent="makePrimary(item.id)">

				<el-tooltip :content="checkPrimary(item.id) ? 'Primary' : 'Make Primary'" placement="left">
					<SvgIcon :icon="mdiStarOutline" :width="16" class="action-icon" />
				</el-tooltip>

			</span>

		</label>
	</FieldBase>
</template>

<script setup>
import { mdiStarOutline } from '@mdi/js';

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const resourceForm = useResourceForm(props.formId)
const field = useFormField(props)
const fieldValue = field.value([])
const fieldValues = computed(() => fieldValue.value.map(item => item.id))

const updateValue = (event) => {

	let _value = parseInt(event.target.value)

	// set field value to array when creating
	if (!fieldValue.value.length) {
		fieldValue.value = []
	}

	if (! fieldValues.value.includes(_value)) {
		console.log('we should push here')
		fieldValue.value.push({ id: _value, pivot: { primary: 0 }})
	} else {
		fieldValue.value = fieldValue.value.filter(item => item.id !== _value)
	}
}

/* Primary category */
const checkPrimary = (id) => {
	let selected = fieldValue.value.filter(item => item.id == id)[0]
	if (selected) {
		return selected.pivot.primary == 1
	}

	return false
}

const makePrimary = (id) => {

	fieldValue.value = fieldValue.value.map(item => {
		item.pivot.primary = (item.id == id) ? 1 : 0

		return item
	})

	let data = {
		resource: resourceForm.settings.handle,
		resource_id: resourceForm.settings.id,
		related: props.data.id,
		term_id: id,
		sync: [...fieldValues.value]
	}

	Invicta.fetch.post(props.data.options, data)
}

/* Build list of options */
const options = ref()
// const options = computed(() => {

// 	let allOptions = resourceForm.remoteData.get('terms')

// 	// if ('resources' in props.data) {
// 	// 	console.log('want to filter', props.data.resources, allOptions)
// 	// 	return allOptions.filter(option => props.data.resources.includes(option.handle))
// 	// }

// 	return allOptions
// })
onMounted(() => {

	let resource = resourceForm.settings.handle

	Invicta.fetch.get(props.data.options, {params: {resource, locale: resourceForm.settings.currentLocale}})
		.then(({data}) => {
			console.log('I got this for categories', data)
			options.value = data
		})
})
</script>

<style lang="scss">
.checkbox-group {
	&.stacked {
		.el-checkbox {
			width: 100%;
			border-bottom: 1px solid var(--el-border-color-lighter);


			.make-primary {
				display: none;
			}

			&.is-checked {
				&:hover {
					.make-primary {
						display: block;
					}
				}
			}

			&.primary {
				font-weight: 600 !important;

				.make-primary {
					display: block;
				}
			}
		}
	}
}
</style>

