import * as React from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { useEffect, useRef } from 'react';
import { IPieData } from '../models/dashboard';
import Legend from './LegendComponent';
import { Container } from '@material-ui/core';

interface IPieChartComponentProps {
    data: IPieData[];
    title: string;
}

const PieChartComponent = (props: IPieChartComponentProps) => {
    const pieContainer = useRef(null);
    const { data, title } = props;

    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    useEffect(
        () => {
            const width = 954;
            const height = Math.min(width, 500);

            const svg = d3
                .select<any, PieArcDatum<IPieData>>(pieContainer.current)
                .append('svg')
                .attr('viewBox', `${-width / 2}, ${-height / 2}, ${width}, ${height}`);

            const pie = d3.pie<IPieData>()
                .padAngle(0.020)
                .sort(null)
                .value(d => d.value);

            const arcs = pie(data);

            const radius = Math.min(width, height) / 2;
            const arc = d3.arc<SVGElement, PieArcDatum<IPieData>>()
                .innerRadius(radius * 0.67).outerRadius(radius - 1);

            const color = d3.scaleOrdinal<string>()
                .domain(data.map(d => d.name))
                .range(data.map(d => d.color));

            svg.selectAll<SVGElement, PieArcDatum<IPieData>>('path')
                .data(arcs)
                .join('path')
                .attr('fill', (d: PieArcDatum<IPieData>) => color(d.data.name))
                .attr('d', arc)
                .append('title')
                .text((d: PieArcDatum<IPieData>) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

            svg.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 20)
                .attr('text-anchor', 'middle')
                .selectAll('text')
                .data(arcs)
                .join('text')
                .attr('transform', (d: PieArcDatum<IPieData>) => `translate(${arc.centroid(d)})`)
                .call((text) => text.append('tspan')
                    .attr('y', '-0.4em')
                    .attr('font-weight', 'bold')
                    .text((d: PieArcDatum<IPieData>) => d.data.name))
                .call((text) => text.filter((d: PieArcDatum<IPieData>) => (d.startAngle - d.startAngle) > 0.25).append('tspan')
                    .attr('x', 0)
                    .attr('y', '0.7em')
                    .attr('fill-opacity', 0.7)
                    .text((d: PieArcDatum<IPieData>) => d?.data?.value.toLocaleString()));
        },
        [props.data, pieContainer.current]);

    return (
        <div ref={pieContainer} style={styles.container}>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
        </div>
    );
};

export default PieChartComponent;