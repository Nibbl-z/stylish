export enum Rarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary",
    MYTHIC = "Mythic"
}

export const rarityStyles: {[rarity in Rarity] : string} = {
    Common : "text-common",
    Uncommon : "text-uncommon",
    Rare : "text-rare",
    Epic : "text-epic",
    Legendary : "text-legendary",
    Mythic : "text-mythic"
}

export enum Theme {
    Magical = "Magical",
    Mechanical = "Mechanical",
    Natural = "Natural",
    Oceanic = "Oceanic",
    PowerShard = "Power Shard",
    Cluster = "Cluster",
    StyleSoul = "StyleSoul"
}

export enum BlueprintTheme {
    Magical = "Magical",
    Mechanical = "Mechanical",
    Natural = "Natural",
    Oceanic = "Oceanic",
}

export enum BlueprintCategory {
    Standard = "Standard",
    Exclusive = "Exclusive",
    Arcane = "Arcane"
}

export interface Asset {
    name: string
    rarity: Rarity
}

export interface Material extends Asset {
    theme: Theme
}

export interface AssetQuantity {
    asset: Asset,
    amount: number
}

export interface MaterialQuantity {
    asset: Material,
    amount: number
}

export interface BlueprintQuantity {
    asset: Blueprint,
    amount: number
}

export interface Blueprint extends Asset {
    theme: BlueprintTheme,
    category: BlueprintCategory
}

export const materials: Material[] = [
    {name: "Foggy Crystal", rarity: Rarity.COMMON, theme: Theme.Magical},
    {name: "Iron Bolt", rarity: Rarity.COMMON, theme: Theme.Mechanical},
    {name: "Pale Bloom", rarity: Rarity.COMMON, theme: Theme.Natural},
    {name: "Bland Water", rarity: Rarity.COMMON, theme: Theme.Oceanic},
    {name: "Common Power Shard", rarity: Rarity.COMMON, theme: Theme.PowerShard},
    {name: "Common Material Cluster", rarity: Rarity.COMMON, theme: Theme.Cluster},

    {name: "Jade Eye", rarity: Rarity.UNCOMMON, theme: Theme.Magical},
    {name: "Copper Chunk", rarity: Rarity.UNCOMMON, theme: Theme.Mechanical},
    {name: "Verdant Moss", rarity: Rarity.UNCOMMON, theme: Theme.Natural},
    {name: "Seaweed Goo", rarity: Rarity.UNCOMMON, theme: Theme.Oceanic},
    {name: "Uncommon Power Shard", rarity: Rarity.UNCOMMON, theme: Theme.PowerShard},
    {name: "Uncommon Material Cluster", rarity: Rarity.UNCOMMON, theme: Theme.Cluster},

    {name: "Frigid Sapphire", rarity: Rarity.RARE, theme: Theme.Magical},
    {name: "Cobalt Rod", rarity: Rarity.RARE, theme: Theme.Mechanical},
    {name: "Sky Poppy", rarity: Rarity.RARE, theme: Theme.Natural},
    {name: "Deep Brine", rarity: Rarity.RARE, theme: Theme.Oceanic},
    {name: "Rare Power Shard", rarity: Rarity.RARE, theme: Theme.PowerShard},
    {name: "Rare Material Cluster", rarity: Rarity.RARE, theme: Theme.Cluster},

    {name: "Amethyst Tablet", rarity: Rarity.EPIC, theme: Theme.Magical},
    {name: "Titanium Plate", rarity: Rarity.EPIC, theme: Theme.Mechanical},
    {name: "Nightshade Lily", rarity: Rarity.EPIC, theme: Theme.Natural},
    {name: "Virulent Vial", rarity: Rarity.EPIC, theme: Theme.Oceanic},
    {name: "Epic Power Shard", rarity: Rarity.EPIC, theme: Theme.PowerShard},
    {name: "Epic Material Cluster", rarity: Rarity.EPIC, theme: Theme.Cluster},

    {name: "Crystallized Sunset", rarity: Rarity.LEGENDARY, theme: Theme.Magical},
    {name: "Solarflame Bar", rarity: Rarity.LEGENDARY, theme: Theme.Mechanical},
    {name: "Sparkling Sunflower", rarity: Rarity.LEGENDARY, theme: Theme.Natural},
    {name: "Bottled Sunrise", rarity: Rarity.LEGENDARY, theme: Theme.Oceanic},
    {name: "Legendary Power Shard", rarity: Rarity.LEGENDARY, theme: Theme.PowerShard},
    {name: "Legendary Material Cluster", rarity: Rarity.LEGENDARY, theme: Theme.Cluster},

    {name: "Material Singularity", rarity: Rarity.MYTHIC, theme: Theme.Cluster},
    {name: "Mythic Power Shard", rarity: Rarity.MYTHIC, theme: Theme.PowerShard},
    {name: "Style Soul", rarity: Rarity.MYTHIC, theme: Theme.StyleSoul}
]

