import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { Dashboard } from "../pages/Dashboard";
import { Transaction } from "../pages/Transaction";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App