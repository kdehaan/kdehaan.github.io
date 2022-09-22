import { LegacyRef, useEffect, useRef, useState,  } from "react";
import { generateDataset } from "../../utilities/generateDataset";
import  useInterval  from "../../utilities/useInterval"
import * as d3 from 'd3'


const SpeedrunChart = () => {
  const [dataset, setDataset] = useState(
    generateDataset()
  )

  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current as unknown as string)

    // const xScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .domain([10, 100])


    svgElement.selectAll("circle")
      .data(dataset)
        .join("circle")
          .attr("cx", (d: number[])=> d[0])
          .attr("cy", (d: number[]) => d[1])
          .attr("r",  1)
          
    svgElement.selectAll("line")
    .data(dataset)
      .join("line")
        .style("stroke-width", 2)
        .style("stroke", "lightgreen")
        .attr("x1", (d: number[], i: number)=> d[0])
        .attr("y1", (d: number[], i: number) => d[1])
        .attr("x2", (d: number[], i: number)=> dataset[Math.max(0, i-1)][0])
        .attr("y2", (d: number[], i: number) => dataset[Math.max(0, i-1)][1])

    // const axisGenerator = d3.axisBottom(xScale)
    // svgElement.append("g")
    //   .call(axisGenerator)
  }, [dataset])

  useInterval(() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)

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