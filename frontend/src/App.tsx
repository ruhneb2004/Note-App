import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { WelcomePage } from "./pages/welcomePage";
import { SignUp } from "./pages/signupPage";
import { MainPage } from "./pages/mainPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<MainPage />} path="/mainpage" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
