import * as echarts from 'echarts/core';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, GraphicComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GraphicComponent,
  PieChart,
  LineChart,
  BarChart,
  CanvasRenderer
]);

export default echarts;
