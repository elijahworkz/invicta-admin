<template>
	<Header/>
	<div class="app-body">
		<aside class="app-sidebar"><Sidebar/></aside>
		<main class="app-main">
			<el-scrollbar>
				<slot  />
			</el-scrollbar>
		</main>
	</div>
</template>