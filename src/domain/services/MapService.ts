import {MapRepositoryPort} from "../../application/ports/outbound/MapRepositoryPort";
import {MapServicePort} from "../../application/ports/inbound/MapServicePort";
import {Map} from "../models/Map";

export class MapService implements MapServicePort {
    constructor(private readonly repo: MapRepositoryPort) {}
    getMapById(id: string): Promise<Map | null>{
        if(id === undefined) {
            throw new Error("A map's id must be provided");
        }
        return this.repo.getMapById(id);
    }
    insertMap(map: Map):  Promise<Map | null>{
        if(map === undefined) {
            throw new Error("A map must be provided");
        }
        return this.repo.insertMap(map);
    }
    deleteMap(id: string):  Promise<string | null> {
        if (id === undefined) {
            throw new Error("A map's id must be provided");
        }
        return this.repo.deleteMap(id);
    }
}