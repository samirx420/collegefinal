import React, {useRef, useEffect} from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight } from 'd3';
import './App.css';

const data = [24,45,5,15,65,50,85];

function App() {
  const svgRef = useRef();
  console.log(svgRef);
  useEffect(() =>{
    console.log(svgRef);
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0,data.length-1])
      .range([0,300])

    const yScale = scaleLinear()
      .domain([0,150])
      .range([150,0])

    const xAxis = axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(index => index + 1);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

      const yAxis = axisRight(yScale);
      svg
        .select(".y-axis")
        .style("transform", "translateX(300px)")
        .call(yAxis);
        
    const myLine = line()
    .x((value, index) => xScale(index))
    .y(yScale)
    .curve(curveCardinal)
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //     .attr("r", value => value)
    //     .attr("cx", value => value * 2)
    //     .attr("cy", value => value * 2)
    //     .attr("stroke", "red");

    svg.selectAll(".line")
    .data([data])
    .join("path")
    .attr("class", "line")
    .attr("d", myLine)
    .attr("fill", "none")
    .attr("stroke", "blue");
    }, [data]);
  
    return (
    <React.Fragment>
      <svg ref={svgRef}>
      <g className="x-axis" /> 
      <g className="y-axis" />
        </svg>
     
    </React.Fragment>


  );
}

export default App;
