import Operacion from "./Operacion";
 
// "extends Operacion": Suma ES UNA Operacion (herencia).
class Suma extends Operacion {
    constructor() {
        super("+", "Suma"); // llama al constructor de la clase padre
    }
 
    calcular(a: number, b: number): number {
        return a + b;
    }
}
 
export default Suma;