import * as React from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { useEffect, useRef } from 'react';
import { IPieData } from '../models/dashboard';
import { Container } from '@material-ui/core';

interface ILegendComponentProps {
    data: IPieData[];
}

const LegendComponent = (props: ILegendComponentProps) => {
    const legendContainer = useRef(null);
    const { data } = props;

    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    useEffect(
        () => {
            const width = 300;
            const height = Math.min(width, 450);

            let svg = d3
                .select<any, PieArcDatum<IPieData>>(legendContainer.current)
                .append('svg');

            const color = d3.scaleOrdinal<string>()
                .domain(data.map(d => d.name))
                .range(data.map(d => d.color));

            const size = 10;
            svg.selectAll('mydots')
                .data(data.map(c => c.name))
                .enter()
                .append('rect')
                .attr('x', 100)
                .attr('y', (d, i) => (100 + i * (size + 5))) // 100 is where the first dot appears. 25 is the distance between dots
                .attr('width', size)
                .attr('height', size)
                .style('fill', (d) => color(d));

            // Add one dot in the legend for each name.
            svg.selectAll('mylabels')
                .data(data.map(c => c.name))
                .enter()
                .append('text')
                .attr('x', () => 100 + size * 1.2)
                .attr('y', (d, i) => 100 + i * (size + 5) + (size / 2)) // 100 is where the first dot appears. 25 is the distance between dots
                .style('fill', (d) => 'black')
                .text((d) => `${d}`)
                .attr('text-anchor', 'left')
                .style('alignment-baseline', 'middle');
        },
        [props.data, legendContainer.current]);

    return (
            <div ref={legendContainer} style={{ height: 200, width: 300 }} />
    );
};

export default LegendComponent;