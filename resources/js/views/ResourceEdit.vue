<template>
	<Head :title="resource.name"/>
	<div class="py-6 px-10">
		<FormBase :blueprint="resource.blueprint">
			<template #form-title>
				<div>
					<Link :href="resource.meta.indexUrl" class="breadcrumb"><el-icon><ArrowLeft /></el-icon> {{ resource.meta.indexTitle }}</Link>
					<h1 class="mb-1">{{ resourceForm.title }}</h1>
				</div>
			</template>

			<template #form-actions>
				<el-button-group>
					<el-button type="primary" @click="submit" :disabled="resourceForm.form.processing">{{ postSubmitData.text }}</el-button>
					<el-popover title="After Saving">
						<template #reference>
							<el-button class="p-2" type="primary" :icon="postSubmitData.icon"></el-button>
						</template>
						<el-radio-group v-model="postSubmitAction">
							<el-radio label="back">Go back to Index</el-radio>
							<el-radio label="stay">Continue Editing</el-radio>
							<el-radio label="create">Add New Item</el-radio>
						</el-radio-group>
					</el-popover>
				</el-button-group>
			</template>
		</FormBase>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import { useResourceForm } from '@/services/form'
import FormBase from '@/components/form/FormBase.vue'
import { Back, ArrowLeft, Plus, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object
})

const resourceForm = useResourceForm()

const postSubmitAction = ref('back')
const postSubmitData = computed(() => {
	switch (postSubmitAction.value) {
		case 'back':
			return { icon: ArrowLeft, text: 'Save & Back'}
		case 'stay':
			return { icon: ArrowDown, text: 'Save & Stay'}
		case 'create':
			return { icon: Plus, text: 'Save & New'}
	}
})

// const hasSections = has(blueprint, 'sections')
// const activeTab = hasSections && blueprint.sections.length
// 	? ref(blueprint.sections[0].id)
// 	: null
// const hasSidebar = has(blueprint, 'sidebar');

resourceForm.init(props.resource)

const { pageUrl } = usePage().props.value

const submit = () => {
	Invicta.axios.post(pageUrl, resourceForm.form)
	// const form = useForm(resourceForm.data)
	// resourceForm.form.post(pageUrl)
}

</script>

<style lang="scss">
.resource-actions {
	.el-button-group {
		.el-tooltip__trigger {
			padding: 8px;
		}
	}
}
</style>