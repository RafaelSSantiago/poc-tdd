import express from "express";
import { DataSource } from "typeorm";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyService } from "../../application/services/property_service";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { PropertyController } from "./property_controller";
import request from "supertest";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";

const app = express();
app.use(express.json());

let dataSource: DataSource;

let propertyRepository: TypeORMPropertyRepository;
let propertyService: PropertyService;
let propertyController: PropertyController;

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
  propertyRepository = new TypeORMPropertyRepository(dataSource.getRepository(PropertyEntity));

  propertyService = new PropertyService(propertyRepository);

  propertyController = new PropertyController(propertyService);

  app.post("/properties", (req, res, next) => {
    propertyController.createProperty(req, res).catch((err) => next(err));
  });
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("PropertyController", () => {
  it("deve criar uma propriedade com sucesso", async () => {
    const response = await request(app).post("/properties").send({
      name: "Bc",
      description: "Bc",
      maxGuests: 3,
      basePricePerNight: 200,
    });

    expect(response.status).toBe(201);
  });

  it("deve retornar erro com código 400 e mensagem O nome da propriedade é obrigatório.", async () => {
    const response = await request(app).post("/properties").send({
      name: "",
      description: "Bc",
      maxGuests: 3,
      basePricePerNight: 200,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O nome da propriedade é obrigatório.");
  });

  it("deve retornar erro com código 400 e mensagem ao enviar maxGuests igual a zero ou negativo", async () => {
    const response = await request(app).post("/properties").send({
      name: "Bc",
      description: "Bc",
      maxGuests: 0,
      basePricePerNight: 200,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A capacidade máxima deve ser maior que zero.");
  });

  it("deve retornar erro com código 400 e mensagem  ao enviar basePricePerNight ausente", async () => {
    const response = await request(app).post("/properties").send({
      name: "Bc",
      description: "Bc",
      maxGuests: 1,
      basePricePerNight: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O preço base por noite é obrigatório.");
  });
});
