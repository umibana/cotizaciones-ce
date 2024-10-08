import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<div className="flex flex-auto align-middle flex-col justify-center items-center container mx-auto p-4 space-y-4 ">
				<h1 className=" text-xl font-extrabold">
					{" "}
					Prueba de Vistas Casa Experto
				</h1>
				<div className="text-center">
					<h1 className=" text-xl font-bold"> Vista Maestro</h1>
					<Button asChild>
						<Link to="/Cotizacion">Cotización</Link>
					</Button>
				</div>

				<div className="text-center">
					<h1 className="text-xl font-bold"> Vista Jefe</h1>

					<Button asChild>
						<Link to="/Asignacion">Asignación</Link>
					</Button>
				</div>
			</div>
		</>
	);
}

export default App;
