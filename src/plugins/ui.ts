import type { App } from 'vue';
import ElementPlus, { ElCard, ElTable } from 'element-plus';

/** global table column align */
ElTable.TableColumn.props.align = {
  type: String,
  default: 'center'
};

/** global ElCard shadow */
ElCard.props.shadow = {
  type: String,
  default: 'never'
};

/** full import ElementPlus */
export const setupUI = (app: App) => {
  app.use(ElementPlus);
};
