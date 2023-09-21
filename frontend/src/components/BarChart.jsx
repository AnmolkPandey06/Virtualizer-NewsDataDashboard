import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

import { useEffect,useState } from "react";
import axios from "axios";



const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [damta,setDamta]=useState([]);
  const [loading,setLoading]=useState(false);
    
  




  const fetchData=async ()=>{
    setLoading(true);
    try {
      const {data}=await axios.get('http://localhost:4000/details');
       const Data = [
        {
          Interval: "2017-2020",
          pro:0,
          proColor: "#0e0e99",
        },
        {
          Interval: "2020-2022",
          pro: 0,
          proColor: "#0e0e99",
        },
        {
          Interval: "2022-2025",
          pro: 0,
          proColor: "#0e0e99",
    
        },
        {
          Interval: "2025-2028",
          pro: 0,
          proColor: "#0e0e99",
    
        },
        {
          Interval: "2028-2030",
          pro: 0,
          proColor: "#0e0e99",
    
        },
        {
          Interval: ">2030",
          pro: 0,
          proColor: "#0e0e99",
    
          },
        {
          Interval: "Completed",
          pro: 0,
          proColor: "#0e0e99",
    
        },
      ];
      for (let  index = 0; index < data.length; index++) {
        if(2017<=data[index].end_year && data[index].end_year<2020){
          Data[0].pro=Data[0].pro+1;
        }
        if(2020<=data[index].end_year && data[index].end_year<2022){
          Data[1].pro=Data[1].pro+1;
        }
        
        if(2022<=data[index].end_year  && data[index].end_year<2025){
          Data[2].pro=Data[2].pro+1;
        }
        if(2025<=data[index].end_year  && data[index].end_year<2028){
          Data[3].pro=Data[3].pro+1;
        }
        if(2028<=data[index].end_year && data[index].end_year<2030){
          Data[4].pro=Data[4].pro+1;
        }
        if(2030<=data[index].end_year){
          Data[5].pro=Data[5].pro+1;
        }
        
          


      }
      Data[6].pro=data.length-(Data[5].pro+Data[4].pro+Data[3].pro+Data[2].pro+Data[1].pro+Data[0].pro)
  
     
      setDamta(Data);
      
     
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
    {!loading && <ResponsiveBar
      data={damta}
      theme={{
        // added
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
      keys={["pro"]}
      indexBy="Interval"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={.6}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Year", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Projects", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      // role="application"
      // barAriaLabel={function (e) {
      //   return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      // }}
    />}</>
  );
};

export default BarChart;
