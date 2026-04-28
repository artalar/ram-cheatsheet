// ─── Qualitative axis enums ────────────────────────────────────────────────────
// Descriptive tags only — no invented scores or numeric benchmarks.

export type UseCase =
  | 'pc-main-memory'
  | 'gpu-memory'
  | 'mobile-embedded'
  | 'accelerator-package'
  | 'server';

export type DramFamily = 'ddr' | 'lpddr' | 'gddr' | 'hbm';

export type Packaging =
  | 'dimm-module'
  | 'so-dimm-module'
  | 'camm-module'
  | 'soldered-bga'
  | 'soldered-pop'
  | 'interposer-stack';

export type ModuleElectricalRole =
  | 'unbuffered'
  | 'registered'
  | 'load-reduced'
  | 'clocked-unbuffered'
  | 'multiplexed-rank';

// ─── Tag type for stat chips ──────────────────────────────────────────────────

export type UseTag = 'Desktop' | 'Workstation' | 'Server' | 'Laptop' | 'Mobile' | 'GPU' | 'Accelerator' | 'Embedded';

// ─── Structured entity types ──────────────────────────────────────────────────

export interface DramStandard {
  /** Machine key, e.g. 'ddr5' */
  readonly id: string;
  /** Display acronym, e.g. 'DDR5' */
  readonly acronym: string;
  /** Full name */
  readonly fullName: string;
  /** Which DRAM family this belongs to */
  readonly family: DramFamily;
  /** Qualitative use-case tags shown as chips */
  readonly useTags: readonly UseTag[];
  /** One-line role description */
  readonly role: string;
  /** Longer description (2–3 sentences) */
  readonly description: string;
  /** Packaging forms this standard appears in */
  readonly packaging: readonly Packaging[];
  /** Module electrical role, if applicable */
  readonly moduleRole?: ModuleElectricalRole;
  /** JEDEC standard reference, if known */
  readonly jedecRef?: string;
  /** SVG motif key — maps to an illustration variant */
  readonly motif: 'chip' | 'bus' | 'stack' | 'module-outline';
}

export interface ModuleStandard {
  /** Machine key, e.g. 'udimm' */
  readonly id: string;
  /** Display acronym, e.g. 'UDIMM' */
  readonly acronym: string;
  /** Full name */
  readonly fullName: string;
  /** Which DRAM standards this module can carry */
  readonly compatibleStandards: readonly string[];
  /** Electrical role of the module */
  readonly moduleRole: ModuleElectricalRole;
  /** One-line role description */
  readonly role: string;
  /** Longer description (2–3 sentences) */
  readonly description: string;
  /** Physical form factor tag */
  readonly formFactor: string;
  /** SVG motif key */
  readonly motif: 'module-outline';
}

// ─── DRAM Standard entries ────────────────────────────────────────────────────

