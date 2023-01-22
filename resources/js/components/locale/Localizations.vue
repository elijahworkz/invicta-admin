<template>
	<el-dropdown class="mr-4" @command="handleCommand">
		<el-button size="small" text type="info">
			<SvgIcon :icon="mdiTranslate" :width="15" class="mr-2" /> Language
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="locale in localizations" 
					:key="locale.iso"
					:command="locale"
					:disabled="locale.current"
					:title="localeTitle(locale)">
					<i class="icon-status" :class="{'success': locale.translation || locale.origin}"></i> {{ locale.name }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'

const props = defineProps({
	localizations: Object,
	resourceUrl: String,
})
const emit = defineEmits(['change'])

const changeLocale = (locale) => {
	emit('change', locale)
}

const origin = find(props.localizations.value, 'origin')

const localeTitle = (locale) => {

	if (locale.origin)
		return 'Original'

	if (locale.current)
		return 'Current translation'

	let action = locale.translation ? 'Edit' : 'Create'
	return `${action} ${locale.name} translation`
}

const handleCommand = (locale) => {
	console.log('handle me', locale)
	let id = locale.translation
		? locale.translation
		: (locale.origin ? locale.origin : null)
	let url = id ? `${id}/edit` : `${origin.value}/duplicate`

	console.log('getting', url)
	// Inertia.get(`${props.resourceUrl}/${url}`)
}
</script>