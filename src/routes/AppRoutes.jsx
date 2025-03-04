import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact"; // Import the Contact page
import Layouts from "../layouts/Layouts";
import Projects from "../pages/Projects";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="projects" element={<Projects />} />
        {/* Add the Contact route */}
      </Route>
    </Routes>
  );
};
export default AppRoutes;
