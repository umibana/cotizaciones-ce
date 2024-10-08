import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page.tsx";
import Cotizacion from "./routes/Cotizacion.tsx";
import Proyectos from "./routes/Proyectos.tsx";
import Asignacion from "./routes/Asignacion.tsx";
import Materiales from "./routes/Materiales.tsx";
import NuevoProyecto from "./routes/NuevoProyecto.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/cotizacion",
		element: <Cotizacion />,
		errorElement: <ErrorPage />,
	},

	{
		path: "/proyectos",
		element: <Proyectos />,
		errorElement: <ErrorPage />,
	},

	{
		path: "/asignacion",
		element: <Asignacion />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/materiales",
		element: <Materiales />,
		errorElement: <ErrorPage />,
	},

	{
		path: "/nuevo-proyecto",
		element: <NuevoProyecto />,
		errorElement: <ErrorPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
