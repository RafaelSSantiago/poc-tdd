import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
  private readonly propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreatePropertyDTO = {
        name: req.body.name,
        description: req.body.name,
        basePricePerNight: req.body.basePricePerNight,
        maxGuests: req.body.maxGuests,
      };

      await this.propertyService.createProperty(dto);

      return res.status(201).json({});
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "an Unexpected error occured" });
    }
  }
}
