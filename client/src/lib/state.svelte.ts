import type { BlueprintQuantity, MaterialQuantity } from "./constants"

export const global: {
    materials: MaterialQuantity[],
    blueprints: BlueprintQuantity[],

    craftable: {
        blueprints: BlueprintQuantity[],
        materials: MaterialQuantity[],
        maxRep: number
    }
} = $state({
    materials: [],
    blueprints: [],

    craftable: {
        materials: [],
        blueprints: [],
        maxRep: 0
    }
})