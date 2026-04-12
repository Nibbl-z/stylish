<script lang="ts">
	import type { Asset } from "$app/types";
	import { blueprintCosts, getBlueprint, getBlueprintCosts, getMaterial, getMaterialByName, rarityStyles, type AssetQuantity, type Blueprint, type BlueprintQuantity, type Material, type MaterialQuantity } from "$lib/constants";
	import { onMount } from "svelte";

    let materials: MaterialQuantity[] = $state([])
    let blueprints: BlueprintQuantity[] = $state([])

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
                    materials.push({
                        asset: material as Material,
                        amount: asset.amount
                    })
                }

                let blueprint = getBlueprint(asset.asset.name)
                if (blueprint != undefined) {
                    blueprints.push({
                        asset: blueprint as Blueprint,
                        amount: asset.amount
                    })
                }
            })
        })
    }

    onMount(() => {
        getData("ImAStupidBunny")
    })
</script>

<h1>Materials</h1>

<ul>
    {#each materials as material}
        <li>{material.asset.name} ({material.asset.rarity} {(material.asset as Material).theme}) x{material.amount}</li>
    {/each}
</ul>
<br>
<h1>Blueprints</h1>
<br>
<ul>
    {#each blueprints as blueprint}
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