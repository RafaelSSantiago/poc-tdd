import { DataSource } from "typeorm";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../../persistence/entities/property_entity";
import { PropertyMapper } from "./property_mapper";
import { Property } from "../../../domain/entities/property";
import { UserEntity } from "../entities/user_entity";

describe("PropertyMapper", () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, BookingEntity, UserEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
  });

  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyRepository = dataSource.getRepository(PropertyEntity);
    const property = propertyRepository.create({
      id: "1",
      name: "Casa na praia",
      description: "Vista para o mar",
      maxGuests: 6,
      basePricePerNight: 200,
      bookings: [],
    });

    const toDomain = PropertyMapper.toDomain(property);
    expect(toDomain).toBeInstanceOf(Property);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyRepository = dataSource.getRepository(PropertyEntity);
    const property = propertyRepository.create({
      name: "Casa na cidade",
      description: "Vista para av.Paulista",
      maxGuests: 6,
      basePricePerNight: 200,
    });

    expect(() => PropertyMapper.toDomain(property)).toThrow("O campo id é obrigatório");
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property("1", "Casa na cidade", "Vista para av.Paulista", 6,200);
    const toPersistence = PropertyMapper.toPersistence(property)
    expect(toPersistence).toBeInstanceOf(PropertyEntity);
  });
});
