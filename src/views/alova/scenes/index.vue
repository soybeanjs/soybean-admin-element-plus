<script setup lang="ts">
import { $t } from '@/locales';
import CaptchaVerification from './modules/captcha-verification.vue';
import BrowserVisibilityRequest from './modules/browser-visibility-request.vue';
import PollingRequest from './modules/polling-request.vue';
import NetworkToggleRequest from './modules/network-toggle-request.vue';
import CrossComponentRequest from './modules/cross-component-request.vue';
</script>

<template>
  <ElSpace direction="vertical" fill :size="16">
    <ElCard :header="$t('page.alova.scenes.captchaSend')" class="card-wrapper">
      <CaptchaVerification class="w-1/3" />
    </ElCard>
    <ElCard :header="$t('page.alova.scenes.autoRequest')" class="card-wrapper">
      <ElSpace :wrap="false">
        <BrowserVisibilityRequest />
        <PollingRequest />
        <NetworkToggleRequest />
      </ElSpace>
    </ElCard>
    <ElCard :header="$t('page.alova.scenes.requestCrossComponent')" class="card-wrapper">
      <CrossComponentRequest />
    </ElCard>
  </ElSpace>
</template>

<style scoped></style>
