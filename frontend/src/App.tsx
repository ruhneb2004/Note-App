import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { WelcomePage } from "./pages/welcomePage";
import { SignUp } from "./pages/signupPage";
import { MainPage } from "./pages/mainPage";
import { SignIn } from "./pages/signinPage";
import { Suspense } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Suspense fallback={"loading..."}>
                <WelcomePage />
              </Suspense>
            }
            path="/"
          />
          <Route
            element={
              <Suspense fallback={"loading..."}>
                <SignUp />
              </Suspense>
            }
            path="/signup"
          />
          <Route
            element={
              <Suspense fallback={"loading..."}>
                <SignIn />
              </Suspense>
            }
            path="/signin"
          />
          <Route
            element={
              <Suspense fallback={"loading..."}>
                <MainPage />
              </Suspense>
            }
            path="/mainpage"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
