import { LegacyRef, useEffect, useRef, useState,  } from "react";
import { generateDataset } from "../../utilities/generateDataset";
import  useInterval  from "../../utilities/useInterval"
import * as d3 from 'd3'

const LINE_WIDTH = 0.6
const baseDataSet = generateDataset().sort()
console.log(baseDataSet)
const colorScale = d3.scaleOrdinal().domain(baseDataSet.length.toString()).range(d3.schemeDark2)



const SpeedrunChart = () => {

  const [numPoints, setNumpoints] = useState(
    1
  )

  const [dataset, setDataset] = useState(
    // generateDataset().sort()
    baseDataSet.slice(0, numPoints)
  )

  const [stage, setStage] = useState(
    2
  )
 
  // const stepGraph = () => {
  //   setStage((stage + 1)  % 3)
  //   setNumpoints(Math.min(numPoints + (stage === 2 ? 1 : 0), baseDataSet.length-1))
  //   setDataset(baseDataSet.slice(0, numPoints))
  // }
  

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

    svgElement.on("click", () => {
      setStage((stage + 1)  % 3)
      setNumpoints(Math.min(numPoints + (stage === 2 ? 1 : 0), baseDataSet.length-1))
      setDataset(baseDataSet.slice(0, numPoints))
    })

    console.log(dataset, stage, numPoints)
    let h_dataset = dataset.slice(0, dataset.length)
    console.log(h_dataset.length)
    let v_dataset = dataset.slice(0, dataset.length - (stage === 1 ? 1 : 0))
    console.log(v_dataset.length)
    let p_dataset = dataset.slice(0, dataset.length - (stage > 0 ? 1 : 0))
    console.log(p_dataset.length)

    vLinesElement
    .selectAll("line")
    .data(v_dataset)
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
            .call((enter: any) => {
                enter
                  .transition()
                  .attr("y2", (d: number[], i: number) => d[1])
                  // .transition()
                  // .style("stroke-width", LINE_WIDTH*2)
              }
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
    .data(h_dataset)
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
          .call((enter: any) => {
              enter
              .transition()
              .attr("x2", (d: number[], i: number)=> d[0])
              // .attr("y2", (d: number[], i: number) => d[1])
            }
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
    .data(p_dataset)
    .join(
      (enter: any) =>
        enter
          .append("circle")
          .attr("fill", (d: number[], i: number) => colorScale(i.toString()) as string)
          .attr("cx", (d: number[])=> d[0])
          .attr("cy", (d: number[]) => d[1])
          .attr("r",  0)
          .call((enter: any) => {
              enter
              .transition()
              .attr("r",  1)
            }
          ),
        (update: any) =>
          update.call((update: any) =>
            update
              .transition()
          ),
        (exit: any) =>
          exit.call((exit: any) =>
            exit
              .transition()
              .remove()
          ),
    )

    // const axisGenerator = d3.axisBottom(xScale)
    // svgElement.append("g")
    //   .call(axisGenerator)
  }, [dataset, numPoints, stage])

  // useInterval(() => {
  //   stepGraph()
  // }, 2000)


 

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