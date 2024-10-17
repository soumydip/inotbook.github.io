import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navber from "./component/Navber";
import Home from "./component/Home";
import About from "./component/About";
import Notestate from "./context/notes/Notestate";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ContactUs from "./component/ContactUs";
import TermsAndConditions from "./component/TermsAndConditions";
function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navber />
          <Alert massage={"thos sdmsnss"} />
          <div className="container">
            <Routes>
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactUs" element={<ContactUs />} />{" "}
              {/* Fixed this line */}
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
