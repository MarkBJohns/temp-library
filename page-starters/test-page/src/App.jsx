import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { NavbarTypeA as Navbar } from "./components/Navbars";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <h1 style={{ minHeight: "200vh", backgroundColor: "#011627", color: "white", textAlign: "center", paddingTop: "10px" }}>
              Happy Coding!
            </h1>}
          />
          <Route path="*" element={<div style={{ minHeight: "200vh", backgroundColor: "#011627", color: "white"}}></div>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
