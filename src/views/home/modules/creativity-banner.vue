<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({ name: 'CreativityBanner' });
</script>

<template>
  <ElCard :header="$t('page.home.creativity')" class="h-full card-wrapper">
    <div class="h-full flex-center">
      <icon-local-banner class="text-400px text-primary sm:text-320px" />
    </div>
  </ElCard>
</template>

<style scoped></style>
