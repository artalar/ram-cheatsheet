export interface FormFactor {
	slug: string;
	name: string;
	expansion: string;
	oneLiner: string;
	validatedNotes: string[];
	extensions: string[];
	tags: string[];
}

export const formFactors: FormFactor[] = [
	{
		slug: "udimm",
		name: "UDIMM",
		expansion: "Unbuffered DIMM",
		oneLiner: "The familiar 288-pin DDR5 stick for desktops—signals go straight from the CPU memory controller to the DRAM chips ( unbuffered data path ).",
		validatedNotes: [
			"Correct: UDIMM is the standard consumer desktop module style for DDR generations.",
			"Contrast: RDIMMs insert registering buffers for server scalability; UDIMMs trade that for lower additive latency on the data path.",
		],
		extensions: [
			"DIMM width is 64 bits of data per channel ( plus ECC bits if ECC UDIMM ).",
			"Two modules per channel is a common consumer configuration; bandwidth scales with channel count on the CPU.",
		],
		tags: ["desktop", "DDR5", "socketed"],
	},
	{
		slug: "sodimm",
		name: "SO-DIMM",
		expansion: "Small Outline DIMM",
		oneLiner: "Compact modules for laptops and small PCs—same SDRAM families as desktops, smaller PCB and connector.",
		validatedNotes: [
			"Correct: SO-DIMM is the dominant replaceable laptop form factor for DDR4/DDR5.",
		],
		extensions: [
			"Laptops may wire only one slot or solder additional memory—always check the service manual.",
		],
		tags: ["laptop", "DDR5", "socketed"],
	},
	{
		slug: "rdimm",
		name: "RDIMM / LRDIMM",
		expansion: "Registered / Load-Reduced DIMM",
		oneLiner: "Server modules that buffer command/address ( and sometimes data paths in LRDIMM ) so many DIMMs per channel stay electrically stable.",
		validatedNotes: [
			"Correct: RDIMMs are standard in scalable servers; most consumers never handle them.",
			"Trade-off: registering adds latency versus UDIMM but enables higher per-channel DIMM counts and cleaner signaling.",
		],
		extensions: [
			"ECC is common alongside RDIMM in server platforms.",
		],
		tags: ["server", "buffered", "ECC"],
	},
	{
		slug: "lpcamm2",
		name: "LPCAMM2",
		expansion: "Low-Power Compression Attached Memory Module 2",
		oneLiner: "JEDEC module carrying LPDDR5X-class DRAM in a thin replaceable card—often described as ~128-bit host interface with strong power savings versus dual SO-DIMMs.",
		validatedNotes: [
			"Correct: LPCAMM2 standardizes swappable LPDDR in a CAMM2-style connector; vendors publish up to ~8533–9600 MT/s class data rates for premium parts.",
			"Correct: one module can expose a wide interface, avoiding the “two SO-DIMMs for full bandwidth” laptop pattern.",
			"Nuanced: “Compression” refers to the connector/module technology lineage ( CAMM2 family ), not file compression.",
		],
		extensions: [
			"Lenovo and others have shipped LPCAMM2 in premium mobile workstations—adoption is still rolling out industry-wide.",
		],
		tags: ["laptop", "LPDDR5X", "module", "wide"],
	},
	{
		slug: "camm2-ddr5",
		name: "DDR5 CAMM2",
		expansion: "Compression Attached Memory Module 2 ( DDR5 SDRAM )",
		oneLiner: "DDR5 SDRAM on the CAMM2 connector—still DDR5 electricals, new module outline for thin systems ( not the same thing as LPCAMM2’s LPDDR silicon ).",
		validatedNotes: [
			"Correction vs the original post: CAMM2 is a JEDEC module family; ASUS helped popularize early demos, but it is not an ASUS-only fantasy.",
			"DDR5 CAMM2 and LPCAMM2 share connector lineage but use different DRAM types ( DDR5 vs LPDDR5X ).",
		],
		extensions: [
			"CAMM2 targets thinner z-height and potentially simpler routing than twin SO-DIMMs in constrained chassis.",
		],
		tags: ["laptop", "DDR5", "module"],
	},
	{
		slug: "cudimm",
		name: "CUDIMM / CSODIMM",
		expansion: "Clocked Unbuffered DIMM / Clocked SO-DIMM",
		oneLiner: "DDR5 modules with an on-module Client Clock Driver ( CKD ) that regenerates the clock for cleaner timing at very high data rates ( often discussed around 6400 MT/s and up ).",
		validatedNotes: [
			"Correct: JEDEC and major vendors describe CUDIMM as adding a clock driver while keeping the data path unbuffered.",
			"Note: “HUDIMM” is not a widely standardized synonym in public JEDEC naming—treat it as informal or conflate with marketing copy; stick to CUDIMM/CSODIMM for precision.",
			"Correct directionally: higher sustained MT/s tends to increase power and thermals—physics still applies.",
		],
		extensions: [
			"Motherboard BIOS must understand the module type to exploit top speeds; fallback profiles exist for compatibility.",
		],
		tags: ["DDR5", "signal integrity", "desktop", "laptop"],
	},
	{
		slug: "mrdimm",
		name: "MRDIMM",
		expansion: "Multiplexed Rank DIMM ( server DDR5 direction )",
		oneLiner: "Emerging server-side ecosystem ( MRDIMM / related Gen5 modules ) aimed at higher per-channel throughput for Xeon-class platforms—distinct from client CUDIMM.",
		validatedNotes: [
			"Nuanced: the industry uses several related names ( including MCR/MRDIMM family discussions ); exact branding evolves—check Intel and JEDEC press for the precise generation you mean.",
			"Conceptually similar motivation to CUDIMM: tame electrical limits at extreme speeds, but for multi-rank server topologies.",
		],
		extensions: [
			"If you are buying servers, match CPU generation, DIMM keying, and validated vendor lists—this space moves quickly.",
		],
		tags: ["server", "DDR5", "multiplexed"],
	},
];
