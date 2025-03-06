import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { CreatePropertyDTO } from "../dtos/create_property_dto";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async createProperty(dto: CreatePropertyDTO): Promise<void> {
    const property = new Property("321", dto.name, dto.description, dto.maxGuests, dto.basePricePerNight);
    return this.propertyRepository.save(property);
  }

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findPropertyById(id);
  }
}
