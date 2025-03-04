import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";
import Meta from "./components/atoms/Meta/Meta";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Meta />
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
