import { LegacyRef, useEffect, useRef, useState,  } from "react";
import { generateDataset } from "../../utilities/generateDataset";
import  useInterval  from "../../utilities/useInterval"
import * as d3 from 'd3'

const LINE_WIDTH = 0.6
const baseDataSet = generateDataset().sort()
const colorScale = d3.scaleOrdinal().domain(baseDataSet.length.toString()).range(d3.schemeDark2)

const SpeedrunChart = () => {

  const [numPoints, setNumpoints] = useState(
    1
  )

  const [dataset, setDataset] = useState(
    // generateDataset().sort()
    baseDataSet.slice(0, numPoints)
  )
  

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


    let dataPointElement = svgElement.select("#data_point")
    if (dataPointElement.empty()){
      svgElement.append("g").attr("id", "data_point")
      dataPointElement = svgElement.select("#data_point")
    }

    // const xScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .domain([10, 100])

    vLinesElement
    .selectAll("line")
    .data(dataset)
      .join(
        (enter: any) =>
          enter
            .append("line")
            .style("stroke-width", LINE_WIDTH)
            .style("stroke-linecap", "round")
            .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
            .attr("x1", (d: number[], i: number)=> d[0])
            .attr("y1", (d: number[], i: number) => dataset[Math.max(0, i-1)][1]) 
            .attr("x2", (d: number[], i: number)=> d[0])
            .attr("y2", (d: number[], i: number) => dataset[Math.max(0, i-1)][1]) 
            .call((enter: any) =>
              enter
                .transition()
                .attr("y2", (d: number[], i: number) => d[1])
            ),
          (update: any) =>
            update.call((update: any) =>
              update
                .transition()
                // .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
            ),
          (exit: any) =>
            exit.call((exit: any) =>
              exit
                .transition()
                .remove()
            ),
      )
        
        
         
          
    hLinesElement.selectAll("line")
    .data(dataset)
    .join(
      (enter: any) =>
        enter
          .append("line")
          .style("stroke-width", LINE_WIDTH)
          .style("stroke-linecap", "round")
          .style("stroke", (d: number[], i: number) => colorScale((i-1).toString()) as string)
          .attr("x1", (d: number[], i: number)=> dataset[Math.max(0, i-1)][0])
          .attr("y1", (d: number[], i: number) => dataset[Math.max(0, i-1)][1])
          .attr("x2", (d: number[], i: number)=> dataset[Math.max(0, i-1)][0])
          .attr("y2", (d: number[], i: number) => dataset[Math.max(0, i-1)][1])
          .call((enter: any) =>
            enter
              .transition()
              .attr("x2", (d: number[], i: number)=> d[0])
              // .attr("y2", (d: number[], i: number) => d[1])
          ),
        (update: any) =>
          update.call((update: any) =>
            update
              .transition()
              // .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
          ),
        (exit: any) =>
          exit.call((exit: any) =>
            exit
              .transition()
              .remove()
          ),
    )
      // .join("line")
      //   .style("stroke-width", LINE_WIDTH)
      //   .style("stroke-linecap", "round")
      //   .style("stroke", (d: number[], i: number) => colorScale(i.toString()) as string)
      //   .attr("x1", (d: number[], i: number)=> d[0])
      //   .attr("y1", (d: number[], i: number) => d[1])
      //   .attr("x2", (d: number[], i: number)=> dataset[Math.min(dataset.length-1, i+1)][0])
      //   .attr("y2", (d: number[], i: number) => d[1])

    dataPointElement.selectAll("circle")
    .data(dataset)
      .join("circle")
        .attr("fill", (d: number[], i: number) => colorScale(i.toString()) as string)
        .attr("cx", (d: number[])=> d[0])
        .attr("cy", (d: number[]) => d[1])
        .attr("r",  1)

    // const axisGenerator = d3.axisBottom(xScale)
    // svgElement.append("g")
    //   .call(axisGenerator)
  }, [dataset])

  useInterval(() => {
    // const newDataset = generateDataset().sort()
    setNumpoints(Math.min(numPoints + 1, baseDataSet.length-1))
    setDataset(baseDataSet.slice(0, numPoints))
  }, 1000)

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