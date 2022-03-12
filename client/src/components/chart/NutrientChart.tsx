import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutrientChart = ({ nutrients }: any) => {
  let color = [
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(255, 206, 86, 0.7)',
  ];

  const options = {
    responsive: false,
    legend: {
      display: true,
      labels: {
        fontSize: '10px',
      },
    },
  };

  const data = {
    labels: ['탄수화물', '단백질', '지방'],
    datasets: [
      {
        label: '영양 정보',
        backgroundColor: color,
        data: nutrients,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Doughnut data={data} options={options} width={200} height={200}></Doughnut>
  );
};

export default NutrientChart;
