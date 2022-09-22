import { LegacyRef, useEffect, useRef, useState,  } from "react";
import { generateDataset } from "../../utilities/generateDataset";
import  useInterval  from "../../utilities/useInterval"
import * as d3 from 'd3'



const SpeedrunChart = () => {
  const [dataset, setDataset] = useState(
    generateDataset().sort()
  )

  const colorScale = d3.scaleOrdinal().domain(dataset.length.toString()).range(d3.schemeDark2)

  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current as unknown as string)

    let hLinesElement = svgElement.select("#h_lines")
    if (hLinesElement.empty()){
      svgElement.append("g").attr("id", "h_lines")
      hLinesElement = svgElement.select("#h_lines")
    }

    let vLinesElement = svgElement.select("#v_lines")
    if (vLinesElement.empty()){
      svgElement.append("g").attr("id", "v_lines")
      vLinesElement = svgElement.select("#v_lines")
    }

    let roundEndsElement = svgElement.select("#round_ends")
    if (roundEndsElement.empty()){
      svgElement.append("g").attr("id", "round_ends")
      vLinesElement = svgElement.select("#round_ends")
    }

    let dataPointElement = svgElement.select("#data_point")
    if (dataPointElement.empty()){
      svgElement.append("g").attr("id", "data_point")
      vLinesElement = svgElement.select("#data_point")
    }

    // const xScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .domain([10, 100])


    
          
    hLinesElement.selectAll("line")
    .data(dataset)
      .join("line")
        .style("stroke-width", 1)
        .style("stroke-linecap", "round")
        .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
        .attr("x1", (d: number[], i: number)=> d[0])
        .attr("y1", (d: number[], i: number) => d[1])
        .attr("x2", (d: number[], i: number)=> dataset[Math.min(dataset.length-1, i+1)][0])
        .attr("y2", (d: number[], i: number) => d[1])

    vLinesElement.selectAll("line")
    .data(dataset)
      .join("line")
        .style("stroke-width", 1)
        .style("stroke-linecap", "round")
        .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
        .attr("x1", (d: number[], i: number)=> d[0])
        .attr("y1", (d: number[], i: number) => d[1])
        .attr("x2", (d: number[], i: number)=> d[0])
        .attr("y2", (d: number[], i: number) => dataset[Math.max(0, i-1)][1])
    
    // svgElement.selectAll("line")
    // .data(dataset)
    //   .join("line")
    //     .style("stroke-width", 1)
    //     .style("stroke", "lightblue")
    //     .attr("x1", (d: number[], i: number)=> d[0])
    //     .attr("y1", (d: number[], i: number) => d[1])
    //     .attr("x2", (d: number[], i: number)=> dataset[Math.max(0, i-1)][0])
    //     .attr("y2", (d: number[], i: number) => dataset[Math.max(0, i-1)][1])

    dataPointElement.selectAll("circle")
    .data(dataset)
      .join("circle")
        // .attr("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
        .attr("cx", (d: number[])=> d[0])
        .attr("cy", (d: number[]) => d[1])
        .attr("r",  1)

    // const axisGenerator = d3.axisBottom(xScale)
    // svgElement.append("g")
    //   .call(axisGenerator)
  }, [dataset])

  // useInterval(() => {
  //   const newDataset = generateDataset().sort()
  //   setDataset(newDataset)
  // }, 4000)

  return (
    <svg
      viewBox="0 0 100 50"
      ref={ref as unknown as LegacyRef<SVGSVGElement>}
    />
    // <svg viewBox="0 0 100 50">
    //   {dataset.map(([x, y], i: number) => (
    //     <circle
    //       cx={x}
    //       cy={y}
    //       r="3"
    //     />
    //   ))}
    // </svg>
  );

}


export default SpeedrunChart