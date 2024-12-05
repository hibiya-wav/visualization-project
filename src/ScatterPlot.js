import React, { Component } from "react";
import * as d3 from "d3";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.csv_data;

    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 150, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    d3.select(this.chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(this.chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const groupedData = d3.group(data, (d) => d.Brand);
    const averagedData = Array.from(groupedData, ([key, value]) => ({
      Brand: key,
      "Average Stars": d3.mean(value, (d) => d.Stars),
      "Average Storage": d3.mean(value, (d) => d["Storage (GB)"]),
    }));

    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, 450]).range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 5]).range([height, 0]);

    container
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "10px");

    container
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "10px");

    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Avg. Storage (GB)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 2 - 10)
      .attr("x", -(height / 2 + margin.top))
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Avg. Stars");

    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Avg. Storage (GB) vs Avg. Stars by Brand");

    container
      .selectAll("circle")
      .data(averagedData)
      .join("circle")
      .attr("cx", (d) => xScale(d["Average Storage"]))
      .attr("cy", (d) => yScale(d["Average Stars"]))
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    container
      .selectAll("text.label")
      .data(averagedData)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d["Average Storage"]) + 5)
      .attr("y", (d) => yScale(d["Average Stars"]) - 5)
      .style("font-size", "10px")
      .style("fill", "black")
      .text((d) => d.Brand);
  }

  render() {
    return <div ref={this.chartRef}></div>;
  }
}

export default ScatterPlot;
