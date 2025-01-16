<template>
	<el-tooltip content="Stop impersonating">
		<a :href="impersonateRoute" class="text-red-600 mr-4">
	        <SvgIcon :icon="mdiDominoMask" />
	    </a>
	</el-tooltip>
</template>

<script setup>
import { mdiDominoMask } from '@mdi/js'

const impersonateRoute = Invicta.getConfig('impersonateRoute')
</script>