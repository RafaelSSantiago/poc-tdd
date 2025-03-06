import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

export class PropertyMapper {
  static requiredFields: Array<keyof PropertyEntity> = ["id", "name", "description", "maxGuests", "basePricePerNight"];

  static toDomain(entity: PropertyEntity): Property {

    for (const field of this.requiredFields) {
      if (!entity[field]) {
        throw new Error(`O campo ${field} é obrigatório"`);
      }
    }

    return new Property(entity.id, entity.name, entity.description, entity.maxGuests, Number(entity.basePricePerNight));
  }

  static toPersistence(domain: Property): PropertyEntity {
    const entity = new PropertyEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.description = domain.getDescription();
    entity.maxGuests = domain.getMaxGuests();
    entity.basePricePerNight = domain.getBasePricePerNight();
    return entity;
  }
}
