<script setup lang="ts">
import { actionDelegationMiddleware, useAutoRequest } from '@sa/alova/client';
import { ref } from 'vue';
import { alova } from '@/service-alova/request';

const getLastTime = alova.Get<{ time: string }>('/mock/getLastTime', { cacheFor: null });
const isStop = ref(false);
const { loading, data } = useAutoRequest(getLastTime, {
  enableVisibility: true,
  enableNetwork: false,
  enableFocus: false,
  initialData: { time: '' },
  async middleware(_, next) {
    await actionDelegationMiddleware('autoRequest:1')(_, () => Promise.resolve());
    if (!isStop.value) {
      next();
    }
  }
});

const toggleStop = () => {
  isStop.value = !isStop.value;
};
</script>

<template>
  <ElSpace direction="vertical" fill>
    <ElAlert type="info" show-icon>{{ $t('page.alova.scenes.visibilityRequestTips') }}</ElAlert>
    <ElButton type="primary" @click="toggleStop">
      <icon-carbon-play v-if="isStop" class="mr-2" />
      <icon-carbon-stop v-else class="mr-2" />
      {{ isStop ? $t('page.alova.scenes.startRequest') : $t('page.alova.scenes.stopRequest') }}
    </ElButton>
    <ElSpace class="justify-center">
      <span>{{ $t('page.alova.scenes.refreshTime') }}: {{ data.time || '--' }}</span>
      <SvgIcon v-if="loading" icon="line-md:loading-twotone-loop" class="text-20px" />
    </ElSpace>
  </ElSpace>
</template>
