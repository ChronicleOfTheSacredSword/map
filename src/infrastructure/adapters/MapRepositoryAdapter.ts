import {MapRepositoryPort} from "../../application/ports/outbound/MapRepositoryPort";
import {Map} from "../../domain/models/Map";
import redis from "../../../db";

class MapRepo implements MapRepositoryPort {
    async getMapById(id: string):  Promise<Map | null>{
        const res = await redis.get(id);
        if(res != null){
            const parsedRes = await JSON.parse(res);
            return {id: id, url: parsedRes.url, mobs: parsedRes.mobs};
        }
        return null;
    }

    async insertMap(map: Map):  Promise<Map | null>{
        try{
            await redis.set(map.id, JSON.stringify({url: map.url, mobs: map.mobs}));
            return map;
        }catch (e){
            console.error(e);
            return null;
        }
    }

    async deleteMap(id: string): Promise<string | null>{
        try{
            await redis.del(id);
            return id;
        }catch (e){
            console.error(e);
            return null;
        }
    }
}export default MapRepo

