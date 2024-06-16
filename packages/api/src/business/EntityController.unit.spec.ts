import { In, Repository } from "typeorm";
import { v4 } from "uuid";
import { TransactionProvider } from "../db/TransactionProvider.js";
import { EntityController } from "./EntityController.js";

describe("EntityController", () => {
  class MockEntity {
    constructor(public val?: string) {}
    id!: string;
  }

  let subject: EntityController<
    MockEntity,
    Repository<MockEntity>,
    {
      val: string;
    },
    any
  >;
  let mockRepository: Repository<MockEntity>;
  let mockTransactionProvider: TransactionProvider;
  beforeEach(() => {
    mockRepository = {
      create() {},
      insert() {},
      find() {},
    } as unknown as typeof mockRepository;
    mockTransactionProvider = {} as typeof mockTransactionProvider;
    subject = new EntityController(
      mockRepository as any,
      mockTransactionProvider as any
    );
  });

  describe("method:createBodyToModel", () => {
    it("creates an entity from the repository", async () => {
      const mockEntity = new MockEntity();
      jest.spyOn(mockRepository, "create").mockReturnValue(mockEntity);
      const model = await subject.createBodyToModel({
        val: "bar",
      });
      expect(mockRepository.create).toHaveBeenCalledWith({ val: "bar" });
      expect(model).toBe(mockEntity);
    });
  });
  describe("method:insert", () => {
    it("inserts a new entity via the repository & returns the fetched entity", async () => {
      const id = v4();

      const mockResult = {
        identifiers: [
          {
            id,
          },
        ],
      };

      // this needs to be something more than just "{}"
      // since loose equality testing is used.
      const mockEntity = new MockEntity("foo");
      const dbEntity = new MockEntity("foo");
      dbEntity.id = id;

      jest.spyOn(mockRepository, "insert").mockResolvedValue(mockResult as any);
      jest.spyOn(mockRepository, "find").mockResolvedValue([dbEntity]);
      const result = await subject.insert([mockEntity]);
      expect(mockRepository.insert).toHaveBeenCalledWith([mockEntity]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          id: In([id]),
        },
      });
      expect(result).toEqual([dbEntity]);
    });
  });
  describe("method:create", () => {
    beforeEach(() => {
      jest.spyOn(mockRepository, "create").mockImplementation((options) => {
        const result = new MockEntity();
        Object.assign(result, options);
        return result;
      });
      jest.spyOn(subject, "insert").mockImplementation(async (v) => v);
    });
    it("inserts a new entity", async () => {
      const result = await subject.create({
        val: "bar",
      });
      const expectedEntity = new MockEntity("bar");
      expect(subject.insert).toHaveBeenCalledWith([expectedEntity]);
      expect(result).toEqual(expectedEntity);
      expect(result).toBeInstanceOf(MockEntity);
    });
    it("inserts multiple new entities", async () => {
      const result = await subject.create([{ val: "bar" }, { val: "baz" }]);
      const expectedEntities = [new MockEntity("bar"), new MockEntity("baz")];
      expect(subject.insert).toHaveBeenCalledWith(expectedEntities);
      expect(result).toEqual(expectedEntities);
      expect(result[0]).toBeInstanceOf(MockEntity);
      expect(result[1]).toBeInstanceOf(MockEntity);
    });
  });
});
