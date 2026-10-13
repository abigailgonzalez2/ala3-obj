import Tarea from "./Tarea";
import GestorTareas from "./GestorTareas";
import MenuPrincipal from "./MenuPrincipal";
 
const gestor: GestorTareas = new GestorTareas();
 
// TAREAS DE PRUEBA
gestor.agregar(new Tarea("Estudiar JavaScript"));
gestor.agregar(new Tarea("Hacer trabajo práctico"));
gestor.agregar(new Tarea("Ordenar la habitación"));
gestor.agregar(new Tarea("Aprender Node.js"));
 
new MenuPrincipal(gestor).ejecutar();
 