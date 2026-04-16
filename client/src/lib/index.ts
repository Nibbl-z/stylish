// place files you want to import through the `$lib` alias in this folder.
import { BlueprintCategory, blueprintCosts, BlueprintTheme, getBlueprint, getBlueprintCosts, getMaterial, getMaterialByName, Rarity, rarityStyles, scavengingTrophies, Theme, type AssetQuantity, type Blueprint, type BlueprintQuantity, type Material, type MaterialQuantity } from "$lib/constants";
import { global } from "./state.svelte";

export async function getData(username: string) {
    const response = await fetch(`http://localhost:8080/data/${username}`)

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }

    global.materials.length = 0
    global.blueprints.length = 0

    await response.json().then(data => {
        data = JSON.parse(data)
        
        data.data.player.infinibag.forEach((asset : AssetQuantity) => {
            let material = getMaterialByName(asset.asset.name)
            if (material != undefined) {
                global.materials.push({
                    asset: material as Material,
                    amount: asset.amount
                })
            }

            let blueprint = getBlueprint(asset.asset.name)
            if (blueprint != undefined) {
                global.blueprints.push({
                    asset: blueprint as Blueprint,
                    amount: asset.amount
                })
            }
        })

        getTotalBlueprintCosts()
    })
}

export function getTotalBlueprintCosts() {
    var blueprintCounts: Record<string, number> = {}

    global.craftable.blueprints.length = 0
    global.craftable.materials.length = 0

    global.blueprints.forEach((blueprint) => {
        let asset = blueprint.asset
        let key = asset.category.toString() + "_" + asset.rarity.toString() + "_" + asset.theme.toString()

        if (blueprintCounts[key] == undefined) {
            blueprintCounts[key] = blueprint.amount
        } else {
            blueprintCounts[key] += blueprint.amount
        }
    })

    let craftOrder: Rarity[] = [
        Rarity.EPIC, Rarity.LEGENDARY, Rarity.RARE, Rarity.UNCOMMON, Rarity.COMMON
    ]

    let materialCosts: {rarity: Rarity, amount: number, theme: Theme}[] = []

    for (const rarity of craftOrder) {
        // for now, im neglecting exclusives/arcanes because i didnt add those in yet
        
        for (let theme in BlueprintTheme) {
            let count = blueprintCounts["Standard_" + rarity + "_" + theme.toString()]
            if (count == undefined) continue

            let costs = getBlueprintCosts(rarity, BlueprintTheme[theme as keyof typeof BlueprintTheme], BlueprintCategory.Standard)

            var totalCraftable = 0

            for (let i = 0; i < count; i++) {
                var craftable = true

                for (let cost of costs) {
                    let dataMaterial = getMaterialData(cost.rarity, cost.theme)

                    if (dataMaterial == undefined) { // lacking a material for the blueprint, so its not craftable !!
                        craftable = false
                        break
                    }

                    let index = materialCosts.findIndex((value) => {
                        return value.rarity.valueOf() === cost.rarity.valueOf() && value.theme.valueOf() === cost.theme.valueOf()
                    })

                    if (index == -1) {
                        if (cost.amount > dataMaterial.amount) {
                            craftable = false
                            break
                        }
                        materialCosts.push(cost)
                    } else {
                        if (materialCosts[index].amount + cost.amount > dataMaterial.amount) {
                            craftable = false
                            break
                        }
                        materialCosts[index].amount += cost.amount
                    }
                }

                if (craftable) {
                    totalCraftable++
                } else {
                    break
                }
            }
            
            count = totalCraftable
        }
    }

    console.log(blueprintCounts)
    console.log(materialCosts)

    materialCosts.forEach((material) => {
        global.craftable.materials.push({
            amount: material.amount,
            asset: getMaterial(material.rarity, material.theme)!!
        })
    })

    global.blueprints.forEach((blueprint) => {
        let count = blueprintCounts[blueprint.asset.category + "_" + blueprint.asset.rarity + "_" + blueprint.asset.theme]
        console.log(blueprint.asset.rarity, blueprint.asset.theme, count, blueprint.amount)
        if (count - blueprint.amount >= 0) {
            count -= blueprint.amount
            console.log("able to craft this bp, subtracting count to " + count.toString())
            
            global.craftable.blueprints.push(blueprint)
            global.craftable.maxRep += scavengingTrophies[blueprint.asset.category][blueprint.asset.rarity] * blueprint.amount
        } else if (count > 0) {
            global.craftable.blueprints.push({
                amount: count,
                asset: blueprint.asset
            })
            global.craftable.maxRep += scavengingTrophies[blueprint.asset.category][blueprint.asset.rarity] * count
        }
        blueprintCounts[blueprint.asset.category + "_" + blueprint.asset.rarity + "_" + blueprint.asset.theme] = count
    })
}

function getMaterialData(rarity: Rarity, theme: Theme) {
    return global.materials.find((value) => {
        return value.asset.rarity.valueOf() === rarity.valueOf() && value.asset.theme.valueOf() === theme.valueOf()
    })
}