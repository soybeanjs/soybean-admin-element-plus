<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLoading } from '@sa/hooks';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useTabStore } from '@/store/modules/tab';
import { useAuth } from '@/hooks/business/auth';

defineOptions({ name: 'ToggleAuth' });

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const tabStore = useTabStore();
const { hasAuth } = useAuth();
const { loading, startLoading, endLoading } = useLoading();

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: 'super',
    label: $t('page.login.pwdLogin.superAdmin'),
    userName: 'Super',
    password: '123456'
  },
  {
    key: 'admin',
    label: $t('page.login.pwdLogin.admin'),
    userName: 'Admin',
    password: '123456'
  },
  {
    key: 'user',
    label: $t('page.login.pwdLogin.user'),
    userName: 'User',
    password: '123456'
  }
]);

const loginAccount = ref<AccountKey>('super');

async function handleToggleAccount(account: Account) {
  loginAccount.value = account.key;

  startLoading();
  await authStore.login(account.userName, account.password, false);
  tabStore.initTabStore(route);
  endLoading();
  appStore.reloadPage();
}
</script>

<template>
  <ElSpace direction="vertical" fill :size="16">
    <ElCard :header="$t('route.function_toggle-auth')" class="card-wrapper">
      <ElDescriptions direction="vertical" border :column="1">
        <ElDescriptionsItem :label="$t('page.manage.user.userRole')">
          <ElSpace>
            <ElTag v-for="role in authStore.userInfo.roles" :key="role">{{ role }}</ElTag>
          </ElSpace>
        </ElDescriptionsItem>
        <ElDescriptionsItem ions-item :label="$t('page.function.toggleAuth.toggleAccount')">
          <ElSpace>
            <ElButton
              v-for="account in accounts"
              :key="account.key"
              :loading="loading && loginAccount === account.key"
              :disabled="loading && loginAccount !== account.key"
              @click="handleToggleAccount(account)"
            >
              {{ account.label }}
            </ElButton>
          </ElSpace>
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
    <ElCard :header="$t('page.function.toggleAuth.authHook')" class="card-wrapper">
      <ElSpace>
        <ElButton v-if="hasAuth('B_CODE1')">{{ $t('page.function.toggleAuth.superAdminVisible') }}</ElButton>
        <ElButton v-if="hasAuth('B_CODE2')">{{ $t('page.function.toggleAuth.adminVisible') }}</ElButton>
        <ElButton v-if="hasAuth('B_CODE3')">
          {{ $t('page.function.toggleAuth.adminOrUserVisible') }}
        </ElButton>
      </ElSpace>
    </ElCard>
  </ElSpace>
</template>

<style scoped></style>
