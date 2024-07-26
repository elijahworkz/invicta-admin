<template>
  <div
    @click="toggle"
    ref="trigger"
    class="popover-trigger"
    aria-haspopup="true"
    :aria-expanded="isOpen"
  >
    <slot name="trigger" />
  </div>
  <Teleport to="#poppers">
    <div
      ref="popover"
      class="popover"
      :class="{ open: isOpen }"
      v-if="!disabled"
    >
      <div class="popover-content">
        <slot :close="close" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  createPopperLite as createPopper,
  flip,
  preventOverflow,
} from "@popperjs/core";
// import flip from '@popperjs/core/lib/modifiers/flip'
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow' '@popperjs/core/lib/modifiers/preventOverflow'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: "bottom-end",
  },
});

const isOpen = ref(false);
const trigger = ref();
const popover = ref();
let popoverInstance; // = ref()

onMounted(() => {
  if (!props.disabled) bindPopper();
});

const open = () => {
  isOpen.value = true;
  popoverInstance.update();
};
const close = () => (isOpen.value = false);
const toggle = () => (isOpen.value ? close() : open());

onKeyStroke("esc", (e) => {
  e.preventDefault();
  close();
});

function bindPopper() {
  popoverInstance = createPopper(trigger.value, popover.value, {
    placement: props.placement,
    modifiers: [flip, preventOverflow],
  });
}

onClickOutside(popover, () => close());
</script>
