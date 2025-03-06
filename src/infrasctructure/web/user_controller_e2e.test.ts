import request from "supertest";
import express from "express";
import { DataSource } from "typeorm";
import { UserService } from "../../application/services/user_service";
import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { UserEntity } from "../persistence/entities/user_entity";
import { UserController } from "./user_controller";
import { User } from "../../domain/entities/user";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let userService: UserService;
let userRepository: TypeORMUserRepository;
let userController: UserController;

beforeAll(async () => {
  dataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  });
  await dataSource.initialize();
  userRepository = new TypeORMUserRepository(dataSource.getRepository(UserEntity));

  userService = new UserService(userRepository);

  userController = new UserController(userService);

  app.post("/users", (req, res, next) => {
    userController.createUser(req, res).catch((err) => next(err));
  });
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("UserController", () => {
  it("deve criar um usuário com sucesso", async () => {
    const response = await request(app).post("/users").send({
      name: "santiago",
    });

    expect(response.status).toBe(201);
  });

  it("deve retornar erro com código 400 e mensagem O campo nome é obrigatório", async () => {
    const response = await request(app).post("/users").send({
      name: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O campo nome é obrigatório");
  });
});
