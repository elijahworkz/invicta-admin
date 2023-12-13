<template>
  <el-tooltip
      v-if="canCopy && isSupported"
      class="box-item"
      effect="dark"
      content="Right Top prompts info"
      placement="left"
  >
    <template #content>
      <el-button :icon="DocumentCopy" @click="copy(innerText()); success()" v-if="! copied" title="Click to copy to clipboard"/>
      <el-button :icon="Check" type="success" v-else @click="copied = false" />
    </template>

    <div v-html="text"/>

  </el-tooltip>

  <div v-else v-html="text"/>
</template>

<script setup>
import {Check, DocumentCopy} from '@element-plus/icons-vue'

const props = defineProps({
	text: String,
	canCopy: Boolean
})

const { copy, copied, isSupported } = useClipboard()

function success() {
  Invicta.message({type:'success', title: 'Copied to clipboard!'})
}

function innerText() {
  const re =/.+class=".*copy[^\>]+>([^\<]+)<\//

  let found = props.text.match(re)

  let text = props.text.replace(/<[^>]*>/g, "")

  if (found && found[1]) {
    text = found[1].replace(/<[^>]*>/g, "");
  }

  return text
}
</script>