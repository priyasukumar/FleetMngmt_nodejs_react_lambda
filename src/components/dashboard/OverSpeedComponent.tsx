import * as React from 'react';
import Bar from '../../core/BarComponent';
import DiscreteSlider from '../shared/DiscreteSliderComponent';
import { Weekly } from '../../constants/enum';
import { IBarData } from '../../models/dashboard';

const OverSpeedComponent = () => {
  const barData = [
    { name: Weekly.Monday, value: 4 },
    { name: Weekly.Tuesday, value: 5 },
    { name: Weekly.Wednesday, value: 7 },
    { name: Weekly.Thursday, value: 9 },
    { name: Weekly.Friday, value: 3 },
    { name: Weekly.Saturday, value: 10 },
    { name: Weekly.Sunday, value: 1 }
  ] as IBarData[];

  return (
    <>
      <DiscreteSlider title="Speed Limit" value={10} min={0} max={120} />
      <Bar data={barData} title="Over Speed" />
    </>
  );
};

export default OverSpeedComponent;