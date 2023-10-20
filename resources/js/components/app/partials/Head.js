<script setup>
const props = defineProps({
	title: {
		type: String,
		default: 'Home'
	}
})
useTitle(props.title, { titleTemplate: '%s - Ibc Admin' })
</script>