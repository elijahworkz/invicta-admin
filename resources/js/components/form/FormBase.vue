<template>
	<el-form
		class="invicta-form"
		label-position="top">

		<div class="flex items-end justify-between mb-4">
			<slot name="form-title"/>
			<div class="resource-actions">
				<slot name="form-actions"/>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import has from 'lodash/has'
import FormField from './FormField.vue'

const props = defineProps({
	blueprint: Object
})

const { blueprint } = props
const hasSections = has(blueprint, 'sections')
const activeTab = hasSections && blueprint.sections.length
	? ref(blueprint.sections[0].id)
	: null
const hasSidebar = has(blueprint, 'sidebar');
</script>