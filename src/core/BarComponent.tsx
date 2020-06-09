import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Line, ScaleBand, AxisDomain, AxisScale } from 'd3';
import { Container } from '@material-ui/core';
import { IBarData } from '../models/dashboard';

export interface IBarComponentProps {
    plot: IBarData[];
    title: string;
    yaxisTitle: string;
}

const BarComponent = (props: IBarComponentProps) => {
    const barContainer = useRef(null);
    const dateFormat = 'd-MMM';
    const { plot, title, yaxisTitle } = props;
    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    const Bar = () => {
        const width = 600;
        const height = 400;
        const color: string = '#3f51b5';
        const margin = ({ top: 30, right: 0, bottom: 30, left: 40 });

        const svg = d3
            .select<any, ScaleBand<IBarData>>(barContainer.current)
            .attr('viewBox', `0, 0, ${width}, ${height}`);

        const range = d3.range(plot.length);
        const x = d3.scaleBand<number>()
            .domain(range)
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const max = d3.max(plot, d => d.value) as number;
        const y = d3.scaleLinear<number, number>()
            .domain([0, max]).nice()
            .range([height - margin.bottom, margin.top]);

        const xValue = (d: ScaleBand<IBarData>, i: number) => x(i) as number;

        svg.selectAll('g').remove();

        svg.append('g')
            .attr('fill', color)
            .selectAll('rect')
            .data(plot)
            .join('rect')
            .attr('x', xValue)
            .attr('y', d => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth());

        const xAxis = (g: any) => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat((d, i) => plot[i].name).tickSizeOuter(0));

        const yAxis = (g: any) => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null))
            .call((h: any) => h.select('.domain').remove())
            .call((i: any) => i.append('text')
                .attr('x', -margin.left)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text(yaxisTitle));

        svg.append('g')
            .call(xAxis);

        svg.append('g')
            .call(yAxis);
    };

    useEffect(() => {
        if (plot && barContainer.current) {
            Bar();
        }
    }, [plot, barContainer.current]);

    return (
        <Container maxWidth="sm">
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <svg style={styles.container} ref={barContainer} />
        </Container>
    );
};

export default BarComponent;