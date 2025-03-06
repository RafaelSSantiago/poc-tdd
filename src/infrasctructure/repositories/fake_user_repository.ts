import { User } from "../../domain/entities/user";
import { userRepository } from "../../domain/repositories/user_repository";

export class FakeUserRepository implements userRepository {
  private users: User[] = [new User("1", "Jonh Doe"), new User("2", "Jane Smith")];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async save(user: User) {
    this.users.push(user);
  }
}