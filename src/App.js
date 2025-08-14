import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyGoals from "./pages/MyGoals";
import CompletedGoals from "./pages/CompletedGoals";
import AbandonedGoals from "./pages/AbandonedGoals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/MyGoals" element={<MyGoals />} />
        <Route path="/CompletedGoals" element={<CompletedGoals />} />
        <Route path="/AbandonedGoals" element={<AbandonedGoals />} />
      </Routes>
    </Router>
  );
}

export default App;
