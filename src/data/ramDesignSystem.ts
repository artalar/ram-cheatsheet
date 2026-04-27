export type AxisId =
	| "primaryRole"
	| "typicalHost"
	| "interfaceWidth"
	| "latencyProfile"
	| "powerProfile"
	| "upgradability"
	| "signalPath";

export type AxisScore = "low" | "mid" | "high" | "veryHigh" | "variable";

export interface DesignAxis {
	id: AxisId;
	label: string;
	shortLabel: string;
	description: string;
	lowEndMeaning: string;
	highEndMeaning: string;
}

export const designAxes: DesignAxis[] = [
	{
		id: "primaryRole",
		label: "Primary job in the system",
		shortLabel: "Role",
		description:
			"Whether the memory mainly feeds a general-purpose CPU, a wide parallel accelerator, or a power-constrained mobile SoC.",
		lowEndMeaning: "Specialized (graphics or AI stacks)",
		highEndMeaning: "General-purpose system RAM",
	},
	{
		id: "typicalHost",
		label: "Typical host",
		shortLabel: "Host",
		description: "The class of device where you most often see this technology in 2026.",
		lowEndMeaning: "Niche or emerging",
		highEndMeaning: "Everywhere (desktops, laptops, servers)",
	},
	{
		id: "interfaceWidth",
		label: "Effective width / parallelism",
		shortLabel: "Width",
		description:
			"How many bits move in parallel between the controller and DRAM. Wider interfaces favor throughput; narrower ones simplify routing and cost.",
		lowEndMeaning: "Narrow (64-bit class channels)",
		highEndMeaning: "Extremely wide (HBM-style stacks)",
	},
	{
		id: "latencyProfile",
		label: "Access latency tendency",
		shortLabel: "Latency",
		description:
			"First-byte and random-access behavior in typical configurations. Marketing MHz does not equal lower nanoseconds.",
		lowEndMeaning: "Often favors low absolute latency",
		highEndMeaning: "Often trades latency for bandwidth",
	},
	{
		id: "powerProfile",
		label: "Power budget",
		shortLabel: "Power",
		description: "Whether the technology is optimized to sip watts at idle or to feed huge bandwidth regardless of draw.",
		lowEndMeaning: "Performance-first (hotter)",
		highEndMeaning: "Mobile / efficiency-first",
	},
	{
		id: "upgradability",
		label: "User serviceability",
		shortLabel: "Slots",
		description: "Can you replace or add modules without a reflow station?",
		lowEndMeaning: "Soldered or stacked",
		highEndMeaning: "Sockets and standards",
	},
	{
		id: "signalPath",
		label: "Electrical complexity",
		shortLabel: "Signals",
		description:
			"How far and how clean signals must travel. Registered modules and clock drivers exist to keep high speeds stable across many DRAM chips.",
		lowEndMeaning: "Short traces, few intermediaries",
		highEndMeaning: "Buffers, repeaters, or wide packages",
	},
];

export interface AxisScores {
	primaryRole: AxisScore;
	typicalHost: AxisScore;
	interfaceWidth: AxisScore;
	latencyProfile: AxisScore;
	powerProfile: AxisScore;
	upgradability: AxisScore;
	signalPath: AxisScore;
}

export interface RamKind {
	slug: string;
	acronym: string;
	fullName: string;
	tagline: string;
	color: string;
	glow: string;
	category: "system" | "graphics" | "mobile" | "datacenter" | "roadmap";
	summary: string;
	validatedNotes: string[];
	extensions: string[];
	axes: AxisScores;
}

