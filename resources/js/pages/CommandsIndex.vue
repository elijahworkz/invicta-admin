<template>
    <div class="py-6 px-10 max-w-5xl mx-auto">
        <div class="mb-4">
            <h1>Registered Commands</h1>
            <p class="info">List of registered artisan, or shell commands</p>
        </div>

        <template v-for="command in commands">
            <Command :data="command" class="mb-4" />
        </template>
    </div>
</template>

<script setup>
defineOptions({
    beforeRouteEnter: async function (to) {
        let data = await Invicta.fetch.get(`api${to.path}`);
        to.meta.data = data;
    },
});

defineProps({
    commands: Array,
});

Invicta.pageTitle("Commands");
</script>

<style lang="scss">
.command {
    svg {
        width: 24px;
    }
}
.output {
    .terminal {
        background: #313f46;
        color: #e6e6e6;
        border-radius: 6px;
        padding: 10px;

        &.error {
            background: var(--el-color-danger);
            color: #fff;
        }
    }
}
</style>
