<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import HeaderBanner from './modules/header-banner.vue';
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import CreativityBanner from './modules/creativity-banner.vue';

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <ElSpace direction="vertical" fill class="full-space pb-0" :size="0">
    <HeaderBanner class="mb-16px" />
    <CardData class="mb-16px" />
    <ElRow :gutter="gap" class="w-full">
      <ElCol :lg="14" :sm="24" class="mb-16px">
        <LineChart />
      </ElCol>
      <ElCol :lg="10" :sm="24" class="mb-16px">
        <PieChart />
      </ElCol>
    </ElRow>
    <ElRow :gutter="gap">
      <ElCol :lg="14" :sm="24" class="mb-16px">
        <ProjectNews />
      </ElCol>
      <ElCol :lg="10" :sm="24" class="mb-16px">
        <CreativityBanner />
      </ElCol>
    </ElRow>
  </ElSpace>
</template>

<style scoped lang="scss">
.full-space {
  > :deep(.el-space__item) {
    width: 100%;
  }
}
</style>