export const ramKinds: RamKind[] = [
	{
		slug: "ddr5-sdram",
		acronym: "DDR5 SDRAM",
		fullName: "Double Data Rate 5 Synchronous Dynamic Random-Access Memory",
		tagline: "The mainstream PC memory generation",
		color: "#5eead4",
		glow: "rgba(94, 234, 212, 0.45)",
		category: "system",
		summary:
			"DDR5 is the dominant JEDEC SDRAM generation for desktops and laptops in 2026. It raises per-module capacity and bandwidth with features like on-module power management and split sub-channels.",
		validatedNotes: [
			"Correct: DDR5 is the current mainstream SDRAM generation for new PCs.",
			"Nuance: DDR5 is not characterized by “very low latency.” CAS latency numbers are typically higher than DDR4, while absolute latency in nanoseconds is often similar because clocks are faster.",
			"DDR5’s headline wins are bandwidth, density, and architecture ( PMIC on DIMM, more banks ), not a latency revolution.",
		],
		extensions: [
			"Compare kits using nanoseconds ( CAS × 2000 ÷ MT/s ), not only CL labels.",
			"EXPO and XMP profiles are overclocking metadata; JEDEC defines baseline speeds.",
		],
		axes: {
			primaryRole: "high",
			typicalHost: "veryHigh",
			interfaceWidth: "mid",
			latencyProfile: "mid",
			powerProfile: "mid",
			upgradability: "high",
			signalPath: "variable",
		},
	},
	{
		slug: "gddr",
		acronym: "GDDR6 / 6X / 7",
		fullName: "Graphics Double Data Rate SDRAM",
		tagline: "VRAM for GPUs",
		color: "#a78bfa",
		glow: "rgba(167, 139, 250, 0.45)",
		category: "graphics",
		summary:
			"GDDR families sit beside the GPU die and chase enormous per-pin bandwidth for frame buffers and compute workloads. They are optimized for throughput on a wide memory bus, not for the lowest random access latency.",
		validatedNotes: [
			"Correct: GDDR is GPU-attached “VRAM,” distinct from socketed PC SDRAM.",
			"Qualitative: GDDR typically runs a much wider effective interface than a single DDR channel and is built for streaming bandwidth.",
			"Latency and power are workload-dependent; “3–5× worse” than DDR is a rough intuition, not a universal constant across all SKUs and access patterns.",
		],
		extensions: [
			"PAM signaling ( where used ) pushes more bits per clock at the cost of analog complexity.",
			"Board design around the GPU package is as important as the DRAM spec for realized bandwidth.",
		],
		axes: {
			primaryRole: "low",
			typicalHost: "mid",
			interfaceWidth: "veryHigh",
			latencyProfile: "high",
			powerProfile: "high",
			upgradability: "low",
			signalPath: "high",
		},
	},
	{
		slug: "lpddr-unified",
		acronym: "LPDDR5X / LPDDR6",
		fullName: "Low-Power Double Data Rate SDRAM",
		tagline: "Efficiency-first wide memory for SoCs",
		color: "#fb923c",
		glow: "rgba(251, 146, 60, 0.45)",
		category: "mobile",
		summary:
			"LPDDR families prioritize lower voltage states and aggressive power gating. In Apple Silicon and some AMD halo mobile parts, a wide LPDDR interface backs unified memory where the CPU and GPU share the same physical pool—copying between “system RAM” and “VRAM” shrinks or disappears, but contention can surface under simultaneous CPU and GPU pressure.",
		validatedNotes: [
			"Correct: LPDDR is widely used beyond phones—premium laptops and integrated SoCs.",
			"Correct: soldered LPDDR packages are the norm; you do not swap sticks.",
			"Nuanced: “UMA” is also a software/API concept; hardware unified memory here means one physical pool with coherent access paths.",
		],
		extensions: [
			"LPDDR5X speeds in premium laptops often land in the LPDDR5X-7500 to 8533 class; exact tiers depend on vendor binning and SoC support.",
			"Thermal headroom still limits sustained bandwidth—thin chassis vs desktop DIMMs.",
		],
		axes: {
			primaryRole: "mid",
			typicalHost: "high",
			interfaceWidth: "high",
			latencyProfile: "high",
			powerProfile: "veryHigh",
			upgradability: "low",
			signalPath: "mid",
		},
	},
	{
		slug: "hbm",
		acronym: "HBM2e / HBM3 / HBM3e",
		fullName: "High Bandwidth Memory",
		tagline: "3D-stacked DRAM for accelerators",
		color: "#f472b6",
		glow: "rgba(244, 114, 182, 0.45)",
		category: "datacenter",
		summary:
			"HBM stacks multiple DRAM dies vertically and connects them with through-silicon vias ( TSVs ) to present an extremely wide, close-to-logic interface. NVIDIA’s H200 generation advertises on the order of 4.8 TB/s aggregate HBM3e bandwidth; some competing accelerators quote around 6 TB/s class figures.",
		validatedNotes: [
			"Correct: HBM is the bandwidth king for AI and HPC GPUs in the 2020s.",
			"TSV-based stacking is mature but thermally and economically demanding.",
			"Use TB/s when quoting accelerator totals to avoid confusion with GB/s per link.",
		],
		extensions: [
			"Capacity per stack grows by generation; packaging ( interposer, CoWoS-style ) is part of the secret sauce.",
			"Controllers hide much complexity behind wide transactions; latency still matters for irregular access.",
		],
		axes: {
			primaryRole: "low",
			typicalHost: "low",
			interfaceWidth: "veryHigh",
			latencyProfile: "high",
			powerProfile: "high",
			upgradability: "low",
			signalPath: "veryHigh",
		},
	},
	{
		slug: "zam",
		acronym: "ZAM",
		fullName: "Z-Angle Memory (proposed)",
		tagline: "Experimental stacked DRAM aimed at AI infrastructure",
		color: "#38bdf8",
		glow: "rgba(56, 189, 248, 0.45)",
		category: "roadmap",
		summary:
			"Intel and SoftBank’s SAIMEMORY initiative publicizes ZAM as a future stacked-memory direction with a non-vertical interconnect story, positioning it as a long-term alternative to classic HBM stacks. Public materials describe targets such as very large stack capacities and improved power; treat bandwidth multiples and 512 GB/stack claims as vendor roadmaps, not shipping specs.",
		validatedNotes: [
			"Correct directionally: ZAM is presented as a Japan-linked collaboration with a multi-year prototype-to-production arc ( often cited around 2027 prototypes and ~2029 commercialization—subject to change ).",
			"Speculative: “Wireless” or contactless inter-layer links are described in press coverage; exact physics are not fully open.",
			"Contrast with HBM: HBM’s TSV columns are proven but thermally and cost sensitive.",
		],
		extensions: [
			"Watch packaging partners and foundry readiness—new memory geometries usually slip or pivot.",
			"If ZAM delivers, competition benefits buyers of AI accelerators even if you never buy a ZAM module directly.",
		],
		axes: {
			primaryRole: "low",
			typicalHost: "low",
			interfaceWidth: "veryHigh",
			latencyProfile: "variable",
			powerProfile: "variable",
			upgradability: "low",
			signalPath: "veryHigh",
		},
	},
];

function scoreToNumber(score: AxisScore): number {
	const map: Record<AxisScore, number> = {
		low: 1,
		mid: 2,
		high: 3,
		veryHigh: 4,
		variable: 2.5,
	};
	return map[score];
}

export function axisNumericScores(axes: AxisScores): Record<AxisId, number> {
	return {
		primaryRole: scoreToNumber(axes.primaryRole),
		typicalHost: scoreToNumber(axes.typicalHost),
		interfaceWidth: scoreToNumber(axes.interfaceWidth),
		latencyProfile: scoreToNumber(axes.latencyProfile),
		powerProfile: scoreToNumber(axes.powerProfile),
		upgradability: scoreToNumber(axes.upgradability),
		signalPath: scoreToNumber(axes.signalPath),
	};
}
