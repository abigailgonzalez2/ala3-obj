import Operacion from "./Operacion";
 
class Calculadora {
    // COMPOSICIÓN: una Calculadora "tiene" una lista de Operacion.
    private readonly operaciones: Operacion[];
 
    // Las operaciones se reciben por el constructor (inyección de dependencias),
    // así se puede agregar una nueva sin modificar esta clase.
    constructor(operaciones: Operacion[]) {
        this.operaciones = operaciones;
    }
 
    getSimbolos(): string[] {
        const simbolos: string[] = [];
        for (let i = 0; i < this.operaciones.length; i++) {
            simbolos.push(this.operaciones[i].getSimbolo());
        }
        return simbolos;
    }
 
    esOperadorValido(simbolo: string): boolean {
        return this.buscar(simbolo) !== undefined;
    }
 
    resolver(a: number, simbolo: string, b: number): string {
        const operacion: Operacion | undefined = this.buscar(simbolo);
 
        if (operacion === undefined) {
            throw new Error("Operador invalido: " + simbolo);
        }
 
        // POLIMORFISMO: acá no sabemos si "operacion" es una Suma, una Resta,
        // etc. Cada una responde a calcular() a su manera.
        const resultado: number = operacion.calcular(a, b);
        return operacion.formatear(a, b, resultado);
    }
 
    // Método privado: es un detalle interno que no debe usarse desde afuera.
    private buscar(simbolo: string): Operacion | undefined {
        for (let i = 0; i < this.operaciones.length; i++) {
            if (this.operaciones[i].getSimbolo() === simbolo) {
                return this.operaciones[i];
            }
        }
        return undefined;
    }
}
 
export default Calculadora;