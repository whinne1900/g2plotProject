export const testdata = () => {
  const uvBillData = [
    { time: '2019-03', value: 350, type: 'totals'},
    { time: '2019-04', value: 900, type: 'totals'},
    { time: '2019-05', value: 300, type: 'totals' },
    { time: '2019-06', value: 450, type: 'totals' },
    { time: '2019-07', value: 470, type: 'totals' },
    { time: '2019-03', value: 220, type: 'finishs' },
    { time: '2019-04', value: 300, type: 'finishs' },
    { time: '2019-05', value: 250, type: 'finishs' },
    { time: '2019-06', value: 220, type: 'finishs' },
    { time: '2019-07', value: 362, type: 'finishs' },
  ];

  const transformData = [
    { time: '2019-03', throughRate: 0.1 },
    { time: '2019-04', throughRate: 0.09},
    { time: '2019-05', throughRate: 0.08},
    { time: '2019-06', throughRate: 0.23 },
    { time: '2019-07', throughRate: 0.02 },
  ];
}