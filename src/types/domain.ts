// src/types/domain.ts

// Unidades posibles (ej: metros lineales, piezas, cajas, kg, etc.)
export type Unidad = "pieza" | "m" | "m2" | "kg" | "caja";

// Material estándar que cargamos en el catálogo
export interface Material {
  id: string; // identificador único
  nombre: string; // "Placa 12.5mm 1.20x2.40"
  categoria: "placa" | "perfil" | "tornillo" | "compuesto" | "cinta" | "otro";
  largo_mm?: number; // longitud en mm (para placas/perfiles)
  ancho_mm?: number; // ancho en mm (para placas)
  espesor_mm?: number; // espesor si aplica
  unidad: Unidad;
  cobertura_m2?: number; // cobertura (ej: masilla por balde, cinta por rollo)
  piezas_por_caja?: number; // si aplica (ej: tornillos)
  desperdicio_pct: number; // % de desperdicio
}

// Parámetros para calcular un muro
export interface ParametrosCalculoMuro {
  ancho_m: number;
  alto_m: number;
  separacion_montantes_mm: 400 | 600;
  doble_placa: boolean; // simple o doble placa por cara
  caras: 1 | 2; // 1 cara o 2 caras
  aberturas?: { ancho_m: number; alto_m: number }[]; // puertas/ventanas
  tornillos_por_m2: number; // configurable
}

// Resultado de cálculo: lista de materiales y detalle
export interface ItemResultado {
  materialId: string;
  cantidad: number;
  unidad: Unidad;
  nota?: string; // explicación de dónde sale
}

export interface ResultadoCalculo {
  items: ItemResultado[];
  detalle: string[]; // pasos/fórmulas usados
  m2_cubiertos: number; // superficie cubierta
}
