<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue';
import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';

defineOptions({ name: 'TypeIt' });

const textRef = shallowRef<El>();

function init() {
  if (!textRef.value) return;

  const options: Options = {
    strings: 'SoybeanAdmin是一个清新优雅、高颜值且功能强大的后台管理模板',
    lifeLike: true,
    speed: 120,
    loop: true
  };

  const initTypeIt = new TypeIt(textRef.value, options);

  initTypeIt.go();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <ElCard header="打字机 插件" class="h-full card-wrapper">
      <ElSpace direction="vertical">
        <GithubLink link="https://github.com/alexmacarthur/typeit" />
        <WebSiteLink label="文档地址：" link="https://www.typeitjs.com/docs/vanilla/usage/" />
      </ElSpace>
      <ElDivider content-position="left">基本示例</ElDivider>
      <span ref="textRef" class="text-18px"></span>
    </ElCard>
  </div>
</template>

<style scoped></style>
