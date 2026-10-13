import Operacion from "./Operacion";
 
class Multiplicacion extends Operacion {
    constructor() {
        super("*", "Multiplicacion");
    }
 
    calcular(a: number, b: number): number {
        return a * b;
    }
}
 
export default Multiplicacion;