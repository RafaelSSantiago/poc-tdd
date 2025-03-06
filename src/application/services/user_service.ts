import { User } from "../../domain/entities/user";
import { userRepository } from "../../domain/repositories/user_repository";
import { CreateUserDTO } from "../dtos/create_user_dto";

export class UserService {
  constructor(private readonly userRepository: userRepository) {}

  async createUser(dto: CreateUserDTO): Promise<void> {
    const user = new User("31", dto.name);
    return this.userRepository.save(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
