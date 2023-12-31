import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mantine/core';

const RegisteredBusinessDonutSA = () => {
  const [state, setState] = useState({
    series: [17, 6 , 11],
    options: {
      labels: ['Total Businesses', 'Subscribed Businesses', 'Unsubscribed Businesses'],
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <Box mt={20} w={480}>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="donut" />
      </div>
    </Box>
    
  );
};

export default RegisteredBusinessDonutSA;
