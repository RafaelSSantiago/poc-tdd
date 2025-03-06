import { Repository } from "typeorm";
import { Booking } from "../../domain/entities/booking";
import { BookingRepository } from "../../domain/repositories/booking_repository";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { BookingMapper } from "../persistence/mappers/booking_mapper";

export class TypeORMBookingRepository implements BookingRepository {
  private readonly repository: Repository<BookingEntity>;

  constructor(repository: Repository<BookingEntity>) {
    this.repository = repository;
  }

  async save(booking: Booking): Promise<void> {
    const BookingEntity = BookingMapper.toPersistence(booking); // deve ser testado
    await this.repository.save(BookingEntity);
  }

  async findById(id: string): Promise<Booking | null> {
    const bookingEntity = await this.repository.findOne({
      where: {id},
      relations: ["property", "guest"],
    });

    return bookingEntity ? BookingMapper.toDomain(bookingEntity) : null // deve ser testado
  }
}