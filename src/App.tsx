import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/theme.ts";
import {HomePage} from "./pages/HomePage.tsx";

axios.defaults.baseURL = "http://localhost:3000";

const queryClient = new QueryClient()


function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <AppContent/>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
  )
}

function AppContent() {
  return (
      <Box component="main">
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/" element={<Navigate to="/home"/>}/>
        </Routes>

      </Box>
  );
}

export default App
