import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import { useEffect,useState } from "react";

const  NewsReports = ({dashboarddata}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading,setLoading]=useState(false)
  const [realdata,setrealData]=useState([]);
  const fetchData=async ()=>{
      setLoading(true);
      try {
        const {data}=await axios.get('https://newsvisualizer06.onrender.com/details');
        // console.log(data);

    //   const {data}=await fetch('http://localhost:6000/details',{ 
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   })
        const container=[];
        for (let index = 0; index < data.length; index++) {
          const result = data[index].title.substr(0,40)+"...";
          const obj={
               id:index+1,
               pestle:data[index].pestle,
               topic:data[index].topic,
               title:result,
               source:data[index].source,
               region:data[index].region,
               country:data[index].country,
               end_year:data[index].end_year,
               
          }
          container.push(obj);
          
        }
        setrealData(container);
        // console.log(container);
        setLoading(false); 

        
      } catch (error) {
        setLoading(false)
        console.log(error)
        return
      }
  }
  
  useEffect(()=>{
      // console.log(dashboarddata);
      if(dashboarddata.length===0){
        fetchData();
      }

      
  },[])

  const columns=[
    { field: "id", headerName: "ID", flex: 0.3,type:"number", },
    { field: "pestle", headerName: "Pestle", flex: 1 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "end_year", headerName: "End Year", flex: 0.5 },
    
]

 

  return (
    <Box m="20px">
      <Header
        title="News Reports"
        subtitle="List of News Reports in our database"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={realdata}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default NewsReports;