export const dramStandards: readonly DramStandard[] = [
  {
    id: 'ddr5',
    acronym: 'DDR5',
    fullName: 'DDR5 SDRAM',
    family: 'ddr',
    useTags: ['Desktop', 'Workstation', 'Server'],
    role: 'Mainstream PC and workstation main memory.',
    description:
      'Fifth generation of DDR SDRAM for mainstream PC, workstation, and server main memory. Carried on module-based UDIMM, SO-DIMM, RDIMM, and other form factors.',
    packaging: ['dimm-module', 'so-dimm-module', 'soldered-bga'],
    jedecRef: 'JESD79-5',
    motif: 'chip',
  },
  {
    id: 'ddr4',
    acronym: 'DDR4',
    fullName: 'DDR4 SDRAM',
    family: 'ddr',
    useTags: ['Desktop', 'Workstation', 'Server'],
    role: 'Previous-generation mainstream PC and server memory.',
    description:
      'Fourth generation DDR SDRAM, still widely deployed in existing desktop, workstation, and server platforms. Uses UDIMM, SO-DIMM, and RDIMM modules.',
    packaging: ['dimm-module', 'so-dimm-module', 'soldered-bga'],
    jedecRef: 'JESD79-4',
    motif: 'chip',
  },
  {
    id: 'gddr6',
    acronym: 'GDDR6',
    fullName: 'GDDR6 SGRAM',
    family: 'gddr',
    useTags: ['GPU'],
    role: 'Graphics memory for discrete GPUs.',
    description:
      'Graphics DRAM standard designed for GPU memory subsystems. Emphasizes high per-pin data rates and wide memory buses relative to typical PC DIMM channels. Soldered directly to GPU boards.',
    packaging: ['soldered-bga'],
    jedecRef: 'JESD250',
    motif: 'bus',
  },
  {
    id: 'gddr6x',
    acronym: 'GDDR6X',
    fullName: 'GDDR6X SGRAM',
    family: 'gddr',
    useTags: ['GPU'],
    role: 'High-data-rate graphics memory for enthusiast GPUs.',
    description:
      'Extended-performance GDDR variant using PAM4 signalling for higher per-pin throughput on select GPU products. Soldered on-board.',
    packaging: ['soldered-bga'],
    motif: 'bus',
  },
  {
    id: 'gddr7',
    acronym: 'GDDR7',
    fullName: 'GDDR7 SGRAM',
    family: 'gddr',
    useTags: ['GPU'],
    role: 'Next-generation graphics memory standard.',
    description:
      'Latest GDDR standard for GPU memory subsystems with further increased per-pin data rates. Used on newest-generation discrete GPU products.',
    packaging: ['soldered-bga'],
    motif: 'bus',
  },
  {
    id: 'lpddr5x',
    acronym: 'LPDDR5X',
    fullName: 'LPDDR5X SDRAM',
    family: 'lpddr',
    useTags: ['Mobile', 'Laptop', 'Embedded'],
    role: 'Low-power memory for battery-powered and dense designs.',
    description:
      'Low-power DDR family member for phones, thin laptops, and embedded platforms. Typically soldered. LPCAMM2 modularizes LPDDR-class DRAM under the CAMM2 module standard.',
    packaging: ['soldered-bga', 'camm-module'],
    jedecRef: 'JESD209-5',
    motif: 'chip',
  },
  {
    id: 'lpddr6',
    acronym: 'LPDDR6',
    fullName: 'LPDDR6 SDRAM',
    family: 'lpddr',
    useTags: ['Mobile', 'Laptop', 'Embedded'],
    role: 'Latest low-power DRAM standard for mobile SoC platforms.',
    description:
      'Newest LPDDR generation. Appears in single-pool CPU+GPU memory designs on some SoCs as shared physical memory. Typically soldered; LPCAMM2 modules offer an upgradeable alternative.',
    packaging: ['soldered-bga', 'camm-module'],
    motif: 'chip',
  },
  {
    id: 'hbm2e',
    acronym: 'HBM2e',
    fullName: 'HBM2e (High Bandwidth Memory)',
    family: 'hbm',
    useTags: ['Accelerator'],
    role: 'Stacked high-bandwidth memory for AI accelerators.',
    description:
      'Stacked DRAM using through-silicon vias (TSVs). Bandwidth is the headline design goal for accelerator packaging. Aggregate bandwidth figures per accelerator come from vendor specs for named chips.',
    packaging: ['interposer-stack'],
    jedecRef: 'JESD235',
    motif: 'stack',
  },
  {
    id: 'hbm3',
    acronym: 'HBM3',
    fullName: 'HBM3 (High Bandwidth Memory)',
    family: 'hbm',
    useTags: ['Accelerator'],
    role: 'Third-generation stacked memory for high-performance accelerators.',
    description:
      'Third-generation HBM with improved density and bandwidth. Used in high-end AI and compute accelerators. Bandwidth figures are cited per named accelerator product by vendors.',
    packaging: ['interposer-stack'],
    jedecRef: 'JESD238',
    motif: 'stack',
  },
  {
    id: 'hbm3e',
    acronym: 'HBM3E',
    fullName: 'HBM3E (High Bandwidth Memory)',
    family: 'hbm',
    useTags: ['Accelerator'],
    role: 'Extended-performance HBM3 for next-wave accelerators.',
    description:
      'Extended-performance HBM3 variant with higher per-pin data rates. Deployed on the latest accelerator products from NVIDIA and AMD.',
    packaging: ['interposer-stack'],
    motif: 'stack',
  },
] as const;

