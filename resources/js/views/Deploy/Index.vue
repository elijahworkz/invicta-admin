<template>
	<Head title="Cache"/>
	<div class="py-6 px-10">

		<div class="invicta-form w-sidebar">
			<div class="flex items-center justify-between mb-4">
				<h1>Site Deployment</h1>
				<el-button :disabled="! canDeploy" type="primary" @click="deploy" :loading="deploying">Deploy</el-button>
			</div>

			<div class="form-wrapper">
				<div class="main-panel">
					<el-card>
						<ResourceTable
							key="deployments"
							resource-handle="deployments"
							:data="deployments.data"
							:columns="columns"
							:no-actions="false"
							:single-select="true"
							:can-edit="false"
							:can-delete="true"
							:has-detail="true"
							@show="showDetails"
							@delete="handleDelete" />

						<div class="flex items-center justify-between p-3 mt-2">
							<div>Total: <strong>{{ deployments.meta.total }}</strong></div>
							<el-pagination
								background
								small
								layout="jumper, prev, pager, next, sizes"
								:current-page="deployments.meta.current_page"
								:page-size="deployments.meta.per_page"
								:total="deployments.meta.total"
								@update:page-size="deploymentsIndex.pageSizeChange"
								@update:current-page="deploymentsIndex.pageChange"
							/>
						</div>
					</el-card>
				</div>

				<div class="sidebar">
					<el-card class="p-2" shadow="never">
						<Loading type="spinner" v-if="loading" />

						<div class="px-3" v-else>
							<el-descriptions title="Last Deployment" :column="1" border>
								<template #extra>
      								<el-button size="small" :icon="Setting" @click="detailsData = null; drawer = true"></el-button>
    							</template>
								<el-descriptions-item label="Version">{{ lastDeployment.version }}</el-descriptions-item>
								<el-descriptions-item label="Created on">{{ date(lastDeployment.date) }}</el-descriptions-item>
								<el-descriptions-item label="Status">{{ lastDeployment.status }}</el-descriptions-item>
								<el-descriptions-item label="Health">{{ lastDeployment.health }}</el-descriptions-item>
							</el-descriptions>

							<!-- <el-button type="danger">Rollback</el-button> -->
						</div>
					</el-card>
				</div>
			</div>
		</div>
	<Drawer v-if="drawer" @close="drawer = false" :style="{width: 'unset'}">
		<div class="p-8">
			<el-descriptions title="Deployment Data" :column="1" border v-if="! detailsData">
				<template #extra>
					<el-button text bg circle @click="drawer = false" :icon="Close"/>
				</template>
				<el-descriptions-item v-for="(item, label) in lastDeployment.data" :label="label">
					{{ item }}
				</el-descriptions-item>
			</el-descriptions>
			<div class="details h-full" v-else>
				<div class="flex items-center justify-between mb-2">
					<h2 class="text-lg">Deployment output</h2>
					<el-button text bg circle @click="drawer = false" :icon="Close"/>
				</div>
				<div class="terminal whitespace-pre-wrap h-full overflow-auto p-3" v-html="detailsData"></div>
			</div>
		</div>
	</Drawer>
	</div>
</template>

<script setup>
import { date, fromNow, dayjs } from '@/utils/functions'
import { Close, Setting } from '@element-plus/icons-vue'

const props = defineProps({
	canDeploy: Boolean,
	deployments: Object,
	columns: Object,
})

const deploymentsIndex = useResource('deployments')

const loading = ref(false)
const deploying = ref(false)
const drawer = ref(false)
const lastDeployment = ref({})

const detailsData = ref(null)

window.Echo.channel('invicta-events')
	.listen('.deployment.finished', (e) => {
		console.log('we got some info', e)

		Invicta.message({
			type: 'info',
			title: 'Deployment finished',
			message: `Version: ${e.version}`,
		})

		router.reload()
	})

getLastDeployment()

function getLastDeployment() {
	loading.value = true
	Invicta.axios.get('api/deploy/lastDeployment')
		.then(({data}) => {
			// console.log('I got something', data)
			lastDeployment.value = data
			loading.value = false
		})
}

function deploy() {
	deploying.value = true

	let date = dayjs().format('YYYYMMDD-HHmmss')
	let version = `ibc-${date}`

	router.post(props.deployments.meta.path, {version}, {
		onSuccess() {
			deploying.value = false
		}
	})
}


function showDetails(item) {
	console.log('I am showing something here', item)
	Invicta.axios.get(`api/deploy/${item}`)
		.then(({data}) => {
			console.log('I got these details', data)
			detailsData.value = data.error !== '' ? data.error : data.output
			drawer.value = true
		})
}

/* Handle Delete Actions */
function handleDelete(selected) {
	ElMessageBox.confirm(
		'This action will permanently delete records from database. Are you sure you want to continue?',
		'Deleting',
		{
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			confirmButtonClass: 'el-button--danger'
		}
	).then(() => {
		router.delete(props.deployments.meta.path, {data: { selected }})
	})
	.catch(() => console.log('cancel'))
}
</script>

<style lang="scss">
.details {
	.terminal {
		background: #313f46;
		color: #e6e6e6;
	}
}
</style>