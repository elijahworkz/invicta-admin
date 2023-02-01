<template>
	<Head :title="resource.title"/>
	<div class="py-6 px-10">
		<div class="flex items-end justify-start mb-4">
			<div>
				<h1 class="mb-1">{{ resource.title }}</h1>
			</div>
			<div class="ml-auto">
				<el-button><Link :href="`${resource.indexUrl}`">Cancel</Link></el-button>
				<el-button type="primary" @click="saveOrder">Save Order</el-button>
			</div>
		</div>
		<el-card body-style="padding: 10px 0 0" class="">
			<table class="sort-table">
				<thead>
					<tr>
						<th></th>
						<th v-for="column in resource.columns" :width="column.width" :class="column.headerAlign">
							{{ column.label }}
						</th>
					</tr>
				</thead>
				<draggable
					:list="resource.data"
					tag="tbody"
					handle=".drag-handle"
					item-key="index"
					class="items-stack w-full">
					<template #item="{element, index}">
						<tr>
							<td class="drag-cell"><DragHandle /></td>
							<td v-for="(column, index) in resource.columns" :class="column.align">
								<i v-if="column.boolean" class="icon-status" :class="{ 'success' : element[index] == 1 }"></i>
								<span v-else>{{ element[index] }}</span>
							</td>
						</tr>
					</template>
				</draggable>
			</table>
		</el-card>
	</div>
</template>

<script setup>
import draggable from 'vuedraggable'

const props = defineProps({
	resource: Object
})

const { pageUrl } = usePage().props

function saveOrder() {
	let newOrder = props.resource.data.map((item, index) => {
		return { id: item.id, order: parseInt(`1100${index}`)}
	})
	
	router.post(pageUrl, { order: newOrder })
}
</script>

<style lang="scss">
.sort-table {
	width: 100%;
	
	thead {
		color: var(--el-text-color-regular);
		padding: 20px;
	}

	th, td {
		padding: 10px 0;
		border-bottom: 1px solid var(--el-border-color-lighter);
		line-height: 1;
		text-align: start;

		&.center {
			text-align: center;
		}

		&.left {
			text-align: start;
		}

		&.right {
			text-align: end;
		}
	}

	tr {
		&:hover {
			background: var(--el-fill-color-light);
		}
	}

	.drag-cell {
		width: 25px;
		text-align: center;
		background: var(--el-fill-color-light);

		.drag-handle {
			opacity: .5;
			svg {
				margin: 0 auto;
			}
		}
	}
}
</style>