// ─── Module standard entries ──────────────────────────────────────────────────

export const moduleStandards: readonly ModuleStandard[] = [
  {
    id: 'udimm',
    acronym: 'UDIMM',
    fullName: 'Unbuffered DIMM',
    compatibleStandards: ['ddr4', 'ddr5'],
    moduleRole: 'unbuffered',
    role: 'Standard desktop memory modules.',
    description:
      'Unbuffered DIMM — normal desktop-style modules. DDR SDRAM chips on the module with no register between the memory controller and DRAM for command/address lines (unlike RDIMM).',
    formFactor: 'Full-size DIMM (133.35 mm)',
    motif: 'module-outline',
  },
  {
    id: 'so-dimm',
    acronym: 'SO-DIMM',
    fullName: 'Small Outline DIMM',
    compatibleStandards: ['ddr4', 'ddr5'],
    moduleRole: 'unbuffered',
    role: 'Compact memory modules for laptops and small systems.',
    description:
      'Small-outline DIMM for laptops and small-form-factor systems. Electrically similar to full-size UDIMM but in a physically smaller package.',
    formFactor: 'SO-DIMM (67.6 mm)',
    motif: 'module-outline',
  },
  {
    id: 'rdimm',
    acronym: 'RDIMM',
    fullName: 'Registered DIMM',
    compatibleStandards: ['ddr4', 'ddr5'],
    moduleRole: 'registered',
    role: 'Server modules with command/address registers for signal integrity.',
    description:
      'Registered DIMM uses registering buffers on command/address paths so servers can populate many modules per channel while maintaining signal integrity. Standard for enterprise server platforms.',
    formFactor: 'Full-size DIMM (133.35 mm)',
    motif: 'module-outline',
  },
  {
    id: 'lrdimm',
    acronym: 'LRDIMM',
    fullName: 'Load-Reduced DIMM',
    compatibleStandards: ['ddr4', 'ddr5'],
    moduleRole: 'load-reduced',
    role: 'High-capacity server modules with additional data buffering.',
    description:
      'Load-Reduced DIMM adds further buffering beyond RDIMM for very large memory capacities. Buffers both command/address and data lines to reduce electrical load on the memory controller.',
    formFactor: 'Full-size DIMM (133.35 mm)',
    motif: 'module-outline',
  },
  {
    id: 'cudimm',
    acronym: 'CUDIMM',
    fullName: 'Clocked Unbuffered DIMM',
    compatibleStandards: ['ddr5'],
    moduleRole: 'clocked-unbuffered',
    role: 'Client modules with on-module clock driver for signal integrity at high speeds.',
    description:
      'Clocked Unbuffered DIMM per JEDEC JESD323 family. Includes a client clock driver on the module to improve clock signal integrity at high DDR5 transfer rates. Addresses client-platform signal integrity, distinct from server-focused RDIMM/MRDIMM approaches.',
    formFactor: 'Full-size DIMM (133.35 mm)',
    jedecRef: 'JESD323',
    motif: 'module-outline',
  },
  {
    id: 'csodimm',
    acronym: 'CSODIMM',
    fullName: 'Clocked Small Outline DIMM',
    compatibleStandards: ['ddr5'],
    moduleRole: 'clocked-unbuffered',
    role: 'Compact clocked modules for thin laptops and small systems.',
    description:
      'Clocked SO-DIMM — the small-outline counterpart to CUDIMM, also under JESD323. Includes the same client clock driver in the SO-DIMM form factor for high-speed DDR5 in thin-and-light platforms.',
    formFactor: 'SO-DIMM (67.6 mm)',
    jedecRef: 'JESD323',
    motif: 'module-outline',
  },
  {
    id: 'camm2',
    acronym: 'CAMM2',
    fullName: 'Compression Attached Memory Module 2',
    compatibleStandards: ['ddr5'],
    moduleRole: 'unbuffered',
    role: 'Compression-attached module standard for DDR5 in thin laptops.',
    description:
      'Compression Attached Memory Module family. CAMM2 uses a pressure-mount connector instead of edge-finger insertion, enabling thinner laptop designs while supporting standard DDR5 DRAM.',
    formFactor: 'CAMM2 board (varies)',
    motif: 'module-outline',
  },
  {
    id: 'lpcamm2',
    acronym: 'LPCAMM2',
    fullName: 'Low-Power Compression Attached Memory Module 2',
    compatibleStandards: ['lpddr5x', 'lpddr6'],
    moduleRole: 'unbuffered',
    role: 'Modular LPDDR memory — upgradeable alternative to soldered LPDDR.',
    description:
      'LPCAMM2 pairs LPDDR DRAM with CAMM2 module mechanics. Positioned by vendors as upgradeable vs soldered LPDDR. Vendor docs cite 128-bit interface width per module. Enables LPDDR-class performance in a replaceable module.',
    formFactor: 'CAMM2 board (varies)',
    motif: 'module-outline',
  },
  {
    id: 'mrdimm',
    acronym: 'MRDIMM',
    fullName: 'Multiplexed Rank DIMM',
    compatibleStandards: ['ddr5'],
    moduleRole: 'multiplexed-rank',
    role: 'Server DDR5 modules with multiplexed ranks for higher throughput per channel.',
    description:
      'Multiplexed Rank DIMM — a server DDR5 module direction standardized under JEDEC. Achieves higher effective throughput per channel via multiplexed ranks and associated buffer chips. Distinct from CUDIMM, which addresses client clock integrity rather than server throughput.',
    formFactor: 'Full-size DIMM (133.35 mm)',
    motif: 'module-outline',
  },
] as const;

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getDramStandardById(id: string): DramStandard | undefined {
  return dramStandards.find((s) => s.id === id);
}

