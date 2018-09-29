import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [5, 10, 1, 3, 23, 30, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      size: [500, 500]
    };
    this.createBarChart = this.createBarChart.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  onResize() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight - 100,
      size: [window.innerWidth, window.innerHeight - 100]
    });
  }

  createBarChart() {
    const node = this.node;
    const dataMax = max(this.state.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.state.size[1]]);

    select(node)
      .selectAll("rect")
      .data(this.state.data)
      .enter()
      .append("rect");

    select(node)
      .selectAll("rect")
      .data(this.state.data)
      .exit()
      .remove();

    select(node)
      .selectAll("rect")
      .data(this.state.data)
      .style("fill", "#fe9922")
      .attr("x", (d, i) => i * 25)
      .attr("y", d => this.state.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", 25);
  }

  render() {
    return (
      <svg
        ref={node => (this.node = node)}
        width={this.state.screenWidth}
        height={this.state.screenHeight}
      />
    );
  }
}

export default BarChart;
