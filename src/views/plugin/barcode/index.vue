<script setup lang="ts">
import JsBarcode from 'jsbarcode';
import type { Options } from 'jsbarcode';
import { onMounted } from 'vue';

defineOptions({ name: 'BarcodePage' });

const text = 'Soybean';

interface CodeConfig {
  id: string;
  title: string;
  text: string;
  options: Options;
}

const codes: CodeConfig[] = [
  {
    id: 'code39',
    title: 'CODE 39 正常尺寸',
    text: 'Hello',
    options: { format: 'code39' }
  },
  {
    id: 'code128',
    title: 'CODE 128 正常尺寸',
    text,
    options: {}
  },
  {
    id: 'ean-13',
    title: 'ENA-13 商品条形码',
    text: '1234567890128',
    options: { format: 'ean13' }
  },
  {
    id: 'upc-a',
    title: 'UPC-A 商品条形码',
    text: '123456789012',
    options: { format: 'upc' }
  },
  {
    id: 'barcode',
    title: '不一样的高度，不一样的颜色',
    text: 'Hello',
    options: {
      height: 30,
      lineColor: '#9ca3af'
    }
  },
  {
    id: 'barcode1',
    title: '加个背景色',
    text,
    options: {
      background: '#9ca3af',
      lineColor: '#ffffff'
    }
  },
  {
    id: 'barcode2',
    title: '字体好大',
    text,
    options: {
      fontSize: 40
    }
  },
  {
    id: 'barcode3',
    title: '粗狂的条码，文字离远点',
    text: 'Hi',
    options: {
      textMargin: 30,
      width: 4
    }
  },
  {
    id: 'barcode4',
    title: '字体跑上面来，还是粗体',
    text,
    options: {
      textPosition: 'top',
      fontOptions: 'bold'
    }
  }
];

function generateBarcode() {
  codes.forEach(code => {
    JsBarcode(`#${code.id}`, code.text, code.options);
  });
}

onMounted(() => {
  generateBarcode();
});
</script>

<template>
  <div class="overflow-hidden">
    <ElCard header="条形码" class="h-full card-wrapper">
      <ElScrollbar class="h-full">
        <ElRow :gutter="12" class="w-[calc(100%-12px)]">
          <ElCol v-for="item in codes" :key="item.id" :lg="8" :md="12" :sm="24" class="mb-24px">
            <div class="flex-col-center">
              <h3>{{ item.title }}</h3>
              <svg :id="item.id" class="h-130px" />
            </div>
          </ElCol>
        </ElRow>
      </ElScrollbar>
    </ElCard>
  </div>
</template>

<style scoped></style>
