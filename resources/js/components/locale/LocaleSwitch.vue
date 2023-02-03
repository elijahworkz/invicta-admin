<template>
	<el-dropdown class="mr-4" @command="changeLocale">
		<el-button size="small" text type="info">
			<SvgIcon :icon="mdiTranslate" :width="15" class="mr-2" /> Language
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="locale in locales" 
					:key="locale.iso"
					:command="locale.iso"
					:disabled="locale.current">
					{{ locale.name }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js'

defineProps({
	locales: Object
})
const emit = defineEmits(['change'])

const changeLocale = (locale) => {
	emit('change', locale)
}
</script>