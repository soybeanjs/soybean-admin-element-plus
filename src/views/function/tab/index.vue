<script setup lang="ts">
import { ref } from 'vue';
import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import { useTabStore } from '@/store/modules/tab';

defineOptions({ name: 'TabPage' });

const tabStore = useTabStore();
const { routerPushByKey } = useRouterPush();

const tabLabel = ref('');

function changeTabLabel() {
  tabStore.setTabLabel(tabLabel.value);
}

function resetTabLabel() {
  tabStore.resetTabLabel();
}
</script>

<template>
  <ElSpace direction="vertical" fill :size="16">
    <ElCard :header="$t('page.function.tab.tabOperate.title')" class="card-wrapper">
      <ElDivider content-position="left">{{ $t('page.function.tab.tabOperate.addTab') }}</ElDivider>
      <ElButton @click="routerPushByKey('about')">{{ $t('page.function.tab.tabOperate.addTabDesc') }}</ElButton>
      <ElDivider content-position="left">{{ $t('page.function.tab.tabOperate.closeTab') }}</ElDivider>
      <ElSpace>
        <ElButton @click="tabStore.removeActiveTab">
          {{ $t('page.function.tab.tabOperate.closeCurrentTab') }}
        </ElButton>
        <ElButton @click="tabStore.removeTabByRouteName('about')">
          {{ $t('page.function.tab.tabOperate.closeAboutTab') }}
        </ElButton>
      </ElSpace>
      <ElDivider content-position="left">{{ $t('page.function.tab.tabOperate.addMultiTab') }}</ElDivider>
      <ElSpace>
        <ElButton @click="routerPushByKey('function_multi-tab')">
          {{ $t('page.function.tab.tabOperate.addMultiTabDesc1') }}
        </ElButton>
        <ElButton @click="routerPushByKey('function_multi-tab', { query: { a: '1' } })">
          {{ $t('page.function.tab.tabOperate.addMultiTabDesc2') }}
        </ElButton>
      </ElSpace>
    </ElCard>
    <ElCard :header="$t('page.function.tab.tabTitle.title')" class="card-wrapper">
      <ElDivider content-position="left">{{ $t('page.function.tab.tabTitle.changeTitle') }}</ElDivider>
      <ElInput v-model="tabLabel" class="max-w-240px">
        <template #append>
          <ElButton type="primary" @click="changeTabLabel">{{ $t('page.function.tab.tabTitle.change') }}</ElButton>
        </template>
      </ElInput>
      <ElDivider content-position="left">{{ $t('page.function.tab.tabTitle.resetTitle') }}</ElDivider>
      <ElButton type="danger" plain class="w-80px" @click="resetTabLabel">
        {{ $t('page.function.tab.tabTitle.reset') }}
      </ElButton>
    </ElCard>
  </ElSpace>
</template>

<style scoped></style>
