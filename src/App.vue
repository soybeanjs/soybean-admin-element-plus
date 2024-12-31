<script setup lang="ts">
import { computed } from 'vue';
import type { WatermarkProps } from 'element-plus';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { UILocales } from './locales/ui';

defineOptions({ name: 'App' });

const appStore = useAppStore();
const themeStore = useThemeStore();

const locale = computed(() => {
  return UILocales[appStore.locale];
});

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark.text || 'SoybeanAdmin',
    cross: true,
    fontSize: 16,
    lineHeight: 16,
    gap: [100, 120],
    rotate: -15,
    zIndex: 9999
  };
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <ElWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps">
        <RouterView class="bg-layout" />
      </ElWatermark>
      <RouterView v-else class="bg-layout" />
    </AppProvider>
  </ElConfigProvider>
</template>

<style scoped></style>
