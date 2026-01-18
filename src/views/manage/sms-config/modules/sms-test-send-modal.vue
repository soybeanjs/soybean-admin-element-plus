<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { fetchSendSmsTestCode } from '@/service/api';
import { useForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import SystemEnumSelect from '@/components/custom/system-enum-select.vue';

defineOptions({ name: 'SmsTestSendModal' });

interface Props {
  initialAppType?: string | number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useForm();
const { defaultRequiredRule } = useFormRules();

type Model = Api.SystemManage.SmsTestSendDto;

type FormModel = Omit<Model, 'purpose'> & {
  purpose?: number;
};

const model = ref<FormModel>({
  phone: '',
  appType: props.initialAppType ?? '',
  purpose: undefined,
  code: ''
});

const rules = computed(() => ({
  phone: defaultRequiredRule,
  appType: defaultRequiredRule,
  purpose: defaultRequiredRule
}));

function close() {
  visible.value = false;
}

function resetModel() {
  model.value = {
    phone: '',
    appType: props.initialAppType ?? '',
    purpose: undefined,
    code: ''
  };
}

async function handleSubmit() {
  await validate();

  const data = await fetchSendSmsTestCode({
    phone: model.value.phone,
    appType: model.value.appType,
    purpose: model.value.purpose!,
    code: model.value.code || undefined
  });

  if (data) {
    window.$message?.success($t('page.manage.smsConfig.testDialog.success'));
    close();
  }
}

watch(
  () => [visible.value, props.initialAppType],
  () => {
    if (!visible.value) return;
    restoreValidation();
    resetModel();
  }
);
</script>

<template>
  <ElDialog v-model="visible" :title="$t('page.manage.smsConfig.testDialog.title')" width="520px">
    <ElForm ref="formRef" :model="model" :rules="rules" label-position="top">
      <ElFormItem :label="$t('page.manage.smsConfig.testDialog.appType')" prop="appType">
        <SystemEnumSelect
          v-model="model.appType"
          enum-name="AppType"
          :placeholder="$t('page.manage.smsConfig.testDialog.form.appType')"
          value-type="number"
        />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.smsConfig.testDialog.phone')" prop="phone">
        <ElInput v-model="model.phone" :placeholder="$t('page.manage.smsConfig.testDialog.form.phone')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.smsConfig.testDialog.purpose')" prop="purpose">
        <SystemEnumSelect
          v-model="model.purpose"
          enum-name="PurposeType"
          :placeholder="$t('page.manage.smsConfig.testDialog.form.purpose')"
          value-type="number"
        />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.smsConfig.testDialog.code')" prop="code">
        <ElInput v-model="model.code" :placeholder="$t('page.manage.smsConfig.testDialog.form.code')" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElSpace :size="16">
        <ElButton @click="close">{{ $t('common.cancel') }}</ElButton>
        <ElButton type="primary" @click="handleSubmit">{{ $t('page.manage.smsConfig.testDialog.send') }}</ElButton>
      </ElSpace>
    </template>
  </ElDialog>
</template>

<style scoped></style>

