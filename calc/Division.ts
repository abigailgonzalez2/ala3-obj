import Operacion from "./Operacion";
 
class Division extends Operacion {
    constructor() {
        super("/", "Division");
    }
 
    calcular(a: number, b: number): number {
        // Caso especial: la división es la única operación que puede fallar.
        // Lanzamos un error y quien la use decide cómo informarlo.
        if (b === 0) {
            throw new Error("No se puede dividir por cero.");
        }
        return a / b;
    }
}
 
export default Division;