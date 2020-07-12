import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import { IFuelInfoModel, IRefuelModel, ITheftModel, ILeakageModel } from '../models/fuelUsage';
import { isoToLocal } from '../utils/date';
// import jsonData from './fuelinfo';

const FuelChartComponent = (props:any)=>{
    const { FuelInfoModel, RefuelModel, LeakageModel, TheftModel } = props.fuel;
    // const { FuelInfoModel, RefuelModel, LeakageModel, TheftModel } = jsonData;
    
    const dateFormat = 'DD/MM/YYYY hh:mm:ss A';
    const fuelChartContainerRef = useRef(null);
    const [currentZoomState,setCurrentZoomState] = useState<any>("");
    const width = 500, height = 500, padding= 20;
    let fuelInfo:any,
        datesArray:Array<Date>,
        minDate:Date,
        maxDate:Date,
        maxVolume:number;
    const styles = {
        container: {
            display: 'grid',
            justifyItems: 'center',
            margin: "10px auto 0 auto",
            width: width,
            height: height
        },
    }; 
    
    const getFuelInfo = (FuelInfoModel:IFuelInfoModel[])=>FuelInfoModel.map((x:any)=>{
        return{
            packetTime: isoToLocal(x.PacketTime,dateFormat),
            Volume: x.Volume,
            utcTime: x.PacketTime
        }
    })

    const getSortedDates = (arr:Array<Date>)=>{
        const sortedDates = arr.sort((a:any,b:any)=>{
            a = a.split("T");
            a[0] = a[0].split('-');
            a[1] = a[1].split(":");
            b = b.split('T');
            b[0] = b[0].split('-');
            b[1] = b[1].split(':');
            return a[0][0] - b[0][0] || a[0][1] - b[0][1] || a[0][2] - b[0][2] || 
                   a[1][0] - b[1][0] || a[1][1] - b[1][1] || a[1][2] - b[1][2] ;
                })
        return sortedDates;
    };
  
    const buildFuelChart = (FuelInfoData: IFuelInfoModel[],RefuelData:IRefuelModel[],LeakageData:ILeakageModel[],TheftData:ITheftModel[])=>{
        fuelInfo = getFuelInfo(FuelInfoData)
        datesArray = FuelInfoData.map((x:IFuelInfoModel)=>x.PacketTime)
        datesArray = getSortedDates(datesArray)
        minDate = datesArray[0];
        maxDate = datesArray[datesArray.length-1];
        maxVolume = d3.max<any,any>(fuelInfo,(d:any)=>d.Volume);
        
        const svg :any = d3.select(fuelChartContainerRef.current);
        const svgContent = svg.select(".content");
                            
        const xScale = d3.scaleTime()
                        .domain([new Date(minDate),new Date(maxDate)])
                        .range([3*padding+10,width-padding])
        const yScale = d3.scaleLinear()
                        .domain([0,maxVolume])
                        .range([height-(2*padding),padding])
        const lineGen = d3.line<any>()
                        .x(d=>xScale(new Date(d.utcTime)))
                        .y(d=>yScale(d.Volume))
        const vizLine = svgContent.append('path')
                                .attrs({
                                    d:lineGen(fuelInfo),
                                    "stroke-width":2,
                                    "stroke": "purple",
                                    "fill": "none",
                                    "class": "fuelLinePath"
                                })

        const vizRefeuelBar = svgContent.selectAll('.refuel-bar')
                                    .data(RefuelData)
                                    .enter()
                                    .append('rect')
                                    .attrs({
                                        "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                        "y":(d:any)=>yScale(d.Volume),
                                        "width":"10px",
                                        "height": (d:any)=>height-yScale(d.Volume),
                                        "fill": "#43a2ca",
                                        "class": "refuel-bar"
                                    })

        const vizLeakageBar = svgContent.selectAll('.leakage-bar')
                                    .data(LeakageData)
                                    .enter()
                                    .append('rect')
                                    .attrs({
                                        "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                        "y":(d:any)=>yScale(d.Volume),
                                        "width":"10px",
                                        "height": (d:any)=>height-yScale(d.Volume),
                                        "fill": "#fec44f",
                                        "class": "leakage-bar"
                                    })
        
        const vizTheftBar = svgContent.selectAll('.theft-bar')
                                .data(TheftData)
                                .enter()
                                .append('rect')
                                .attrs({
                                    "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                    "y":(d:any)=>yScale(d.Volume),
                                    "width":"10px",
                                    "height": (d:any)=>height-yScale(d.Volume),
                                    "fill": "#de2d26",
                                    "class": "theft-bar"
                                })

        const xAxisLabel = svg.append("text")
                            .attr("class", "x-label")
                            .attr("text-anchor", "middle")
                            .attr("x", width/2)
                            .attr("y", height)
                            .text("Time");

        const yAxisLabel = svg.append("text")
                            .attr("class", "y-label")
                            .attr("text-anchor", "end")
                            .attr("y", 0)
                            .attr("x",-height/2.5)
                            .attr("dy", ".75em")
                            .attr("transform", "rotate(-90)")
                            .text("Litres");

        const yAxisGen = d3.axisLeft(yScale)
        const xAxisGen = d3.axisBottom(xScale)
        const yAxis = svg.append('g')
                        .call(yAxisGen)
                        .attrs({
                            "class":"y-axis-lineChart",
                            "transform":"translate("+3*padding+",-"+padding+")"
                        })
                        .attr("font-size","bold")
        
        const xAxis = svg.append('g')
                        .call(xAxisGen)
                        .attrs({
                            "class":"x-axis-lineChart",
                            "transform":"translate(0,"+(height-(3*padding))+")"   
                        })
                        .selectAll("text")	
                        .style("text-anchor", "end")    
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)")
                        .attr("font-size","bold")

        const svgLegends = d3.select('.Legends')
                                .attrs({
                                    "height":100,
                                    "width":500
                                })
        svgLegends.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#43a2ca")
        svgLegends.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#fec44f")
        svgLegends.append("circle").attr("cx",400).attr("cy",90).attr("r", 6).style("fill", "#de2d26")
        svgLegends.append("text").attr("x", 420).attr("y", 30).text("Refuel").style("font-size", "15px").attr("alignment-baseline","middle")
        svgLegends.append("text").attr("x", 420).attr("y", 60).text("Leakage").style("font-size", "15px").attr("alignment-baseline","middle")
        svgLegends.append("text").attr("x", 420).attr("y", 90).text("Theft").style("font-size", "15px").attr("alignment-baseline","middle")

    }

    const updateFuelChart = (FuelInfoData: IFuelInfoModel[],RefuelData:IRefuelModel[],LeakageData:ILeakageModel[],TheftData:ITheftModel[])=>{
        fuelInfo = getFuelInfo(FuelInfoData);
        datesArray = FuelInfoData.map((x:IFuelInfoModel)=>x.PacketTime);
        datesArray = getSortedDates(datesArray);
        minDate = datesArray[0];
        maxDate = datesArray[datesArray.length-1];
        maxVolume = d3.max<any,any>(fuelInfo,(d:any)=>d.Volume);

        const svg :any = d3.select(fuelChartContainerRef.current);
        const svgContent = svg.select(".content");
        const xScale = d3.scaleTime()
                        .domain([new Date(minDate),new Date(maxDate)])
                        .range([3*padding+10,width-padding])

        if(currentZoomState){
            const newXScale= currentZoomState.rescaleX(xScale)
            xScale.domain(newXScale.domain())
        }
        const yScale = d3.scaleLinear()
                        .domain([0,maxVolume])
                        .range([height-(2*padding),padding])
                        
        if(currentZoomState){
            const newYScale= currentZoomState.rescaleY(yScale)
            yScale.domain(newYScale.domain())
        }

        const lineGen = d3.line<any>()
                        .x(d=>xScale(new Date(d.utcTime)))
                        .y(d=>yScale(d.Volume))

        const vizLine = svgContent.selectAll('.fuelLinePath')
                        .attrs({
                            d:lineGen(fuelInfo),
                        })

        const vizRefuelBar = svgContent.selectAll(".refuel-bar")
                                    .data(RefuelData)
                                    .attrs({
                                        "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                        "y":(d:any)=>yScale(d.Volume),
                                        "height":(d:any)=>height-yScale(d.Volume)
                                    })

        const vizLeakageBar = svgContent.selectAll(".leakage-bar")
                                    .data(LeakageData)
                                    .attrs({
                                        "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                        "y":(d:any)=>yScale(d.Volume),
                                        "height":(d:any)=>height-yScale(d.Volume)
                                    })

        const vizTheftBar = svgContent.selectAll(".theft-bar")
                                    .data(TheftData)
                                    .attrs({
                                        "x":(d:any)=>xScale(new Date(d.PacketTime)),
                                        "y":(d:any)=>yScale(d.Volume),
                                        "height":(d:any)=>height-yScale(d.Volume)
                                    })

        const yAxisGen = d3.axisLeft(yScale).ticks(6);
        const xAxisGen = d3.axisBottom(xScale)
        const yAxis = svg.selectAll('g.y-axis-lineChart')
                        .call(yAxisGen)
                        .attr("font-size","bold")
        
        const xAxis = svg.selectAll('g.x-axis-lineChart')
                        .call(xAxisGen)
                        .selectAll("text")	
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)")
                        .attr("font-size","bold")
        
        const zoomBehaviour = d3.zoom()
                            .scaleExtent([1,500])
                            .translateExtent([[0,0],[width,height]])
                            .on("zoom",()=>{
                                const zoomState:any = d3.zoomTransform(svg.node())
                                setCurrentZoomState(zoomState)
                            })
        svg.call(zoomBehaviour)
    }

    
    useEffect(()=>{
        buildFuelChart(FuelInfoModel,RefuelModel,LeakageModel,TheftModel)  
    },[])
    
    useEffect(()=>{
        updateFuelChart(FuelInfoModel,RefuelModel,LeakageModel,TheftModel)
    },[currentZoomState,props])  

    return(
        <>
            <h3 style={{ textAlign: 'center' ,color:'#0097a7', paddingTop:50 }}>Fuel Usage</h3>
            <svg className="Legends">
            </svg>
            <svg style={styles.container} ref={fuelChartContainerRef} >
                <defs>
                    <clipPath id="zoomableFuelChart">
                        <rect x={3*padding+10} y="0" width={width-4*padding-10} height={height-3*padding} />
                    </clipPath>
                </defs>
                <g className="content" clipPath='url(#zoomableFuelChart)'></g>
            </svg>
        </>
    )
}

export default FuelChartComponent