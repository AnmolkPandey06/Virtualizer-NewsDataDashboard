import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Contacts from "../NewsReports";
import axios from "axios";
import { useState,useEffect } from "react";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import StarsIcon from '@mui/icons-material/Stars';
import CompressIcon from '@mui/icons-material/Compress';
import Pie from "../pie";
import Bar from "../bar";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading,setLoading]=useState(false);
  const [realdata,setrealData]=useState([]);
  const [realnews,setRealnews]=useState();
  const [total,setTotal]=useState();
  const [likelihood,setliklihood]=useState();
  const [intensity,setIntensity]=useState();
  const [region,setRegion]=useState([]);
  const fetchData=async ()=>{
    setLoading(true);
    try {
      const {data}=await axios.get('http://localhost:4000/details');
      const container=[];
       var maxrel=0;
       var intensity=0;
       let index=0;
       let likelihood=0;
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
      for (index = 0; index < data.length; index++) {
           if(data[index].relevance>=3){
               maxrel++;
           }
           if(data[index].intensity>=10){
            intensity++;
           }
          
           if(data[index].likelihood>=3){
            likelihood++
           }
           for (let i = 0; i < comregions.length; i++) {
               if(comregions[i].includes(data[index].region)){
                    regions[i].value=regions[i].value+1;
               }
            
           }
          


      }
     
      setRegion(regions);
      setrealData(container);
      setliklihood(likelihood);
      setRealnews(maxrel);
      setTotal(index);
      setIntensity(intensity);
     
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
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="News Reports Visualizer" subtitle="Get Insight of your News here!" />
      </Box>
      
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${realnews}+`}
            subtitle="Relevant News"
            progress={realnews/total}
            increase={`Relevant Score more than 3 out of 7 that is ${realnews*100/total}%`}
            icon={
              
              <FactCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${likelihood}+`}
            subtitle="News that that deduced correct future happenings"
            progress={realnews/total}
            increase={`Likelihood score more than 3 out of 5 that is ${likelihood*100/total}%`}
            icon={
              <StarsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box> 
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${intensity}+`}
            subtitle="News that were intense and created impact"
            progress={intensity/total}
            increase={`Intensity score more than 10 that is ${intensity*100/total}%`}
            icon={
              <CompressIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
        >
           <Contacts dashboarddata={[]}/>
        </Box>
        

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h4" fontWeight="600">
            News from Differnt Regions
          </Typography>
            <Pie/>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h4"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Development Projects deadlines in the News Reports
          </Typography>
          <Bar/>
         
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
