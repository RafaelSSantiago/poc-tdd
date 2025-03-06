import { User } from "../entities/user";

export interface userRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>
}