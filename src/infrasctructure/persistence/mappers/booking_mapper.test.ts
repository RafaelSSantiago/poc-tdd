import { DataSource } from "typeorm";
import { PropertyEntity } from "../entities/property_entity";
import { BookingEntity } from "../entities/booking_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";
import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";

describe("BookingMapper", () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, UserEntity, BookingEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
  });

  it("deve converter BookingEntity em Booking corretamente", () => {
    const userRepository = dataSource.getRepository(UserEntity);

    const user = userRepository.create({
      id: "1",
      name: "Santiago",
    });

    const propertyRepository = dataSource.getRepository(PropertyEntity);
    const property = propertyRepository.create({
      id: "1",
      name: "Casa na praia",
      description: "Vista para o mar",
      maxGuests: 6,
      basePricePerNight: 200,
    });

    const bookingRepository = dataSource.getRepository(BookingEntity);
    const booking = bookingRepository.create({
      id: "1",
      property: property,
      guest: user,
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 4,
      totalPrice: 1000,
      status: "CONFIRMED",
    });

    const toDomain = BookingMapper.toDomain(booking);
    expect(toDomain).toBeInstanceOf(Booking);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const userRepository = dataSource.getRepository(UserEntity);

    const user = userRepository.create({
      id: "1",
      name: "Santiago",
    });

    const propertyRepository = dataSource.getRepository(PropertyEntity);
    const property = propertyRepository.create({
      id: "1",
      name: "Casa na praia",
      description: "Vista para o mar",
      maxGuests: 6,
      basePricePerNight: 200,
    });

    const bookingRepository = dataSource.getRepository(BookingEntity);
    const booking = bookingRepository.create({
      property: property,
      guest: user,
      startDate: new Date("2024-12-20"),
      endDate: new Date("2024-12-25"),
      guestCount: 4,
      totalPrice: 1000,
      status: "CONFIRMED",
    });

    expect(() => BookingMapper.toDomain(booking)).toThrow("O campo id é obrigatório");
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("1", "Casa de manaus", "Casa no rio negro", 2, 200);
    const user = new User("1", "Santiago");
    const dateRange = new DateRange(new Date("2024-12-20"),new Date("2024-12-25") )

    const booking = new Booking(   
      "1",   
      property,
      user,
      dateRange,
      2
    );

    const toPersistence = BookingMapper.toPersistence(booking);
    expect(toPersistence).toBeInstanceOf(BookingEntity);
  });
});
