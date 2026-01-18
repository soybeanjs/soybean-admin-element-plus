<script setup lang="tsx">
import { reactive } from 'vue';
import { ElButton, ElPopconfirm, ElTag } from 'element-plus';
import { fetchDeleteSmsLog, fetchGetSmsLogList } from '@/service/api';
import { useTableOperate, useUIPaginatedTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import SystemEnumTag from '@/components/custom/system-enum-tag.vue';
import TimeFormatter from '@/components/common/time-formatter.vue';
import SmsLogSearch from './modules/sms-log-search.vue';

defineOptions({ name: 'SmsLogManage' });

const pageRequest = reactive<Api.SystemManage.SmsLogPageRequest>({
  search: {},
  currentPage: 1,
  pageSize: 20,
  sortField: 'CreatedTime',
  sortType: 'desc'
});

const { columns, columnChecks, data, getData, loading, mobilePagination } = useUIPaginatedTable<
  Api.SystemManage.SmsLogList,
  Api.SystemManage.SmsLog
>({
  paginationProps: {
    currentPage: pageRequest.currentPage,
    pageSize: pageRequest.pageSize
  },
  api: () => fetchGetSmsLogList(pageRequest),
  onPaginationParamsChange: params => {
    pageRequest.currentPage = params.currentPage ?? pageRequest.currentPage;
    pageRequest.pageSize = params.pageSize ?? pageRequest.pageSize;
  },
  columns: () => [
    { prop: 'selection', type: 'selection', width: 48 },
    { prop: 'index', type: 'index', label: $t('common.index'), width: 64 },
    { prop: 'phoneNumber', label: '手机号', minWidth: 120 },
    {
      prop: 'provider',
      label: '服务商',
      width: 120,
      formatter: row => <SystemEnumTag enumName="SmsProviderType" value={row.provider} />
    },
    { prop: 'templateCode', label: '模版代码', minWidth: 120 },
    { prop: 'content', label: '发送内容', minWidth: 200, showOverflowTooltip: true },
    {
      prop: 'success',
      label: '发送状态',
      width: 100,
      formatter: row => <ElTag type={row.success ? 'success' : 'danger'}>{row.success ? '成功' : '失败'}</ElTag>
    },
    { prop: 'message', label: '返回信息', minWidth: 150, showOverflowTooltip: true },
    { prop: 'clientIP', label: '发送IP', minWidth: 120 },
    {
      prop: 'createdAt',
      label: '发送时间',
      minWidth: 160,
      formatter: row => <TimeFormatter time={row.createdAt} />
    },
    {
      prop: 'operate',
      label: $t('common.operate'),
      align: 'center',
      width: 100,
      formatter: row => (
        <div class="flex-center gap-8px">
          <ElPopconfirm title={$t('common.confirmDelete')} onConfirm={() => handleDelete(row.id)}>
            {{
              reference: () => (
                <ElButton type="danger" plain size="small">
                  {$t('common.delete')}
                </ElButton>
              )
            }}
          </ElPopconfirm>
        </div>
      )
    }
  ]
});

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, 'id', getData);

async function handleDelete(id: string) {
  await onDeleted(async () => {
    await fetchDeleteSmsLog([id]);
  });
}

async function handleBatchDelete() {
  await onBatchDeleted(async () => {
    await fetchDeleteSmsLog(checkedRowKeys.value);
  });
}

function handleReset() {
  pageRequest.search = {};
  getData();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <SmsLogSearch v-model:model="pageRequest.search" @reset="handleReset" @search="getData" />
    <ElCard class="card-wrapper sm:flex-1-hidden" body-class="ht50" :bordered="false" size="small">
      <template #header>
        <div class="flex items-center justify-between">
          <p>短信日志列表</p>
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            @delete="handleBatchDelete"
            @refresh="getData"
          />
        </div>
      </template>
      <ElTable
        v-loading="loading"
        height="100%"
        border
        class="sm:h-full"
        :data="data"
        row-key="id"
        @selection-change="checkedRowKeys = $event"
      >
        <ElTableColumn v-for="col in columns" :key="col.prop" v-bind="col" />
      </ElTable>
      <div class="mt-20px flex justify-end">
        <ElPagination
          v-if="mobilePagination.total"
          layout="total,prev,pager,next,sizes"
          v-bind="mobilePagination"
          @current-change="mobilePagination['current-change']"
          @size-change="mobilePagination['size-change']"
        />
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  .ht50 {
    height: calc(100% - 50px);
  }
}
</style>
