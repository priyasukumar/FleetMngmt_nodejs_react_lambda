import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ScaleBand } from 'd3';
import { Container } from '@material-ui/core';
import { IBarData } from '../models/dashboard';
import { IBarComponentProps } from '../models/graph';

const BarComponent = (props: IBarComponentProps) => {
    const barContainer = useRef(null);
    const { plot, title, yaxisTitle, barColor } = props;
    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center'
        }
    };

    const Bar = () => {
        const width = 600;
        const height = 400;
        const margin = ({ top: 0, right: 0, bottom: 30, left: 40 });

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
            .attr('fill', barColor)
            .selectAll('rect')
            .data(plot)
            .join('rect')
            .attr('x', xValue)
            .attr('y', d => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .style('font-size', '7px')
            .attr('width', x.bandwidth());

        const xAxis = (g: any) => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat((d, i) => plot[i].name).tickSizeOuter(0))
            .style('font-size', '15px')
            .style('font-family', '"Roboto", "Helvetica", "Arial", sans-serif')
            .style('font-weight', 'bold');

        const yAxis = (g: any) => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null))
            .style('font-size', '15px')
            .style('font-family', '"Roboto", "Helvetica", "Arial", sans-serif')
            .style('font-weight', 'bold')
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
            <h3 style={{ textAlign: 'left' ,color:'#0097a7', paddingTop:0,margin:0}}>  {title}</h3>
            <svg style={styles.container} ref={barContainer} />
        </Container>
    );
};

export default BarComponent;