
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Title, Paper, createStyles, Select } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '50%',
    marginBottom: '2%',
    //backgroundColor:'green',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '40%',
    },
  },
}));

const ProfitChart = () => {
  const { classes } = useStyles();
  
  const totalProfitThisYear = 556730;
  const [state, setState] = useState({
    selectedInterval: 'Weekly',
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'monthyear',
        categories: [
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    },
    series: getSeriesData('Weekly'),
  });

  const handleIntervalChange = (selectedInterval) => {
    setState({
      ...state,
      selectedInterval,
      series: getSeriesData(selectedInterval),
      options: getOptions(selectedInterval),
    });
  };

  function getSeriesData(interval) {
    switch (interval) {
      case 'Weekly':
        return [
          {
            name: 'expense',
            data: [110, 60, 48, 71, 62, 129, 120],
          },
          {
            name: 'revenue',
            data: [41, 110, 65, 52, 54, 72, 61],
          },
          {
            name: 'profit',
            data: [20, 50, 17, 19, 12, 57, 59],
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'expense',
            data: [400, 300, 250, 400, 350, 600, 550],
          },
          {
            name: 'revenue',
            data: [150, 350, 300, 250, 300, 500, 450],
          },
          {
            name: 'profit',
            data: [250, 50, 100, 150, 50, 100, 100],
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'expense',
            data: [2500, 2200, 2000, 2800, 2700, 3000, 2900],
          },
          {
            name: 'revenue',
            data: [1000, 1900, 1600, 2200, 2100, 2400, 2300],
          },
          {
            name: 'profit',
            data: [
              Math.round(totalProfitThisYear * 0.27),
              Math.round(totalProfitThisYear * 0.03),
              Math.round(totalProfitThisYear * 0.05),
              Math.round(totalProfitThisYear * 0.07),
              Math.round(totalProfitThisYear * 0.08),
              Math.round(totalProfitThisYear * 0.1),
              Math.round(totalProfitThisYear * 0.1),
            ],
          },
        ];
      default:
        return [];
    }
  }

  function getOptions(interval) {
    return {
      chart: {
        height: 350,
        type: interval === 'Yearly' ? 'bar' : 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: interval === 'Yearly' ? 'smooth' : 'straight',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2023-06-3',
          '2023-07-8',
          '2023-08-1',
          '2023-09-5',
          '2023-10-9',
          '2023-11-10',
          '2023-12-11',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    };
  }

  return (
    <Paper mt={20} shadow="xs" p="md">
      <Box className={classes.responsiveContainer}>
        <Title className={classes.inputField} order={4}>
          Profit
        </Title>
        <Select
          className={classes.inputField}
          value={state.selectedInterval}
          onChange={(value) => handleIntervalChange(value)}
          searchable
          data={['Weekly', 'Monthly', 'Yearly']}
        />
      </Box>
      <Box p={20} style={{ border: '1px dotted gray' }}>
        <ReactApexChart options={state.options} series={state.series} type={state.options.chart.type} height={350} />
      </Box>
    </Paper>
  );
};

export default ProfitChart;

