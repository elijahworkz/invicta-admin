<template>
  <div class="actions-popover flex items-center">
    <Popover>
      <template #trigger>
        <span title="More actions" class="action-icon">
          <SvgIcon :icon="mdiDotsHorizontal" :width="18" />
        </span>
      </template>
      <template #default="{ close }">
        <template v-if="title">
          <p class="text-center my-2 opacity-60">{{ title }}</p>
          <div class="divider"></div>
        </template>
        <ul>
          <template v-for="action in actions">
            <li
              @click="
                handleActionClick(action);
                close();
              "
              class="el-dropdown-menu__item"
              :class="{ danger: action.danger }"
            >
              {{ action.name }}
            </li>
            <li v-if="action.divider" class="divider"></li>
          </template>
        </ul>
      </template>
    </Popover>
  </div>
</template>

<script setup>
import { mdiDotsHorizontal } from "@mdi/js";

const props = defineProps({
  actions: Array,
  item: Number | Object,
  title: String,
});
const emit = defineEmits(["close", "selected"]);

const handleActionClick = (event) => {
  console.log("inside actions dropdown", event);
  let action = "action" in event ? event.action : event;
  emit("selected", { action, item: props.item });
};
</script>
