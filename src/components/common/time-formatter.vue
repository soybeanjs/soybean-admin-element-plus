<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import { ElTooltip } from 'element-plus';

defineOptions({ name: 'TimeFormatter' });

interface Props {
  /** 时间值 */
  time: string | number | Date | undefined | null;
  /** 完整时间格式 */
  format?: string;
  /** 是否显示 Tooltip */
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  format: 'YYYY-MM-DD HH:mm:ss',
  showTooltip: true
});

const isValidTime = computed(() => {
  return props.time && dayjs(props.time).isValid();
});

const formattedTime = computed(() => {
  if (!isValidTime.value) return '-';
  return dayjs(props.time).format(props.format);
});

const relativeTime = computed(() => {
  if (!isValidTime.value) return '-';
  return dayjs(props.time).fromNow();
});
</script>

<template>
  <span v-if="isValidTime" class="time-formatter">
    <ElTooltip v-if="showTooltip" :content="formattedTime" placement="top">
      <span class="cursor-help border-b border-gray-400 border-dashed transition-colors hover:text-primary">
        {{ relativeTime }}
      </span>
    </ElTooltip>
    <span v-else>{{ relativeTime }}</span>
  </span>
  <span v-else>-</span>
</template>

<style scoped></style>
