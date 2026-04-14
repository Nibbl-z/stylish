<script lang="ts">
	import type { Asset } from "$app/types";
	import { BlueprintCategory, blueprintCosts, BlueprintTheme, getBlueprint, getBlueprintCosts, getMaterial, getMaterialByName, Rarity, rarityStyles, Theme, type AssetQuantity, type Blueprint, type BlueprintQuantity, type Material, type MaterialQuantity } from "$lib/constants";
	import { global } from "$lib/state.svelte";
	import { onMount } from "svelte";

    //let materials: MaterialQuantity[] = $state([])
    //let blueprints: BlueprintQuantity[] = $state([])

    async function getData(username: string) {
        const response = await fetch(`http://localhost:8080/data/${username}`)

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

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

             var blueprintCounts: Record<string, number> = {}

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
                    console.log("Standard_" + rarity + "_" + theme.toString())
                    let count = blueprintCounts["Standard_" + rarity + "_" + theme.toString()]
                    if (count == undefined) continue
                    console.log(Rarity[rarity.toUpperCase() as keyof typeof Rarity])
                    let costs = getBlueprintCosts(rarity, BlueprintTheme[theme as keyof typeof BlueprintTheme], BlueprintCategory.Standard)

                    costs.forEach((cost) => {
                        let index = materialCosts.findIndex((value) => {
                            return value.rarity.valueOf() === cost.rarity.valueOf() && value.theme.valueOf() === cost.theme.valueOf()
                        })

                        console.log(index)
                        if (index == -1) {
                            cost.amount *= count
                            materialCosts.push(cost)
                        } else {
                            materialCosts[index].amount += cost.amount * count
                            console.log(materialCosts[index].amount)
                        }
                    })
                }
            }

            console.log(blueprintCounts)
            console.log(materialCosts)
        })
    }

    onMount(() => {
        getData("ImAStupidBunny")
    })
</script>

<h1>Materials</h1>

<ul>
    {#each global.materials as material}
        <li>{material.asset.name} ({material.asset.rarity} {(material.asset as Material).theme}) x{material.amount}</li>
    {/each}
</ul>
<br>
<h1>Blueprints</h1>
<br>
<ul>
    {#each global.blueprints as blueprint}
        <li>
            <p>{blueprint.asset.name}</p> 
            {blueprint.asset.category} 
            <p class={rarityStyles[blueprint.asset.rarity]}>{blueprint.asset.rarity}</p>
            {blueprint.asset.theme} 
            x{blueprint.amount}</li>
        <p>Cost:</p>
        <ul>
            {#each getBlueprintCosts(blueprint.asset.rarity, blueprint.asset.theme, blueprint.asset.category) as cost}
                <li>
                    x{cost.amount} {getMaterial(cost.rarity, cost.theme)?.name} ({cost.rarity} {cost.theme})
                </li>
            {/each}
        </ul>
        <br>
    {/each}

</ul>