import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './LineChart.css';

const LineChart = ({ data, from, to, min, max, width = 800, height = 600 }) => {
    const svgContainer = useRef(null);
    const noData = data === null || data.length === 0;

    useEffect(() => {
        if (data && svgContainer.current) {
            const margin = 24;
            const wrapper = d3.select(svgContainer.current);
            
            /* 
             * Task: How would you rewrite this component so that the svg element doesn't
             * need to be cleared on every update
             */
            wrapper.selectAll("*").remove();

            const svg = wrapper.append("g")
                .attr("transform", `translate(${margin}, ${margin})`);

            const parseTime = d3.timeParse("%Y-%m-%d");
            const mappedData = noData ? [] : data.map(d => {
                return {
                    date: parseTime(d.date),
                    value: +d.value
                }
            });

            const xScale = d3.scaleTime()
                .domain([parseTime(from), parseTime(to)])
                .range([0, width - (2 * margin)]);

            const xAxis = d3.axisBottom()
                .scale(xScale);
            
            svg.append("g")
                .attr("transform", `translate(0, ${height - (2 * margin)})`)
                .call(xAxis);

            const yScale = d3.scaleLinear()
                .domain([min, max])
                .range([height - (2 * margin), 0]);

            const yAxis = d3.axisLeft()
                .scale(yScale);
            
            svg.append("g")
                .call(yAxis);

            const line = d3.line()
                .defined(d => !isNaN(d.value))
                .x(d => xScale(d.date))
                .y(d => yScale(d.value));

            const path = svg.append("path").datum(mappedData);
            path.attr("class", "linechart").attr("d", line);

            path.exit().remove();

        }
    }, [data, noData, svgContainer, from, to, min, max, height, width]);

    return (<div>
        {noData &&
            <span>
                No data has been selected.
            </span>}
        {!noData &&
            <svg width={width} height={height} ref={svgContainer}></svg>}
    </div>);
};

export default LineChart;