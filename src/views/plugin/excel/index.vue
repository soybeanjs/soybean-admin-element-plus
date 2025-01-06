<script setup lang="tsx">
import { ElButton, ElTag } from 'element-plus';
import { utils, writeFile } from 'xlsx';
import { useTable } from '@/hooks/common/table';
import { fetchGetUserList } from '@/service/api';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { $t } from '@/locales';

defineOptions({ name: 'ExcelPage' });

const { columns, data, loading } = useTable({
  apiFn: fetchGetUserList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 999,
    status: undefined,
    userName: undefined,
    userGender: undefined,
    nickName: undefined,
    userPhone: undefined,
    userEmail: undefined
  },
  columns: () => [
    { type: 'selection', width: 48 },
    { prop: 'index', label: $t('common.index'), width: 64 },
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
    }
  ]
});

function exportExcel() {
  const exportColumns = columns.value.slice(2);

  const excelList = data.value.map(item => exportColumns.map(col => getTableValue(col, item)));

  const titleList = exportColumns.map(col => (isTableColumnHasTitle(col) && col.label) || undefined);

  excelList.unshift(titleList);

  const workBook = utils.book_new();

  const workSheet = utils.aoa_to_sheet(excelList);

  workSheet['!cols'] = exportColumns.map(item => ({
    width: Math.round(Number(item.width) / 10 || 20)
  }));

  utils.book_append_sheet(workBook, workSheet, '用户列表');

  writeFile(workBook, '用户数据.xlsx');
}

function getTableValue(
  col: UI.TableColumn<UI.TableDataWithIndex<Api.SystemManage.User>>,
  item: UI.TableDataWithIndex<Api.SystemManage.User>
) {
  if (!isTableColumnHasKey(col)) {
    return '';
  }

  const { prop } = col;

  if (prop === 'operate' || prop === undefined) {
    return '';
  }

  if (prop === 'userRoles') {
    return item.userRoles.map(role => role).join(',');
  }

  if (prop === 'status') {
    return (item.status && $t(enableStatusRecord[item.status])) || undefined;
  }

  if (prop === 'userGender') {
    return (item.userGender && $t(userGenderRecord[item.userGender])) || undefined;
  }

  if (prop in item) {
    return item[prop as keyof UI.TableDataWithIndex<Api.SystemManage.User>];
  }

  return '';
}

function isTableColumnHasKey<T>(column: UI.TableColumn<T>): column is UI.TableColumnWithKey<T> {
  return Boolean((column as UI.TableColumnWithKey<T>).prop);
}

function isTableColumnHasTitle<T>(column: UI.TableColumn<T>): column is UI.TableColumnWithKey<T> & {
  label: string;
} {
  return Boolean((column as UI.TableColumnWithKey<T>).label);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ElCard class="sm:flex-1-hidden card-wrapper">
      <template #header>
        <div class="flex items-center justify-between">
          <p>Excel导出</p>
          <ElButton plain type="primary" @click="exportExcel">
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出excel
          </ElButton>
        </div>
      </template>
      <template #header-extra></template>
      <div class="h-[calc(100%-50px)]">
        <ElTable v-loading="loading" height="100%" border class="sm:h-full" :data="data" row-key="id">
          <ElTableColumn v-for="col in columns" :key="col.prop" v-bind="col" />
        </ElTable>
      </div>
    </ElCard>
  </div>
</template>

<style scoped></style>
