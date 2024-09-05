import { Box } from "@mui/material";
import SchedulerView from "./components/SchedulerView";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#f0f0f0",
      }}
    >
      <SchedulerView />
    </Box>
  );
}

export default App;