export function getModuleStandardById(id: string): ModuleStandard | undefined {
  return moduleStandards.find((m) => m.id === id);
}

export function getStandardsByFamily(family: DramFamily): readonly DramStandard[] {
  return dramStandards.filter((s) => s.family === family);
}

export function getModulesForStandard(standardId: string): readonly ModuleStandard[] {
  return moduleStandards.filter((m) => m.compatibleStandards.includes(standardId));
}

// ─── Comparison matrix data ────────────────────────────────────────────────────

/** All distinct families for filter UI */
export const allFamilies: readonly DramFamily[] = ['ddr', 'lpddr', 'gddr', 'hbm'];

/** All distinct packaging types for filter UI */
export const allPackagingTypes: readonly Packaging[] = [
  'dimm-module',
  'so-dimm-module',
  'camm-module',
  'soldered-bga',
  'soldered-pop',
  'interposer-stack',
];

/** Map of family → display color accent key (matches CSS tokens) */
export const familyAccentMap: Record<DramFamily, string> = {
  ddr: 'cyan',
  lpddr: 'teal',
  gddr: 'amber',
  hbm: 'violet',
};

/** Display labels for packaging types */
export const packagingLabels: Record<Packaging, string> = {
  'dimm-module': 'DIMM Module',
  'so-dimm-module': 'SO-DIMM Module',
  'camm-module': 'CAMM Module',
  'soldered-bga': 'Soldered (BGA)',
  'soldered-pop': 'Soldered (PoP)',
  'interposer-stack': 'Interposer Stack',
};

/** Display labels for module electrical roles */
export const moduleRoleLabels: Record<ModuleElectricalRole, string> = {
  unbuffered: 'Unbuffered',
  registered: 'Registered',
  'load-reduced': 'Load-Reduced',
  'clocked-unbuffered': 'Clocked Unbuffered',
  'multiplexed-rank': 'Multiplexed Rank',
};

/** Display labels for use-case tags */
export const useTagLabels: Record<UseTag, string> = {
  Desktop: 'Desktop',
  Workstation: 'Workstation',
  Server: 'Server',
  Laptop: 'Laptop',
  Mobile: 'Mobile',
  GPU: 'GPU',
  Accelerator: 'Accelerator',
  Embedded: 'Embedded',
};
