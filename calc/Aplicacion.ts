import Calculadora from "./Calculadora";
import Consola from "./Consola";
 
class Aplicacion {
    private readonly calculadora: Calculadora;
    private readonly consola: Consola;
 
    constructor(calculadora: Calculadora, consola: Consola) {
        this.calculadora = calculadora;
        this.consola = consola;
    }
 
    ejecutar(): void {
        this.consola.mostrar("===== CALCULADORA =====");
 
        const primero: number = this.consola.leerNumero("Ingrese el primer operando: ");
        const operador: string = this.pedirOperador();
        const segundo: number = this.consola.leerNumero("Ingrese el segundo operando: ");
 
        try {
            this.consola.mostrar(this.calculadora.resolver(primero, operador, segundo));
        } catch (error) {
            if (error instanceof Error) {
                this.consola.mostrar("Error: " + error.message);
            }
        }
    }
 
    // Repite la pregunta hasta que el operador sea uno de los que conoce la calculadora.
    private pedirOperador(): string {
        const simbolos: string = this.calculadora.getSimbolos().join(", ");
        let operador: string;
        do {
            operador = this.consola.leerTexto("Ingrese el operador (" + simbolos + "): ");
 
            if (!this.calculadora.esOperadorValido(operador)) {
                this.consola.mostrar("Operador invalido. Use uno de estos: " + simbolos);
            }
        } while (!this.calculadora.esOperadorValido(operador));
 
        return operador;
    }
}
 
export default Aplicacion;