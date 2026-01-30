import {MapServicePort} from "../../application/ports/inbound/MapServicePort";
import {Express, Response, Request} from "express";
import {Map} from "../../domain/models/Map";

export class MapController {
  constructor(private mapService: MapServicePort) {}

  registerRoutes(app: Express) {
    app.get('/map/:id', this.getMapById.bind(this));
    app.post('/map', this.insertMap.bind(this));
    app.delete('/map/:id', this.deleteMap.bind(this));
  }

  async getMapById(req: Request, res: Response) {
    const map: Map | null = await this.mapService.getMapById(req.params.id);
    if (map) {
      res.status(200).send(map);
    } else {
      res.status(404).send({ message: `Map ${req.params.id} not found` });
    }
  }
  async insertMap(req: Request, res: Response) {
    const created: Map | null = await this.mapService.insertMap(req.body);
    if (created === null) {
      res.status(404).send({ message: "Map could not be inserted" });
    } else {
      res.status(201).send(created);
    }
  }

  async deleteMap(req: Request, res: Response) {
    const deleted: string | null = await this.mapService.deleteMap(req.params.id);
    if (deleted === null) {
      res.status(404).send({message: `Map ${req.params.id} could not be deleted`});
    } else {
      res.status(200).send({message: `Map ${deleted} deleted`});
    }
  }
}