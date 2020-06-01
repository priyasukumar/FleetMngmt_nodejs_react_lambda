import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Line, ScaleBand, AxisDomain, AxisScale } from 'd3';
import { Monthly, Weekly } from '../constants/enum';
import { Container } from '@material-ui/core';
import { IBarData } from '../models/dashboard';

interface IBarComponentProps {
    data: IBarData[];
    frequency?: string;
    title: string;
}

const BarComponent = (props: IBarComponentProps) => {
    const barContainer = useRef(null);
    const { data, title } = props;
    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    useEffect(
        () => {
            const width = 600;
            const height = 400;
            const color: string = '#3f51b5';
            const margin = ({ top: 30, right: 0, bottom: 30, left: 40 });

            let svg = d3
                .select<any, ScaleBand<IBarData>>(barContainer.current)
                .append('svg')
                .attr('viewBox', `0, 0, ${width}, ${height}`);

            const range = d3.range(data.length);
            const x = d3.scaleBand<number>()
                .domain(range)
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const max = d3.max(data, d => d.value) as number;
            const y = d3.scaleLinear<number, number>()
                .domain([0, max]).nice()
                .range([height - margin.bottom, margin.top]);

            const xAxis = (g: any) => g
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat((d, i) => data[i].name).tickSizeOuter(0));

            const yAxis = (g: any) => g
                .attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).ticks(null))
                .call((h: any) => h.select('.domain').remove())
                .call((i: any) => i.append('text')
                    .attr('x', -margin.left)
                    .attr('y', 10)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text(`${title} Count`));

            const xValue = (d: ScaleBand<IBarData>, i: number) => x(i) as number;
            svg.append('g')
                .attr('fill', color)
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('x', xValue)
                .attr('y', d => y(d.value))
                .attr('height', d => y(0) - y(d.value))
                .attr('width', x.bandwidth());

            svg.append('g')
                .call(xAxis);

            svg.append('g')
                .call(yAxis);
        },
        [props.data, barContainer.current]);

    return (
        <Container maxWidth="sm">
            <div ref={barContainer} style={styles.container} />
        </Container>
    );
};

export default BarComponent;