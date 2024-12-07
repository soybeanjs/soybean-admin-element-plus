<script setup lang="ts">
import { type Component, ref } from 'vue';
import { BaiduMap, GaodeMap, TencentMap } from './components';

defineOptions({ name: 'MapComp' });

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Map[] = [
  { id: 'gaode', label: '高德地图', component: GaodeMap },
  { id: 'tencent', label: '腾讯地图', component: TencentMap },
  { id: 'baidu', label: '百度地图', component: BaiduMap }
];

const activeMap = ref(maps[0].id);
</script>

<template>
  <div class="h-full">
    <ElCard header="地图插件" class="h-full" content-style="overflow:hidden">
      <ElTabs class="h-full">
        <ElTabPane
          v-for="item in maps"
          :key="item.id"
          v-model="activeMap"
          class="h-full"
          :value="item.id"
          :label="item.label"
          lazy
        >
          <component :is="item.component" />
        </ElTabPane>
      </ElTabs>
    </ElCard>
  </div>
</template>

<style scoped></style>
