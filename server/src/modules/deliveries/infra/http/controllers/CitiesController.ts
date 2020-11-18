import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCitiesService from '@modules/deliveries/services/ListCitiesService';

export default class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { term } = request.query;

    const listCitiesService = container.resolve(ListCitiesService);

    const cities = await listCitiesService.execute({ query: term as string });
    return response.json(cities);
  }
}
