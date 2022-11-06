import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import PrivateRoute from "./util/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<PrivateRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route exact path="/register" element={<PrivateRoute />}>
              <Route exact path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
