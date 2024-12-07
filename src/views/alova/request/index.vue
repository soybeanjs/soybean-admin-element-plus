<script setup lang="ts">
import { $t } from '@/locales';
import { fetchCustomBackendError } from '@/service-alova/api';

async function logout() {
  await fetchCustomBackendError('8888', $t('request.logoutMsg'));
}

async function logoutWithModal() {
  await fetchCustomBackendError('7777', $t('request.logoutWithModalMsg'));
}

async function refreshToken() {
  await fetchCustomBackendError('9999', $t('request.tokenExpired'));
}

async function handleRepeatedMessageError() {
  await Promise.all([
    fetchCustomBackendError('2222', $t('page.function.request.repeatedErrorMsg1')),
    fetchCustomBackendError('2222', $t('page.function.request.repeatedErrorMsg1')),
    fetchCustomBackendError('2222', $t('page.function.request.repeatedErrorMsg1')),
    fetchCustomBackendError('3333', $t('page.function.request.repeatedErrorMsg2')),
    fetchCustomBackendError('3333', $t('page.function.request.repeatedErrorMsg2')),
    fetchCustomBackendError('3333', $t('page.function.request.repeatedErrorMsg2'))
  ]);
}

async function handleRepeatedModalError() {
  await Promise.all([
    fetchCustomBackendError('7777', $t('request.logoutWithModalMsg')),
    fetchCustomBackendError('7777', $t('request.logoutWithModalMsg')),
    fetchCustomBackendError('7777', $t('request.logoutWithModalMsg'))
  ]);
}
</script>

<template>
  <ElSpace direction="vertical" fill :size="16">
    <ElCard :header="$t('request.logout')" class="card-wrapper">
      <ElButton @click="logout">{{ $t('common.trigger') }}</ElButton>
    </ElCard>
    <ElCard :header="$t('request.logoutWithModal')" class="card-wrapper">
      <ElButton @click="logoutWithModal">{{ $t('common.trigger') }}</ElButton>
    </ElCard>
    <ElCard :header="$t('request.refreshToken')" class="card-wrapper">
      <ElButton @click="refreshToken">{{ $t('common.trigger') }}</ElButton>
    </ElCard>
    <ElCard :header="$t('page.function.request.repeatedErrorOccurOnce')" class="card-wrapper">
      <ElButton @click="handleRepeatedMessageError">{{ $t('page.function.request.repeatedError') }}(Message)</ElButton>
      <ElButton class="ml-12px" @click="handleRepeatedModalError">
        {{ $t('page.function.request.repeatedError') }}(Modal)
      </ElButton>
    </ElCard>
  </ElSpace>
</template>

<style scoped></style>
