import { CreateLocationDTO } from '../dtos/create-location-dto';

import { Request, Response } from 'express';
import { filterField } from '../utils/filter-fields';
import { BadRequestError } from '@phntickets/booking';
import { LocationService } from '../services/location.service';
import { inject } from 'inversify';
import { TYPES } from '../inversify/types';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';

const allowedFieldsForLocationEdit = [
  'name',
  'address',
  'city',
  'state',
  'postal_code',
  'phone',
  'latitude',
  'longitude',
  'type',
  'is_active',
];

@controller('/api/location')
export class LocationController {
  constructor(
    @inject(TYPES.LocationService) private locationService: LocationService
  ) {}

  @httpPost('/')
  async createLocation(req: Request, res: Response) {
    const dto = req.body as CreateLocationDTO;
    const location = await this.locationService.createLocation(dto);

    res.status(201).json(location);
  }

  @httpPut('/:locationId')
  async updateLocation(req: Request, res: Response) {
    const locationId = Number(req.params.locationId);
    const dto = req.body as CreateLocationDTO;

    const filteredFields = filterField(
      dto,
      allowedFieldsForLocationEdit
    ) as CreateLocationDTO;

    if (!Object.keys(filteredFields).length)
      throw new BadRequestError('No fields for updation');

    const updatedLocation = await this.locationService.updateLocation(
      filteredFields,
      locationId
    );

    res.status(200).json(updatedLocation);
  }

  @httpGet('/')
  async getAllLocations(req: Request, res: Response) {
    const { limit = 5, pg = 1 } = req.query;

    const allLocationsData = await this.locationService.getLocations(
      +limit,
      +pg
    );

    res.status(200).send({
      message: 'Locations retrieved successfully',
      data: allLocationsData.locationsData,
      total: allLocationsData.total,
      pageNumber: pg,
      pageSize: limit,
    });
  }

  @httpGet('/:locationId')
  async getLocation(req: Request, res: Response) {
    const locationId = Number(req.params.locationId);

    const locationData = await this.locationService.getLocation(locationId);

    res.status(200).json(locationData);
  }
}
