// src/engine/muro.ts
import type {
  Material,
  ParametrosCalculoMuro,
  ResultadoCalculo,
  ItemResultado,
} from "../types/domain";

/** Redondeo hacia arriba con control (evita floats raros) */
const ceil = (x: number) => Math.ceil(Number.EPSILON + x);

/** Área efectiva del muro descontando aberturas (m²) */
export function areaMuro(params: ParametrosCalculoMuro): number {
  const { ancho_m, alto_m, aberturas = [] } = params;
  const areaBruta = ancho_m * alto_m;
  const areaAberturas = aberturas.reduce((a, b) => a + b.ancho_m * b.alto_m, 0);
  const area = Math.max(areaBruta - areaAberturas, 0);
  return area;
}

/** m² de placa totales según caras y simple/doble placa */
function m2Placa(params: ParametrosCalculoMuro): number {
  const base = areaMuro(params);
  const factorPlacaPorCara = params.doble_placa ? 2 : 1;
  return base * params.caras * factorPlacaPorCara;
}

/** m² que cubre 1 placa del catálogo */
function m2PorPlaca(placa: Material): number {
  const w = (placa.ancho_mm ?? 1200) / 1000;
  const h = (placa.largo_mm ?? 2400) / 1000;
  return w * h;
}

/** Aplica % de desperdicio a una cantidad */
function conDesperdicio(qty: number, pct: number): number {
  return qty * (1 + pct / 100);
}

/**
 * Calcula materiales para un muro.
 * ids: qué material del catálogo usar para cada rol.
 *
 * Devuelve: ResultadoCalculo con items e instrucciones (detalle).
 */
export function calcularMuro(
  params: ParametrosCalculoMuro,
  catalogo: Record<string, Material>,
  ids: {
    placa: string;
    montante: string; // perfil C
    solera: string; // perfil U
    tornillo: string; // caja/bolsa de tornillos (con piezas_por_caja)
    masilla?: string;
    cinta?: string;
  }
): ResultadoCalculo {
  const detalle: string[] = [];
  const items: ItemResultado[] = [];

  // --- 1) Superficies
  const m2Base = areaMuro(params);
  const m2Placas = m2Placa(params);
  detalle.push(
    `Área efectiva = ancho*alto - aberturas = ${m2Base.toFixed(2)} m²`,
    `Placas: caras=${params.caras}, ${params.doble_placa ? "doble" : "simple"} → ${m2Placas.toFixed(
      2
    )} m²`
  );

  // --- 2) Montantes
  const sep_m = params.separacion_montantes_mm / 1000;
  const lineasMontantes = ceil(params.ancho_m / sep_m) + 1; // +1 línea final
  const montante = catalogo[ids.montante];
  const largoPerfil_m = (montante?.largo_mm ?? 2600) / 1000;
  const piezasMontantes = ceil(
    conDesperdicio((lineasMontantes * params.alto_m) / largoPerfil_m, montante?.desperdicio_pct ?? 0)
  );
  items.push({
    materialId: ids.montante,
    cantidad: piezasMontantes,
    unidad: montante.unidad,
    nota: `~${lineasMontantes} líneas a ${params.separacion_montantes_mm} mm`,
  });
  detalle.push(
    `Montantes: sep=${params.separacion_montantes_mm} mm ⇒ líneas=${lineasMontantes}, piezas=${piezasMontantes}`
  );

  // --- 3) Soleras (superior + inferior)
  const solera = catalogo[ids.solera];
  const largoSolera_m = (solera?.largo_mm ?? 2600) / 1000;
  const linealesSolera_m = 2 * params.ancho_m;
  const piezasSolera = ceil(conDesperdicio(linealesSolera_m / largoSolera_m, solera?.desperdicio_pct ?? 0));
  items.push({
    materialId: ids.solera,
    cantidad: piezasSolera,
    unidad: solera.unidad,
    nota: `Solera superior e inferior: ${linealesSolera_m.toFixed(2)} m`,
  });
  detalle.push(
    `Soleras: 2*ancho=${linealesSolera_m.toFixed(2)} m ⇒ piezas=${piezasSolera}`
  );

  // --- 4) Placas
  const placa = catalogo[ids.placa];
  const placaM2 = m2PorPlaca(placa);
  const placasNecesarias = ceil(conDesperdicio(m2Placas / placaM2, placa?.desperdicio_pct ?? 0));
  items.push({
    materialId: ids.placa,
    cantidad: placasNecesarias,
    unidad: placa.unidad,
    nota: `${m2Placas.toFixed(2)} m² efectivos`,
  });
  detalle.push(
    `Placas: (m² totales / m² por placa=${placaM2.toFixed(2)}) + desperdicio ⇒ ${placasNecesarias}`
  );

  // --- 5) Tornillos (por m² de placa)
  const torn = catalogo[ids.tornillo];
  const porCaja = torn?.piezas_por_caja ?? 1000;
  const tornNecesarios = ceil(m2Placas * params.tornillos_por_m2);
  const cajasTornillos = ceil(tornNecesarios / porCaja);
  items.push({
    materialId: ids.tornillo,
    cantidad: cajasTornillos,
    unidad: torn.unidad,
    nota: `${tornNecesarios} tornillos (~${params.tornillos_por_m2}/m²)`,
  });
  detalle.push(
    `Tornillos: m² placas * ${params.tornillos_por_m2}/m² = ${tornNecesarios} ⇒ cajas=${cajasTornillos}`
  );

  // --- 6) Masilla y Cinta (si existen en catálogo con cobertura)
  if (ids.masilla) {
    const masilla = catalogo[ids.masilla];
    if (masilla?.cobertura_m2) {
      const baldes = ceil(conDesperdicio(m2Placas / masilla.cobertura_m2, masilla.desperdicio_pct ?? 0));
      items.push({
        materialId: ids.masilla,
        cantidad: baldes,
        unidad: masilla.unidad,
        nota: `Cobertura ${masilla.cobertura_m2} m²/balde`,
      });
      detalle.push(`Masilla: m² placas / cobertura = ${baldes} balde(s)`);
    }
  }

  if (ids.cinta) {
    const cinta = catalogo[ids.cinta];
    if (cinta?.cobertura_m2) {
      const rollos = ceil(conDesperdicio(m2Placas / cinta.cobertura_m2, cinta.desperdicio_pct ?? 0));
      items.push({
        materialId: ids.cinta,
        cantidad: rollos,
        unidad: cinta.unidad,
        nota: `Cobertura ${cinta.cobertura_m2} m²/rollo`,
      });
      detalle.push(`Cinta: m² placas / cobertura = ${rollos} rollo(s)`);
    }
  }

  return {
    items,
    detalle,
    m2_cubiertos: m2Placas,
  };
}
