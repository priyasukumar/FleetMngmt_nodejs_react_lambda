import * as React from 'react';
import Bar from '../../core/BarComponent';
import { Weekly } from '../../constants/enum';
import { IBarData } from '../../models/dashboard';

const HarshBreakComponent = () => {
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
        <Bar data={barData} title="Harsh Break" />
    );
};

export default HarshBreakComponent;