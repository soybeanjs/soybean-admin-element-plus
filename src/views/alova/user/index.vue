<script setup lang="tsx">
import { ElButton, ElPopconfirm, ElTag } from 'element-plus';
import { usePagination } from '@sa/alova/client';
import { ref } from 'vue';
import { batchDeleteUser, deleteUser, fetchGetUserList } from '@/service-alova/api';
import { $t } from '@/locales';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import useCheckedColumns from './hooks/use-checked-columns';
import useTableOperate from './hooks/use-table-operate';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const searchParams = ref({
  status: undefined,
  userName: undefined,
  userGender: undefined,
  nickName: undefined,
  userPhone: undefined,
  userEmail: undefined
});
const { loading, data, refresh, reload, page, pageSize, pageCount, send, remove, total } = usePagination(
  (pageNum, size) =>
    fetchGetUserList({
      ...searchParams.value,
      current: pageNum,
      size
    }),
  {
    data: ({ records }) => records,

    // trigger reload when states in `searchParams` changed
    watchingStates: [searchParams.value],

    // debounce of `searchParams`
    debounce: [1000]
  }
);
const getDataByPage = (newPage = 1) => {
  page.value = newPage;
  send(page.value, pageSize.value);
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  send(page.value, newSize);
};

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  handleDelete,
  handleBatchDelete,
  checkedRowKeys
  // batchDeleting
  // closeDrawer
} = useTableOperate(data, {
  async delete(row) {
    await deleteUser(row.id);
    remove(row);
  },
  async batchDelete(rows) {
    await batchDeleteUser(rows.map(({ id }) => id));
    remove(...rows);
  }
});

function edit(id: number) {
  handleEdit(id);
}

const { columnChecks, columns } = useCheckedColumns<typeof fetchGetUserList>(() => [
  { type: 'selection', width: 48 },
  { prop: 'userName', label: $t('page.manage.user.userName'), minWidth: 100 },
  {
    prop: 'userGender',
    label: $t('page.manage.user.userGender'),
    width: 100,
    formatter: row => {
      if (row.userGender === undefined) {
        return '';
      }

      const tagMap: Record<Api.SystemManage.UserGender, UI.ThemeColor> = {
        1: 'primary',
        2: 'danger'
      };

      const label = $t(userGenderRecord[row.userGender]);

      return <ElTag type={tagMap[row.userGender]}>{label}</ElTag>;
    }
  },
  { prop: 'nickName', label: $t('page.manage.user.nickName'), minWidth: 100 },
  { prop: 'userPhone', label: $t('page.manage.user.userPhone'), width: 120 },
  { prop: 'userEmail', label: $t('page.manage.user.userEmail'), minWidth: 200 },
  {
    prop: 'status',
    label: $t('page.manage.user.userStatus'),
    width: 100,
    formatter: row => {
      if (row.status === undefined) {
        return '';
      }

      const tagMap: Record<Api.Common.EnableStatus, UI.ThemeColor> = {
        1: 'success',
        2: 'warning'
      };

      const label = $t(enableStatusRecord[row.status]);

      return <ElTag type={tagMap[row.status]}>{label}</ElTag>;
    }
  },
  {
    prop: 'operate',
    label: $t('common.operate'),
    width: 130,
    formatter: row => (
      <div class="flex-center gap-8px">
        <ElButton type="primary" plain size="small" onClick={() => edit(row.id)}>
          {$t('common.edit')}
        </ElButton>
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
]);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @search="getDataByPage" />
    <ElCard :header="$t('page.manage.user.title')" class="sm:flex-1-hidden card-wrapper" body-class="ht50">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="refresh"
        />
      </template>
      <div class="h-[calc(100%-50px)]">
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
            v-if="total"
            layout="total,prev,pager,next,sizes"
            :current-page="page"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[10, 15, 20, 25, 30]"
            :page-count="pageCount"
            @current-change="getDataByPage"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="reload"
      />
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
