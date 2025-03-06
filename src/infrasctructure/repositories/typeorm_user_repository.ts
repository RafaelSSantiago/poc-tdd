import { Repository } from "typeorm";
import { userRepository } from "../../domain/repositories/user_repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { User } from "../../domain/entities/user";
import { UserMapper } from "../persistence/mappers/user_mapper";

export class TypeORMUserRepository implements userRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(repository: Repository<UserEntity>) {
    this.repository = repository;
  }

  async save(user: User): Promise<void> {
    const UserEntity = UserMapper.toPersistence(user);
    await this.repository.save(UserEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }
}
