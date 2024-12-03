<script setup lang="ts">
import { computed, watch } from 'vue';
import { useForm, useWatcher } from '@sa/alova/client';
import { useFormRules, useForm as useUIForm } from '@/hooks/common/form';
import type { UserModel } from '@/service-alova/api';
import { addUser, fetchGetAllRoles, updateUser } from '@/service-alova/api';
import { $t } from '@/locales';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';

defineOptions({ name: 'UserOperateDrawer' });

interface Props {
  /** the type of operation */
  operateType: UI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useUIForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<UI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

const {
  loading: submiting,
  reset,
  send: submit,
  form,
  updateForm
} = useForm(formData => (props.operateType === 'add' ? addUser(formData) : updateUser(formData)), {
  initialForm: {
    userName: '',
    userGender: undefined,
    nickName: '',
    userPhone: '',
    userEmail: '',
    userRoles: [],
    status: undefined
  } as UserModel,
  resetAfterSubmiting: true
});

type RuleKey = Extract<keyof UserModel, 'userName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
const { data: roleOptionsRaw, loading } = useWatcher(fetchGetAllRoles, [visible], {
  initialData: [],
  middleware(_, next) {
    return visible.value ? next() : undefined;
  }
});
const roleOptions = computed<CommonType.Option<string>[]>(() => {
  const options = roleOptionsRaw.value.map(item => ({
    label: item.roleName,
    value: item.roleCode
  }));

  // the mock data does not have the roleCode, so fill it
  // if the real request, remove the following code
  const userRoleOptions = form.value.userRoles.map(item => ({
    label: item,
    value: item
  }));
  // end

  return [...userRoleOptions, ...options];
});

function handleInitModel() {
  if (props.operateType === 'edit' && props.rowData) {
    updateForm(props.rowData);
  } else if (props.operateType === 'add') {
    reset();
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  await submit();
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    restoreValidation();
    handleInitModel();
  }
});
</script>

<template>
  <ElDrawer v-model="visible" :title="title" display-directive="show" :size="360">
    <ElForm ref="formRef" :model="form" :rules="rules" label-position="top">
      <ElFormItem :label="$t('page.manage.user.userName')" prop="userName">
        <ElInput v-model="form.userName" :placeholder="$t('page.manage.user.form.userName')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userGender')" prop="userGender">
        <ElRadioGroup v-model="form.userGender">
          <ElRadio v-for="item in userGenderOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.nickName')" prop="nickName">
        <ElInput v-model="form.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userPhone')" prop="userPhone">
        <ElInput v-model="form.userPhone" :placeholder="$t('page.manage.user.form.userPhone')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userEmail')" prop="email">
        <ElInput v-model="form.userEmail" :placeholder="$t('page.manage.user.form.userEmail')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userStatus')" prop="status">
        <ElRadioGroup v-model="form.status">
          <ElRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userRole')" prop="roles">
        <ElSelect
          v-model="form.userRoles"
          multiple
          :loading="loading"
          :placeholder="$t('page.manage.user.form.userRole')"
        >
          <ElOption v-for="{ label, value } in roleOptions" :key="value" :label="label" :value="value"></ElOption>
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElSpace :size="16">
        <ElButton @click="closeDrawer">{{ $t('common.cancel') }}</ElButton>
        <ElButton type="primary" :loading="submiting" @click="handleSubmit">{{ $t('common.confirm') }}</ElButton>
      </ElSpace>
    </template>
  </ElDrawer>
</template>

<style scoped></style>
