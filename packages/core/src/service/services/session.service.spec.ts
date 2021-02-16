import { CONTEXT } from "@nestjs/graphql";
import { Test } from "@nestjs/testing";
import { SessionService } from "./session.service";

const userId = 5;

describe("SessionService tests", () => {
  let service: SessionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: CONTEXT,
          useValue: {
            req: {
              session: {
                userId,
              },
            },
          },
        },
      ],
    }).compile();
    service = moduleRef.get(SessionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get userId", () => {
    expect(service.getUserId()).toBe(userId);
  });

  it("should set new userId", () => {
    const newUserId = 11;

    service.setUserId(11);
    expect(service.getUserId()).toBe(newUserId);
  });

  it("should remove user", () => {
    service.setUserId(null);
    expect(service.getUserId()).toBe(null);
  });
});
