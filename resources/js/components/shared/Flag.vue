<script setup>
const props = defineProps({
    country: [String, null]
});

const unknownCountry = defineAsyncComponent(() =>
    import(`@/assets/flags/default.svg`)
)

const flag = defineAsyncComponent({
    loader: () => import(`@/assets/flags/${props.country}.svg`),
    errorComponent: unknownCountry
})
const FlagComponent = props.country ? flag : false
</script>

<template>
    <component v-if="FlagComponent" :is="FlagComponent" class="flag" />
</template>
