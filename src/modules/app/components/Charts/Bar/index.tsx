import { Chart } from 'primereact/chart';
import { FC, useEffect, useState } from 'react';
import { Card } from '../../Card';

interface IChartBarProps {
  chartData: any;
  stacked?: boolean;
  display?: boolean;
  chartOptions?: any;
  orientation?: 'horizontal' | 'vertical';
}

const ChartBar: FC<IChartBarProps> = ({
  chartData,
  chartOptions,
  stacked = false,
  display = false,
  orientation = 'vertical',
}) => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  const [options, setOptions] = useState({
    // plugins: { legend: { display: false } },
    indexAxis: orientation === 'vertical' ? 'x' : 'y',
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {
      display,
    },
    scales: {
      x: {
        stacked,
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  });

  useEffect(() => {
    setOptions((prev) => {
      return { ...prev, chartOptions };
    });
  }, [chartOptions]);

  return (
    <Card>
      <Chart type="bar" data={chartData} options={options} />
    </Card>
  );
};

export default ChartBar;
