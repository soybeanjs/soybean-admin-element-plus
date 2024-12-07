<script setup lang="ts">
import { useVChart } from '@/hooks/common/vchart';
import {
  barMarkPointSpec,
  circularProgressTickSpec,
  histogramDifferentBinSpec,
  liquidChartSmartInvertSpec,
  rankingBarSpec,
  shapeWordCloudSpec,
  stackedDashAreaSpec
} from './data';

const { domRef: stackedDashAreaRef } = useVChart(() => stackedDashAreaSpec);
const { domRef: barMarkPointRef } = useVChart(() => barMarkPointSpec);
const { domRef: histogramDifferentBinRef } = useVChart(() => histogramDifferentBinSpec);
const { domRef: rankingBarRef } = useVChart(() => rankingBarSpec);
const { domRef: shapeWordCloudRef } = useVChart(() => shapeWordCloudSpec);
const { domRef: circularProgressTickRef } = useVChart(() => circularProgressTickSpec);
const { domRef: liquidChartSmartInvertRef } = useVChart(() => liquidChartSmartInvertSpec);
</script>

<template>
  <ElSpace direction="vertical" fill :size="16">
    <ElCard header="VChart" class="h-full card-wrapper">
      <WebSiteLink label="More Demos: " link="https://www.visactor.com/vchart/example" />
    </ElCard>
    <ElCard header="Stacked Dash Area Chart" class="h-full card-wrapper">
      <div ref="stackedDashAreaRef" class="h-400px" />
    </ElCard>
    <ElCard header="Bar Mark Point Chart" class="h-full card-wrapper">
      <div ref="barMarkPointRef" class="h-400px" />
    </ElCard>
    <ElCard header="Histogram Different Bin Chart" class="h-full card-wrapper">
      <div ref="histogramDifferentBinRef" class="h-400px" />
    </ElCard>
    <ElCard header="Ranking Bar Chart" class="h-full card-wrapper">
      <div ref="rankingBarRef" class="h-400px" />
    </ElCard>
    <ElCard header="Circular Progress Tick Chart" class="h-full card-wrapper">
      <div ref="circularProgressTickRef" class="h-400px" />
    </ElCard>
    <ElCard header="Liquid Chart Smart Invert Chart" class="h-full card-wrapper">
      <div ref="liquidChartSmartInvertRef" class="h-400px" />
    </ElCard>
    <ElCard header="Shape Word Cloud Chart" class="h-full card-wrapper">
      <div ref="shapeWordCloudRef" class="h-400px" />
    </ElCard>
  </ElSpace>
</template>

<style scoped></style>
