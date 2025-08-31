import { computed, ref } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import type { TableColumnCheck } from '@sa/hooks';
import { $t } from '@/locales';
import type { AlovaGenerics, Method } from '~/packages/alova/src';

type TableAlovaApiFn<T = any, R = Api.Common.CommonSearchParams> = (
  params: R
) => Method<AlovaGenerics<Api.Common.PaginatingQueryRecord<T>>>;

type PartialColumnCtx<T extends object> = Partial<TableColumnCtx<T>>;
// this hook is used to manage table columns
// if you choose alova, you can move this hook to the `src/hooks` to handle all list page in your project
export default function useCheckedColumns<
  A extends TableAlovaApiFn,
  T extends object = Awaited<ReturnType<A>>['records'][number]
>(getColumns: () => PartialColumnCtx<T>[]) {
  const SELECTION_KEY = '__selection__';

  const EXPAND_KEY = '__expand__';

  const INDEX_KEY = '__index__';

  const getColumnChecks = (cols: PartialColumnCtx<T>[]) => {
    const checks: UI.TableColumnCheck[] = [];
    cols.forEach(column => {
      if (column.type === 'selection') {
        checks.push({
          prop: SELECTION_KEY,
          label: $t('common.check'),
          checked: true,
          visible: true
        });
      } else if (column.type === 'expand') {
        checks.push({
          prop: EXPAND_KEY,
          label: $t('common.expandColumn'),
          checked: true,
          visible: true
        });
      } else if (column.type === 'index') {
        checks.push({
          prop: INDEX_KEY,
          label: $t('common.index'),
          checked: true,
          visible: true
        });
      } else {
        checks.push({
          prop: column.prop as string,
          label: column.label as string,
          checked: true,
          visible: true
        });
      }
    });

    return checks;
  };

  const columnChecks = ref<TableColumnCheck[]>(getColumnChecks(getColumns()));

  const columns = computed(() => {
    const cols = getColumns();
    const columnMap = new Map<string, PartialColumnCtx<T>>();

    cols.forEach(column => {
      if (column.type === 'selection') {
        columnMap.set(SELECTION_KEY, column);
      } else if (column.type === 'expand') {
        columnMap.set(EXPAND_KEY, column);
      } else if (column.type === 'index') {
        columnMap.set(INDEX_KEY, column);
      } else {
        columnMap.set(column.prop as string, column);
      }
    });

    const filteredColumns = columnChecks.value
      .filter(item => item.checked)
      .map(check => columnMap.get(check.prop) as UI.TableColumn<T>);

    return filteredColumns;
  });

  return {
    columnChecks,
    columns
  };
}
