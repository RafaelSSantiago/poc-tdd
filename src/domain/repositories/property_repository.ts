import { Property } from "../entities/property";

export interface PropertyRepository {
  save(property: Property): Promise<void>;
  findPropertyById(id: string): Promise<Property | null>;
}
