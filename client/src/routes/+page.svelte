<script lang="ts">
	import type { Asset } from "$app/types";
	import { getData, getTotalBlueprintCosts } from "$lib";
	import { BlueprintCategory, blueprintCosts, BlueprintTheme, getBlueprint, getBlueprintCosts, getMaterial, getMaterialByName, Rarity, rarityStyles, Theme, type AssetQuantity, type Blueprint, type BlueprintQuantity, type Material, type MaterialQuantity } from "$lib/constants";
	import { global } from "$lib/state.svelte";
	import { onMount } from "svelte";

    onMount(() => {
        getData("nibbl_z")
    })
</script>

<h1>Max Obtainable Reputation: {global.craftable.maxRep}</h1>

<h1>Required Materials:</h1>
<ul>
    {#each global.craftable.materials as material}
        <li class={rarityStyles[material.asset.rarity]}>{material.asset.name} ({material.asset.rarity} {(material.asset as Material).theme}) x{material.amount}</li>
    {/each}
</ul>

<h1>Craftable Blueprints</h1>
<ul>
    {#each global.blueprints as blueprint}
        <li>
            <p class={rarityStyles[blueprint.asset.rarity]}>{blueprint.asset.name} {blueprint.asset.category} {blueprint.asset.rarity} x{blueprint.amount}</p></li>
    {/each}
</ul>


<h1>Materials</h1>

<ul>
    {#each global.materials as material}
        <li class={rarityStyles[material.asset.rarity]}>{material.asset.name} ({material.asset.rarity} {(material.asset as Material).theme}) x{material.amount}</li>
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
                <li class={rarityStyles[cost.rarity]}>
                    x{cost.amount} {getMaterial(cost.rarity, cost.theme)?.name} ({cost.rarity} {cost.theme})
                </li>
            {/each}
        </ul>
        <br>
    {/each}

</ul>