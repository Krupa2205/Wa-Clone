import { Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  // loggdeIn -> information , user data -> CRUD
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home ></Home>
        </ProtectedRoute>}></Route>

      <Route path="/:chatid" element={
          <ProtectedRoute><Home></Home></ProtectedRoute>
        }></Route>

        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="*" element={< PageNotFound />} />
      </Routes>
    </>
  )
}

export default App