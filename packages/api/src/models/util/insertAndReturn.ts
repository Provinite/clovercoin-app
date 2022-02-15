import { Repository } from "typeorm";

export const insertAndReturn = async <T extends { id: any }>(
  repository: Repository<T>,
  ...insertArugments: Parameters<Repository<T>["insert"]>
): Promise<T> => {
  const result = await repository.insert(...insertArugments);
  return repository.findOneOrFail(result.identifiers[0].id);
};
