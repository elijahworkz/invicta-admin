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
					<i class="icon-status" :class="{'success': locale.translation || locale.origin}"></i> <span class="ml-2">{{ locale.name }}</span>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
	localizations: Object,
	formId: String,
	resourceUrl: String,
})

const resourceForm = useResourceForm(props.formId)

const origin = computed(() => {
	let { localizations } = props
	return Object.values(localizations).filter((l) => {
		return l.origin !== null
	})[0].origin
})

const currentLocale = Object.values(props.localizations).filter((l) => l.current)[0].iso
resourceForm.setLocale(currentLocale)

const localeTitle = (locale) => {

	if (locale.origin)
		return 'Original'

	if (locale.current)
		return 'Current translation'

	let action = locale.translation ? 'Edit' : 'Create'
	return `${action} ${locale.name} translation`
}

const handleCommand = (locale) => {
	let id = locale.translation
		? locale.translation
		: (locale.origin ? locale.origin : null)

	let handle = resourceForm.settings.handle

	if (id) {
		router.push({ name: 'resourceEdit', params: { id, handle }})
	} else {

		Invicta.axios.post(`/api/resource/${handle}/${origin.value}/localize/${locale.iso}`)
			.then(({data}) => {
				console.log('I have created localized version of this page', data)
				router.push({ name: 'resourceEdit', params: { id: data, handle}})
			})
	}
}
</script>