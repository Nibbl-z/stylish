import type { BlueprintQuantity, MaterialQuantity } from "./constants"

export const global: {
    materials: MaterialQuantity[],
    blueprints: BlueprintQuantity[]
} = $state({
    materials: [],
    blueprints: []
})