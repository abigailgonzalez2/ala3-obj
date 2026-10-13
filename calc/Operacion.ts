abstract class Operacion {
    // "private readonly": solo se pueden leer desde afuera con los getters,
    // y no se pueden modificar después de creados (ENCAPSULAMIENTO).
    private readonly simbolo: string;
    private readonly nombre: string;
 
    constructor(simbolo: string, nombre: string) {
        this.simbolo = simbolo;
        this.nombre = nombre;
    }
 
    getSimbolo(): string {
        return this.simbolo;
    }
 
    getNombre(): string {
        return this.nombre;
    }
 
    // Método abstracto: no tiene cuerpo. Cada subclase está OBLIGADA a
    // implementarlo; si una no lo hace, TypeScript marca error al compilar.
    abstract calcular(a: number, b: number): number;
 
    // Método concreto: lo heredan TODAS las subclases sin reescribirlo
    // (reutilización de código por HERENCIA).
    formatear(a: number, b: number, resultado: number): string {
        return a + " " + this.simbolo + " " + b + " = " + resultado;
    }
}
 
export default Operacion;