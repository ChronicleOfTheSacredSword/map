import express from 'express';
import * as fs from "node:fs";
import * as YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from "./errorHandling";

import MapRepo from "../infrastructure/adapters/MapRepositoryAdapter";
import {MapService} from "../domain/services/MapService";
import {MapController} from "../presentation/controllers/MapController";


const app = express();
app.use(express.json());


const file  = fs.readFileSync(require.resolve('../api/Map.yml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const mapRepo = new MapRepo();
const mapService = new MapService(mapRepo);
const mapController = new MapController(mapService);
mapController.registerRoutes(app);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});
