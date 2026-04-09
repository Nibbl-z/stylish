use std::{collections::HashMap, fs};

use serde::Deserialize;

#[derive(Deserialize, Debug)]
enum Rarity {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
    Mythic
}

#[derive(Deserialize, Debug)]
enum Theme {
    Magical,
    Mechanical,
    Natural,
    Oceanic,
    PowerShard,
    Cluster,
    Mythic
}

#[derive(Deserialize, Debug)]
struct Material {
    name: String,
    theme: Theme,
    rarity: Rarity
}

#[derive(Deserialize, Debug)]
struct Data {
    material: HashMap<String, Material>
}

pub fn get_data() -> Data {
    let toml_data = fs::read_to_string("data.toml").unwrap();
    let data: Data = toml::from_str(&toml_data).unwrap();

    return data
}