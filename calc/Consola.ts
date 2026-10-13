import promptSync from "prompt-sync";
 
class Consola {
    private readonly prompt = promptSync();
 
    mostrar(texto: string): void {
        console.log(texto);
    }
 
    leerTexto(mensaje: string): string {
        return this.prompt(mensaje).trim();
    }
 
    // Repite la pregunta hasta que la persona ingrese un número válido.
    // Acepta coma o punto decimal (ej: 2,5 o 2.5).
    leerNumero(mensaje: string): number {
        let valor: number;
        do {
            const texto: string = this.leerTexto(mensaje).replace(",", ".");
            valor = texto === "" ? NaN : Number(texto);
 
            if (!Number.isFinite(valor)) {
                this.mostrar("Ingrese un numero valido.");
            }
        } while (!Number.isFinite(valor));
 
        return valor;
    }
}
 
export default Consola;