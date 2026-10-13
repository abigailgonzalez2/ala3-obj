import Suma from "./Suma";
import Resta from "./Resta";
import Multiplicacion from "./Multiplicacion";
import Division from "./Division";
import Calculadora from "./Calculadora";
import Consola from "./Consola";
import Aplicacion from "./Aplicacion";
 
const calculadora: Calculadora = new Calculadora([
    new Suma(),
    new Resta(),
    new Multiplicacion(),
    new Division()
]);
 
new Aplicacion(calculadora, new Consola()).ejecutar();