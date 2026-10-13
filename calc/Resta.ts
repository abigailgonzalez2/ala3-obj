import Operacion from "./Operacion";
 
class Resta extends Operacion {
    constructor() {
        super("-", "Resta");
    }
 
    calcular(a: number, b: number): number {
        return a - b;
    }
}
 
export default Resta;