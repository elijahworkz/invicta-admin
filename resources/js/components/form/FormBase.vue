<template>
	<el-form
		class="invicta-form"
		:class="[formSettings.class || 'w-3/4']"
		v-bind="formSettings">
		<div class="flex items-end justify-between mb-4">
			<div>
				<Link v-if="breadcrumb"
					:href="breadcrumb.url" 
					class="breadcrumb">
					<el-icon><ArrowLeft /></el-icon> {{ breadcrumb.text }}</Link>
				<h1 class="mb-1">{{ resourceForm.title }}</h1>
			</div>
			<div class="resource-actions">
				<slot name="form-actions"/>
				<el-button-group>
					<el-button 
						type="primary" 
						@click="submit"
						:disabled="resourceForm.form.processing">{{ postSubmitData[postSubmitAction].button }}</el-button>
					<el-popover title="After Saving" :teleported="false">
						<template #reference>
							<el-button type="primary" :icon="postSubmitData[postSubmitAction].icon"></el-button>
						</template>
						<el-radio-group v-model="postSubmitAction">
							<el-radio v-for="action in postSubmitActions"
								:label="action">{{ postSubmitData[action].option}}</el-radio>
						</el-radio-group>
					</el-popover>
				</el-button-group>
			</div>
		</div>

		<div class="form-wrapper" :class="{'card': tabsType == 'card'}">
			<div class="main-panel" :class="{'el-card is-always-shadow': !hasSections}">
				<!-- <el-card> -->
					<el-tabs
						v-if="hasSections"
						v-model="activeTab"
						type="card"
						v-bind="blueprint.settings.tabs">
						<el-tab-pane 
							v-for="section in blueprint.sections"
							:label="section.title"
							:name="section.id">
							<div class="fieldset" v-if="section.fields">
								<FormField 
									v-for="(field, index) in section.fields" 
									:form-id="formId"
									:field-data="field" 
									:data-path="field.id"/>
							</div>
						</el-tab-pane>
					</el-tabs>
					<div v-else>
						<div class="fieldset" v-if="blueprint.fields">
							<FormField 
								v-for="(field, index) in blueprint.fields"
								:form-id="formId"
								:field-data="field" 
								:data-path="field.id"/>
						</div>
					</div>
				<!-- </el-card> -->
			</div>
			<div v-if="hasSidebar" class="sidebar">
				<el-card>
					<div class="fieldset" v-if="blueprint.sidebar.fields">
						<FormField 
							v-for="(field, index) in blueprint.sidebar.fields"
							:form-id="formId"
							:field-data="field" 
							:data-path="field.id"/>
					</div>
				</el-card>
			</div>
		</div>
	</el-form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useResourceForm } from '@/services/form'
import has from 'lodash/has'
import get from 'lodash/get'
import FormField from './FormField.vue'
import { ArrowLeft, Close, Plus, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	resource: Object,
	breadcrumb: Object,
	actionUrl: String,
	postSubmitActions: {
		type: Array,
		default: ['back', 'edit', 'create']
	}
})

const resourceForm = useResourceForm(props.formId)
resourceForm.init(props.resource, props.actionUrl)

/* Layout setup */
const { blueprint } = props.resource
const formSettings = get(blueprint.settings, 'form', {'label-position': 'top'})

// Setup sections and active tab
const hasSections = has(blueprint, 'sections')
let activeTab = null
let tabsType = null

if (hasSections && blueprint.sections.length) {
	if ('tabs' in blueprint.settings) {
		if ('active' in blueprint.settings.tabs) {
			activeTab = ref(blueprint.settings.tabs.active)
		}

		tabsType = ('type' in blueprint.settings.tabs)
			? blueprint.settings.tabs.type
			: 'card'
	} else {
		activeTab = ref(blueprint.sections[0].id)
	}
}
const hasSidebar = has(blueprint, 'sidebar');

/* Post Submit options setup */
const postSubmitAction = ref(props.postSubmitActions[0])
const postSubmitData = {
	back: { icon: ArrowLeft, button: 'Save & Back', option: 'Go back'},
	close: { icon: Close, button: 'Save & Close', option: 'Close Form'},
	edit: { icon: ArrowDown, button: 'Save & Stay', option: 'Continue Editing'},
	create: { icon: Plus, button: 'Save & New', option: 'Add New Item'},
}

const submit = () => {
	resourceForm.submit(postSubmitAction.value)
}
</script>

<style lang="scss">
.resource-actions {
	.el-button-group {
		.el-tooltip__trigger.el-button {
			padding: 8px;
			border-top-right-radius: var(--el-border-radius-base);
			border-bottom-right-radius: var(--el-border-radius-base);
		}
	}
}
</style>