import {Map} from "../../../domain/models/Map";

export interface MapRepositoryPort {
    getMapById(id: string):  Promise<Map | null>;
    insertMap(map: Map):  Promise<Map | null>;
    deleteMap(id: string):  Promise<string | null>;
}