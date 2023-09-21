
import { Routes, Route } from "react-router-dom";

import Dashboard from "./scenes/dashboard";

import Contacts from "./scenes/NewsReports";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Headertop from "./components/Headertop";
import Footer from "./components/footer";

function App() {
  const [theme, colorMode] = useMode();
  const dashboarddata=[];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            <Headertop/>
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/News-Reports" element={<Contacts dashboarddata={dashboarddata} />} />
             
            </Routes>
            <Footer/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
