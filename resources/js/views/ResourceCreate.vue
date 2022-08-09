<template>
	<Head :title="resource.name"/>
	<div class="py-6 px-10">
		<el-form
			class="invicta-form"
			label-position="top">
		<div class="flex items-end justify-between mb-4">
			<div>
				<Link :href="resource.meta.indexUrl" class="breadcrumb"><el-icon><ArrowLeft /></el-icon> {{ resource.meta.indexTitle }}</Link>
				<h1 class="mb-1">{{ resourceForm.title }}</h1>
			</div>
			<div class="resource-actions">
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
			</div>
		</div>
		<el-row :gutter="hasSidebar ? 20 : 0">
			<el-col :span="hasSidebar ? 18 : 24">
				<el-card>
					<el-tabs
						v-if="hasSections"
						v-model="activeTab"
						v-bind="blueprint.settings.tabs">
						<el-tab-pane 
							v-for="section in blueprint.sections"
							:label="section.title"
							:name="section.id">
							<div class="fieldset" v-if="section.fields">
								<FormField v-for="(field, index) in section.fields" :field-data="field" :data-path="field.id"/>
							</div>
					</el-tab-pane>
					</el-tabs>
					<div v-else>
						<div class="fieldset" v-if="blueprint.fields">
							<FormField v-for="(field, index) in blueprint.fields" :field-data="field" :data-path="field.id"/>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col v-if="hasSidebar" :span="6">
				<el-card>
					<div class="fieldset" v-if="blueprint.sidebar.fields">
						<FormField v-for="(field, index) in blueprint.sidebar.fields" :field-data="field" :data-path="field.id"/>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import has from 'lodash/has'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import { useResourceForm } from '@/services/form'
import FormField from '@/components/form/FormField.vue'
import { Back, ArrowLeft, Plus, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	resource: Object
})

const { blueprint } = props.resource
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

const blueprint_back = {
	settings: {
		tabs: {
			stretch: false,
			tabPosition: 'top',
		}
	},
	sections: [
		{ 
			id: 'main', 
			title: 'Main',
			fields: [
				{
					type: 'row',
					fields: [
						{
							id: 'email',
							type: 'text',
							width: '1/3',
						},
						{
							id: 'created_at',
							label: 'Created',
							type: 'text',
							width: '2/3',
							if: {
								id: 'email',
								operator: '==',
								value: 'annap@eteachergroup.com'
							}
						},
					]
				},
				{
					type: 'divider',
					section: true,
					test: 'Section Title',
					content: {
						title: 'Section Title',
						description: 'This is section description'
					}
				},
				{
					id: 'groups',
					type: 'related',
					stack: false,
					optionsLabel: 'title',
					props: {
						multiple: true
					}
				},
				{
					type: 'divider',
					content: 'test',
					props: {
						contentPosition: 'left'
					}
				},
				{
					id: 'favorite_campaigns',
					type: 'repeater',
					title: 'social',
					fields: [
						{
							type: 'row',
							fields: [
								{
									id: 'profile',
									type: 'text',
									width: '1/3'
								},
								{
									id: 'social',
									type: 'text',
									width: '1/3'
								},
								{
									id: 'meta',
									type: 'text',
									width: '1/3'
								}
							]
						},
						{
							id: 'my_group',
							type: 'group',
							fields: [
								{
									id: 'name',
									type: 'text'
								},
								{
									id: 'title',
									type: 'text'
								}
							]
						}
					]
				},				
				{
					id: 'data',
					type: 'group',
					fields: [
						{
							id: 'meta',
							type: 'group',
							seamless: false,
							info: 'I am not sure why this is needed',
							fields: [
								{
									type: 'row',
									fields: [
										{
											id: 'profile',
											type: 'text',
											width: '3/4'
										},
										{
											id: 'social',
											type: 'text',
											width: '1/4'
										}
									]
								},
							]
						}
					]
				},

			]
		},
		{ 
			id: 'comment', 
			title: 'Comments',
			fields: [
				{
					id: 'test',
					type: 'textarea',
					width: '1/2',
				},
				// {
				// 	id: 'test_data',
				// 	type: 'group',
				// 	seamless: false,
				// 	fields: [
				// 		{
				// 			id: 'meta',
				// 			type: 'group',
				// 			fields: [
				// 				{
				// 					id: 'profile',
				// 					type: 'text',
				// 				},
				// 				{
				// 					id: 'social',
				// 					type: 'text'
				// 				}
				// 			]
				// 		}
				// 	]
				// },
			]
		},
		{ id: 'seo', title: 'Seo' },
		{ id: 'seo1', title: 'Course' },
		{ id: 'seo2', title: 'News' },
		{ id: 'seo3', title: 'Stuff' },
		{ id: 'seo4', title: 'ANother form' },
		{ id: 'seo5', title: 'Api settings' },
	],
	sidebar: {
		fields: [
			{
				id: 'name',
				label: 'User Name',
				type: 'text',
				info: 'some important information',
				props: {
					clearable: true
				}
			}
		]
	}
}

const hasSections = has(blueprint, 'sections')
const activeTab = hasSections && blueprint.sections.length
	? ref(blueprint.sections[0].id)
	: null
const hasSidebar = has(blueprint, 'sidebar');

resourceForm.init(props.resource)

const { pageUrl } = usePage().props.value

const submit = () => {

	// const form = useForm(resourceForm.data)
	resourceForm.form.post(pageUrl)
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