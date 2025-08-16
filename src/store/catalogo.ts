// src/store/catalogo.ts
import { create } from "zustand";
import type { Material } from "../types/domain";
import seedArray from "../data/catalogo.ar.json"; // importa el JSON (necesita resolveJsonModule)

type CatalogoState = {
  materiales: Record<string, Material>;
  cargarSemilla: () => void;
};

function arrayToRecord(arr: Material[]): Record<string, Material> {
  return arr.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {} as Record<string, Material>);
}

export const useCatalogo = create<CatalogoState>((set, get) => ({
  materiales: {},
  cargarSemilla: () => {
    // Cargar solo si está vacío
    if (Object.keys(get().materiales).length === 0) {
      const record = arrayToRecord(seedArray as unknown as Material[]);
      set({ materiales: record });
    }
  },
}));