export const blueprintCosts: {
    [category in BlueprintCategory] : {
        [rarity: string] : {rarity: Rarity, amount: number, theme?: Theme}[]
    }
} = {
    Standard : {
        Common : [{rarity: Rarity.COMMON, amount: 5}],
        Uncommon : [{rarity: Rarity.COMMON, amount: 6}, {rarity: Rarity.UNCOMMON, amount: 3}],
        Rare : [{rarity: Rarity.COMMON, amount: 8}, {rarity: Rarity.UNCOMMON, amount: 4}, {rarity: Rarity.RARE, amount: 2}],
        Epic : [{rarity: Rarity.COMMON, amount: 10}, {rarity: Rarity.UNCOMMON, amount: 5}, {rarity: Rarity.RARE, amount: 3}, {rarity: Rarity.EPIC, amount: 2}],
        Legendary : [{rarity: Rarity.COMMON, amount: 15}, {rarity: Rarity.UNCOMMON, amount: 7}, {rarity: Rarity.RARE, amount: 5}, {rarity: Rarity.EPIC, amount: 3}, {rarity: Rarity.LEGENDARY, amount: 2}],
        Mythic: [
            {rarity: Rarity.RARE, amount: 3, theme: Theme.Cluster},
            {rarity: Rarity.EPIC, amount: 2, theme: Theme.Cluster},
            {rarity: Rarity.LEGENDARY, amount: 1, theme: Theme.Cluster},
            {rarity: Rarity.EPIC, amount: 1, theme: Theme.PowerShard},
            {rarity: Rarity.LEGENDARY, amount: 1, theme: Theme.PowerShard}
        ]
    },
    Exclusive : {
        Rare : [{rarity: Rarity.COMMON, amount: 15}, {rarity: Rarity.UNCOMMON, amount: 7}, {rarity: Rarity.RARE, amount: 5}, {rarity: Rarity.RARE, amount: 1, theme: Theme.PowerShard}],
        Epic : [{rarity: Rarity.COMMON, amount: 25}, {rarity: Rarity.UNCOMMON, amount: 12}, {rarity: Rarity.RARE, amount: 6}, {rarity: Rarity.EPIC, amount: 4}, {rarity: Rarity.EPIC, amount: 1, theme: Theme.PowerShard}],
        Legendary: [{rarity: Rarity.UNCOMMON, amount: 20}, {rarity: Rarity.RARE, amount: 12}, {rarity: Rarity.EPIC, amount: 7}, {rarity: Rarity.LEGENDARY, amount: 5}, {rarity: Rarity.LEGENDARY, amount: 1, theme: Theme.PowerShard}],
        Mythic: [
            {rarity: Rarity.RARE, amount: 12, theme: Theme.Cluster},
            {rarity: Rarity.EPIC, amount: 7, theme: Theme.Cluster},
            {rarity: Rarity.LEGENDARY, amount: 3, theme: Theme.Cluster},
            {rarity: Rarity.LEGENDARY, amount: 1, theme: Theme.PowerShard},
            {rarity: Rarity.MYTHIC, amount: 1, theme: Theme.PowerShard}
        ]
    },
    Arcane : {
        Mythic: [
            {rarity: Rarity.MYTHIC, amount: 3, theme: Theme.Cluster},
            {rarity: Rarity.MYTHIC, amount: 5, theme: Theme.PowerShard},
            {rarity: Rarity.MYTHIC, amount: 5, theme: Theme.StyleSoul}
        ]
    }
}

export const scavengingTrophies: {
    [category in BlueprintCategory] : {
        [rarity: string] : number
    }
} = {
    Standard: {
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 5,
        Legendary: 7,
        Mythic: 10
    },
    Exclusive: {
        Rare: 6,
        Epic: 10,
        Legendary: 14,
        Mythic: 20
    },
    Arcane: {
        Mythic: 30
    }
}

