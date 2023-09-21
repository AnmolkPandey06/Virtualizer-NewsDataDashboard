import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

import { useEffect,useState } from "react";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [region,setRegion]=useState([]);
  const [loading,setLoading]=useState(false);


  const fetchData=async ()=>{
    setLoading(true);
    try {
      const {data}=await axios.get('http://localhost:4000/details');
       let comregions=["Asia","America","World","Europe","Oceania","Africa"];
       let regions = [
        {
          id: "Asia",
          label: "Asia",
          value: 0,
          color: "hsl(104, 70%, 50%)",
        },
        {
          id: "America",
          label:  "America",
          value: 0,
          color: "hsl(162, 70%, 50%)",
        },
        {
          id: "World",
          label: "World",
          value: 0,
          color: "hsl(229, 70%, 50%)",
        },
        {
          id: "Europe",
          label: "Europe",
          value: 0,
          color: "#3434eb",
        },
        {
          id: "Oceania",
          label: "Oceania",
          value: 0,
          color: "hsl(344, 70%, 50%)",
        },
        {
          id: "Africa",
          label: "Africa",
          value: 0,
          color: "#28a612",
        },
      ];
      for (let  index = 0; index < data.length; index++) {
           for (let i = 0; i < comregions.length; i++) {
               if(comregions[i].includes(data[index].region)){
                    regions[i].value=regions[i].value+1;
               }
            
           }
          


      }
      // console.log(regions);
     
      setRegion(regions);
      
     
      setLoading(false); 

      
    } catch (error) {
      setLoading(false)
      console.log(error)
      return
    }
}



useEffect(()=>{
    fetchData();
},[])

  
  return (
  <>
  {!loading && <ResponsivePie
    data={region}
    theme={{
      axis: {
        domain: {
          line: {
            stroke: colors.grey[100],
          },
        },
        legend: {
          text: {
            fill: colors.grey[100],
          },
        },
        ticks: {
          line: {
            stroke: colors.grey[100],
            strokeWidth: 1,
          },
          text: {
            fill: colors.grey[100],
          },
        },
      },
      legends: {
        text: {
          fill: colors.grey[100],
        },
      },
    }}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={colors.grey[100]}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    enableArcLabels={false}
    arcLabelsRadiusOffset={0.4}
    arcLabelsSkipAngle={7}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 80,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />}</>
  );
};

export default PieChart;
