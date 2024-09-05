import { Box } from '@mui/material';
import SchedulerView from "./components/SchedulerView";

function App() {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Wycentrowanie poziome
        alignItems: "center", // Wycentrowanie pionowe
        minHeight: "100vh", // Pełna wysokość widoku
        minWidth: "100vw",
        backgroundColor: "#f0f0f0", // Kolor tła dla całej strony
      }}
    >
      <SchedulerView />
    </Box>
  );
}

export default App;
