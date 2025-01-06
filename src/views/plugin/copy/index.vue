<script lang="ts" setup>
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';

defineOptions({ name: 'CopyPage' });

const { copy, isSupported } = useClipboard();

const source = ref('');

async function handleCopy() {
  if (!isSupported) {
    window.$message?.error('您的浏览器不支持Clipboard API');
    return;
  }

  if (!source.value) {
    window.$message?.error('请输入要复制的内容');
    return;
  }

  await copy(source.value);
  window.$message?.success(`复制成功：${source.value}`);
}
</script>

<template>
  <div class="h-full">
    <ElCard header="文本复制" class="h-full card-wrapper">
      <ElInput v-model="source" placeholder="请输入要复制的内容吧">
        <template #append>
          <ElButton type="primary" @click="handleCopy">复制</ElButton>
        </template>
      </ElInput>
    </ElCard>
  </div>
</template>
