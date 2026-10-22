import {JsonProduitRepository} from "../adapters/secondaires/json/JsonProduitRepository";


export function ConsulterCatalogue(JPR: JsonProduitRepository) {
    return JPR.tous()
}