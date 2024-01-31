import { Chart } from 'primereact/chart';
import { FC, useEffect, useState } from 'react';
import { Card } from '../../Card';

interface IChartPieProps {
  chartData: any;
  chartOptions?: any;
  type?: 'pie' | 'doughnut';
}

const ChartPie: FC<IChartPieProps> = ({
  chartData,
  chartOptions,
  type = 'pie',
}) => {
  const [options, setOptions] = useState({
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
    cutout: '60%',
  });

  useEffect(() => {
    setOptions((prev) => {
      return { ...prev, chartOptions };
    });
  }, [chartOptions]);

  return (
    <Card>
      <Chart type={type} data={chartData} options={options} />
    </Card>
  );
};

export default ChartPie;
