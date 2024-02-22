"use client"

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
        label: '2024',
      },
  ],
  width: 1000,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Action: 59,
    Horror: 57,
    Drama: 86,
    Comedy: 21,
    Thrilled:28,
    month: 'Jan',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'feb',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'mar',
  },
  
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'apr',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'may',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'jun',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'jul',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'aug',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'sep',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'oct',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'nov',
  },
  {
    Action: 59,
    Horror: 57,
    Drama: 56,
    Comedy: 21,
    Thrilled:29,
    month: 'dec',
  },




];

const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset() {
  return (
    <div  className=' mt-2 hidden lg:block p-3 w-full bg-slate-900' >


    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Action', label: 'Action', valueFormatter },
        { dataKey: 'Horror', label: '  Horror', valueFormatter },
        { dataKey: 'Drama', label: ' Drama', valueFormatter },
        { dataKey: 'Comedy', label: 'Comedy', valueFormatter },
        { dataKey: 'Thrilled', label: 'Thrilled', valueFormatter },
      ]}
      {...chartSetting}
     
    />
        </div>

  );
}
    
