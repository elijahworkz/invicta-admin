<template>
<Drawer 
    v-if="open" 
    @close="open = false" 
    :style="{ width: context == 'assets' ? '80%' : '500px' }">
    
    <AssetSelector
        v-if="context == 'assets'"
        @selected="selectAsset"
        @cancel="open = false" />

    <ItemsSelector
        v-if="context == 'items'"
        :single-select="true"
        :select="['uri']"
        :columns="columns"
        :resources="resourcesForLinks"
        @selected="selectItem"
        @cancel="open = false" />			
</Drawer>
</template>

<script setup>
const props = defineProps({
    formId: String
})

/* Get Resources for Links */
const resourceForm = useResourceForm(props.formId);
const resourcesForLinks = computed(() => resourceForm.remoteData.get('textEditor'))

const open = ref(false)
const context = ref('assets')

/* Setup Insert Internal links */
const columns = {
    title: { label: 'Title', sortable: true },
    uri: { label: 'Uri' }
}

let selectEvent = 'media-item-select'
Invicta.on('open-media-library', (event) => {
    selectEvent = event.name
    context.value = 'assets'
    open.value = true
})

Invicta.on('open-resource-links', (event) => {
    selectEvent = event.name
    context.value = 'items'
    open.value = true
})

function selectAsset(asset) {
    console.log('selecting asset', asset, selectEvent)
    Invicta.emit(selectEvent, asset)
    open.value = false
}

function selectItem(item) {
    Invicta.emit(selectEvent, item)
    open.value = false
}

</script>
