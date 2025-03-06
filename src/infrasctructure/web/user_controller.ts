import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";

export class UserController {
  private readonly UserService: UserService;

  constructor(UserService: UserService) {
    this.UserService = UserService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userDto: CreateUserDTO = {
        name: req.body.name,
      };

      await this.UserService.createUser(userDto);
      return res.status(201).json();
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "an Unexpected error occured" });
    }
  }
}
