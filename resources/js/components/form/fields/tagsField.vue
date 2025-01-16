<template>
	<FieldBase :form-id="formId" :field-props="props">
		<div class="tags-field">
			<div class="flex items-center mb-3">
				<el-input v-model="newTag" placeholder="Add Tag..." class="mr-2" @keydown="handleEnter" />
			</div>
			<div class="tags-list" v-if="fieldValue.length">		
				<span class="tag" v-for="(tag, index) in fieldValue" :key="index">
					<span>{{ tag }}</span>
					<el-icon class="remove-tag" @click="removeTag(tag)" title="Remove Tag"><Close/></el-icon>
				</span>
			</div>
		</div>
	</FieldBase>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	data: Object,
	path: String
})
const field = useFormField(props)
const fieldValue = field.value([])

const newTag = ref('')

const addTag = () => {
	let tag = newTag.value.trim()
	if (tag.length === 0 || fieldValue.value.includes(tag)) {
		return
	}
	fieldValue.value = [...fieldValue.value, tag]
	newTag.value = ''
}

const removeTag = (tag) => {
	fieldValue.value = fieldValue.value.filter(t => t !== tag)
}

const handleEnter = (event) => {
	if (event.keyCode === 13) {
		event.stopPropagation()
		addTag()
	}
}
</script>

<style lang="scss">
.tags-input {
	display: flex;
	flex-wrap: wrap;
	background-color: #fff;
	border-width: 1px;
	border-radius: .25rem;
	padding-left: .5rem;
	padding-right: 1rem;
	padding-top: .5rem;
	padding-bottom: .25rem;
	


	.tag-input {
		flex: 1;
		outline: 0;
		padding-top: .25rem;
		padding-bottom: .25rem;
		margin-left: .5rem;
		margin-bottom: .25rem;
		min-width: 10rem;
	}
}
.tags-list {
	.tag {
		line-height: 1;
		display: inline-flex;
		align-items: center;
		background-color: var(--el-color-primary-light-8);
		border-radius: .25rem;
		user-select: none;
		padding: 0.5rem 0.3rem 0.5rem 0.6rem;
		margin-right: .5rem;
		margin-bottom: .25rem;
		
		&:last-of-type {
			margin-right: 0;
		}
	}

	.remove-tag {
		color: var(--el-color-primary);
		line-height: 1;
		margin-left: .25rem;
		cursor: pointer;

		&:focus {
			outline: 0;
		}
	}	
}
</style>