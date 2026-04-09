use std::{collections::HashMap, env};
use dotenv::dotenv;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};
use reqwest::Client;
use serde::Deserialize;

#[derive(Deserialize)]
struct PlayerData {
    id: String,
    name: String
}

#[get("/data/{username}")]
async fn get_data(info: web::Path<(String,)>) -> impl Responder {
    dotenv().ok();
    let client = Client::new();
    
    let uuid_res = client.get(format!("https://api.mojang.com/users/profiles/minecraft/{}", info.0))
        .send()
        .await;

    let mut uuid = match uuid_res {
        Ok(data) => match data.json::<PlayerData>().await {
            Ok(data) => data.id,
            Err(err) => return HttpResponse::InternalServerError().body(format!("failed to decode player data: {}", err.to_string()))
        }
        Err(err) => return HttpResponse::InternalServerError().body(format!("failed to get uuid: {}", err.to_string()))
    };

    // thank you mojang api for not formatting the uuid
    // and mmci api for not accepting uuids without -'s <3

    uuid.insert_str(8, "-");
    uuid.insert_str(13, "-");
    uuid.insert_str(18, "-");
    uuid.insert_str(23, "-");

    let api_key = env::var("NOXCREW_API_KEY").expect("NOXCREW_API_KEY must be set");
    
    let mut json = HashMap::new();
    json.insert("query", format!("
        query MyQuery {{
            player(uuid: \"{uuid}\") {{
                collections {{
                    currency {{
                        coins
                        royalReputation
                    }}
                    cosmetics {{
                        cosmetic {{
                            canBeDonated
                            collection
                            royalReputation {{
                                reputationAmount
                                donationLimit
                            }}
                            trophies
                            name
                            uniqueIdentifier
                            colorable
                            category
                            rarity
                        }}
                        owned
                    }}
                }}
                crownLevel {{
                    styleLevelData {{
                        level
                        nextLevelProgress {{
                            obtainable
                            obtained
                        }}
                    }}
                    trophies(category: STYLE) {{
                        obtained
                    }}
                }}
                infinibag {{
                    asset {{
                        name
                        rarity
                        uniqueIdentifier
                    }}
                    amount
                }}
                infinivault {{
                    amount
                    asset {{
                        uniqueIdentifier
                        rarity
                        name
                    }}
                }}
            }}
        }}
    "));

    let res = client.post("https://api.mccisland.net/graphql")
        .json(&json)
        .header("X-API-Key", api_key)
        .header("content-type", "application/json")
        .send()
        .await;

    match res {
        Ok(data) => match data.text().await {
            Ok(text) => return HttpResponse::Ok().json(text),
            Err(err) => return HttpResponse::InternalServerError().body(format!("failed to get json data: {}", err.to_string()))
        },
        Err(err) => return HttpResponse::InternalServerError().body(format!("failed to request mcci api: {}", err.to_string()))
    };
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_data)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}