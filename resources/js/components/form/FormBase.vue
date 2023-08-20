<template>
	<el-form
		class="invicta-form"
		:class="formClass"
		v-bind="formSettings">
		<div class="flex items-end justify-between mb-4" v-if="!headless">
			<div>
				<BackLink v-if="breadcrumb" class="breadcrumb" :data="breadcrumb"/>
				<h1 class="mb-1">
					<a v-if="resourceForm.meta.itemUrl" class="flex items-center" :href="resourceForm.meta.itemUrl" title="Visit URL" target="_blank">
						<span class="flex items-center" v-html="resourceForm.title"></span>
						<svg class="ml-2" viewBox="0 0 24 24" width="22"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path></svg>
					</a>
					<span v-else class="flex items-center" v-html="resourceForm.title"></span>
				</h1>
			</div>
			<div class="resource-actions flex items-center ml-auto">
				<Localizations 
					v-if="resourceForm.localizations"
					:localizations="resourceForm.localizations"
					:form-id="formId"
					:resource-url="resource.meta.indexUrl"/>
				<slot name="form-actions"/>
				<el-button-group class="relative">
					<el-button 
						type="primary" 
						@click="submit"
						:disabled="resourceForm.form.processing || !resourceForm.form.isDirty">
							{{ postSubmitData[postSubmitAction].button }}
					</el-button>
					<el-popover title="After Saving" :teleported="false">
						<template #reference>
							<el-button 
								:disabled="resourceForm.form.processing || !resourceForm.form.isDirty"
								type="primary" 
								:icon="postSubmitData[postSubmitAction].icon"></el-button>
						</template>
						<el-radio-group v-model="postSubmitAction">
							<el-radio v-for="action in postSubmitActions"
								:label="action">{{ postSubmitData[action].option}}</el-radio>
						</el-radio-group>
					</el-popover>
					<sup class="unsaved-indicator" v-show="resourceForm.form.isDirty"></sup>
				</el-button-group>
			</div>
		</div>

		<div class="form-wrapper" :class="{'card': tabsType == 'card'}">
			<div class="main-panel" :class="{'el-card is-always-shadow': !hasSections && !headless, 'has-sidebar': hasSidebar}">
				<!-- <el-card> -->
					<el-tabs
						v-if="hasSections"
						v-model="activeTab"
						type="border-card"
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
import { ArrowLeft, Close, Plus, ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
	formId: String,
	resource: Object,
	breadcrumb: Object,
	actionUrl: String,
	headless: {
		type: Boolean,
		default: false
	},
	postSubmitActions: {
		type: Array,
		default: ['back', 'edit', 'create']
	},
	api: Boolean | Object,
	readOnly: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['submit', 'form-ready'])

const resourceForm = useResourceForm(props.formId)
resourceForm.readOnly = props.readOnly
// const { resource } = props
// console.log('this is formbase resource', resource, toRaw(resource), toRaw(props.resource))
resourceForm.init(toRaw(props.resource), props.actionUrl, props.api)

emit('form-ready')

Invicta.on('lock-form', (formId) => {
	console.log('I hear a call to lock form', formId, props.formId)
	if (formId == props.formId) {
		resourceForm.readOnly = true
	}
})

Invicta.on('unlock-form', (formId) => {
	if (formId == props.formId) {
		resourceForm.readOnly = false
	}
})

/* Layout setup */
const blueprint = resourceForm.blueprint
const formSettings = get(blueprint.settings, 'form', {'label-position': 'top'})

// Setup sections and active tab
const hasSections = has(blueprint, 'sections')
let activeTab = ref(null)
let tabsType = null

if (hasSections && blueprint.sections.length) {
	if ('tabs' in blueprint.settings) {
		activeTab.value = ('active' in blueprint.settings.tabs)
			? blueprint.settings.tabs.active
			: blueprint.sections[0].id

		tabsType = ('type' in blueprint.settings.tabs)
			? blueprint.settings.tabs.type
			: 'border-card'
	} else {
		activeTab.value = blueprint.sections[0].id
	}
}
const hasSidebar = has(blueprint, 'sidebar');

// Set active tab from hash
onMounted(() => {
	if (window.location.hash.length > 0) {
		let hash = window.location.hash.substr(1) || '';
		activeTab.value = hash;
	}
})

watch(activeTab, (newTab) => {
	window.location.hash = newTab
})

// Set form class
const formClass = computed(() => {
	let width = props.headless
		? 'w-full'
		: (hasSidebar ? 'w-sidebar' : 'w-compact')
	return formSettings.class || width
})

/* Post Submit options setup */
const postSubmitAction = ref(props.postSubmitActions[0])
const postSubmitData = {
	back: { icon: ArrowLeft, button: 'Save & Back', option: 'Go back'},
	close: { icon: ArrowLeft, button: 'Save & Close', option: 'Close Form'},
	edit: { icon: ArrowDown, button: 'Save & Stay', option: 'Continue Editing'},
	create: { icon: Plus, button: 'Save & New', option: 'Add New Item'},
}
onMounted(() => {
	postSubmitAction.value = props.postSubmitActions.length > 1
		? Invicta.remember('post-submit-action') || props.postSubmitActions[0]
		: props.postSubmitActions[0]
})
watch(postSubmitAction, (value) => Invicta.remember('post-submit-action', value))

const submit = () => {
	resourceForm.submit(postSubmitAction.value)
}

onKeyStroke('Enter', (e) => {

	if (props.headless) {
		e.preventDefault()
		submit()
	}
})

document.addEventListener('inertia:before', resourceForm.confirmUnsavedChanges)
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

.unsaved-indicator {
	background-color: var(--el-color-danger);
	border: 1px solid var(--el-bg-color);
	height: 8px;
	width: 8px;
	border-radius: 50%;
	position: absolute;
	top: 0;
	right: 5px;
	transform: translateY(-50%) translate(100%);
	z-index: 5;
}
</style>