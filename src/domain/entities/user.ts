export class User {
  private readonly id;
  private readonly name;

  constructor(id: string, name: string) {
    if (!(name.trim().length > 0)) {
      throw new Error("O campo nome é obrigatório");
    }

    if (!id) {
      throw new Error("O ID é obrigatório");
    }

    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
