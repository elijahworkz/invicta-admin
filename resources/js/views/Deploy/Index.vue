<template>
	<Head title="Cache"/>
	<div class="py-6 px-10">

		<h1 class="mb-4">Site Deployment</h1>
		<Loading v-if="loadingEnvironment" />

		<el-card v-else>
			<table class="data-table">
				<tbody>
						<tr>
							<td class="w-64 font-bold">
								<el-tooltip content="Environment status">
									<span class="little-dot mr-1" :class="envHealth.Health"></span>
									Health: {{ envHealth.HealthStatus }} | {{ envHealth.Status }}
								</el-tooltip>
							</td>
							<td class="text-center">
								<el-tooltip content="Current Version">
								<!-- <loading-graphic text="Deploying" :inline="true" v-if="isDeploying" /> -->
								<span>{{ envHealth.VersionLabel }}</span>
							</el-tooltip>
							</td>
							<td class="text-right">{{ date(envHealth.DateUpdated) }}</td>
						</tr>
				</tbody>
			</table>
		</el-card>


		<h2 class="mt-4">Last 5 deployments</h2>
		<Loading v-if="loadingVersions"/>
		<div class="card p-0 mt-1" v-else>
			<table class="data-table">
				<tbody>
					<tr v-for="(version, index) in appVersions" :key="version.VersionLabel">
						<td><span class="text-2xs">Version:</span> {{ version.VersionLabel }}</td>
						<td class="text-right">{{ fromNow(version.DateCreated) }}</td>
						<td class="actions-column">
<!-- 							<dropdown-list>
								<dropdown-item
									:text="__('Source info')"
									@click="modalContent = version.SourceBundle; modalOpen = true"
								/>
								</dropdown-item>
								<dropdown-item
									v-if="envHealth.VersionLabel != version.VersionLabel" 
									:text="__('Redeploy')" 
									@click="runDeployCommand(version.VersionLabel)"
								/>
							</dropdown-list> -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { date, fromNow } from '@/utils/functions'

const loadingEnvironment = ref(false)
const loadingVersions = ref(false)

const envHealth = ref({})
const appVersions = ref([])

loadEnvironment()
loadVersions()

function loadEnvironment() {
	loadingEnvironment.value = true
	Invicta.axios.get('deploy/status')
		.then(({data}) => {
			console.log('I got something', data)
			envHealth.value = data
			loadingEnvironment.value = false
		})
}

function loadVersions() {
	loadingVersions.value = true
	Invicta.axios.get('deploy/versions')
		.then(({data}) => {
			appVersions.value = data
			loadingVersions.value = false
		})
}
</script>