export const blueprints: Blueprint[] = [
    // Mechanic Crate
    {
        name: "Toolbox",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wrench (Pipe)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Hair Dryer",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Mechanic's Cap",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Gauntlet",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Holosword",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Night Vision Goggles",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Holosword (Serrated)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Night Vision Goggles (Arachno)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fire Fist",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Hothead",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Gauntlet (Elemental)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Hothead (Explode)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    // Engineer Crate
    {
        name: "Hammer (Welding)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wrench",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Hard Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Welding Mask",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Blowtorch",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Gearhead",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Hard Hat (Headlight)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wrench (Giga)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Welding Mask (At Work)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Chainsaw Hand",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Beam Sword",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Drill Arm",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Beam Sword (Dual)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Mechanical,
        category: BlueprintCategory.Standard
    },
    // Fruit Crate
    {
        name: "Banana",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sprouted",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sun Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sun Hat (Bow)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Blockle Tea",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sprouted (Bloom)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Bucket Hat (Strawberry)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Banana Head",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fruit Crown",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Strawberry Head",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Banana Head (Peeled)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Flower Umbrella",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Banana Head (Crazy Nana)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    // Garden Crate
    {
        name: "Rose",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Trowel",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Straw Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sun Hat (Outline)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Watering Can",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Bucket Hat (Floral)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Flower Crown",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Toadstool",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Bouquet",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fire Fist (Soul)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Gnome",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Toadstool (Fungi)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    {
        name: "Gnome (Botanical)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Natural,
        category: BlueprintCategory.Standard
    },
    // Sailor Crate
    {
        name: "Oar",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plunderer's Bandana",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sailor Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Snorkel",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Harpoon",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fishing Hat",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sailor Hat (Striped)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Harpoon (Sharkbait)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Diving Helmet",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fire Fist (Energy)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fishbowl",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Arm Cannon (Buccaneer)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Diving Helment (Raptured)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    // Plunder Crate
    {
        name: "Oar (Shipwrecked)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hook",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Viking Shield (Black)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plunderer's Bandana (Skull)",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Cutlass",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Lantern",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Spyglass",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hook (Gold-Trim)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hat",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hat (Barnacles)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Skull (Scallywag)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hook (Phantom)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    {
        name: "Pirate Hat (Phantom)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Oceanic,
        category: BlueprintCategory.Standard
    },
    // Magician Crate
    {
        name: "Playing Cards",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Magicians's Wand",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "3D Glasses",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Top Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Shaman Staff",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Sparkler",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "8-Ball (Classic)",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plague Doctor Staff",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plague Doctor",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plague Doctor Staff (Steampunk)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "8-Ball (Holographic)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "8-Ball (Golden)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Plague Doctor (Steampunk)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    // Wizardry Crate
     {
        name: "Book",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fez",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Party Hat",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wicked Horns",
        rarity: Rarity.COMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Witch's Broom",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wizard Staff",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Witch Hat",
        rarity: Rarity.UNCOMMON,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wicked Horns (Curved)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Witch Hat (Striped)",
        rarity: Rarity.RARE,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Fire Fist (Violet)",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Wizard Hat",
        rarity: Rarity.EPIC,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Book (Spellbook)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
    {
        name: "Skull (Flaming)",
        rarity: Rarity.LEGENDARY,
        theme: BlueprintTheme.Magical,
        category: BlueprintCategory.Standard
    },
]

export function getMaterialByName(name: string): Material | undefined {
    return materials.find((material) => material.name == name)
}

export function getMaterial(rarity: Rarity, theme: Theme): Material | undefined {
     return materials.find((material) => material.rarity == rarity && material.theme == theme)
}

export function getBlueprint(name: string): Blueprint | undefined {
    return blueprints.find((blueprint) => "Blueprint: " + blueprint.name + " Token" == name)
}

export function getBlueprintCosts(rarity: Rarity, theme: BlueprintTheme, category: BlueprintCategory): {rarity: Rarity, amount: number, theme: Theme}[] {
    let costs: {rarity: Rarity, amount: number, theme: Theme}[] = []

    blueprintCosts[category][rarity].forEach((cost) => {
        costs = [...costs, 
            {rarity: cost.rarity,
            amount: cost.amount,
            theme: cost.theme || Theme[theme.toString() as keyof typeof Theme]
        }]
    })

    return costs
}