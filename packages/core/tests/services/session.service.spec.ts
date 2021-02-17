import { CONTEXT } from "@nestjs/graphql";
import { Test } from "@nestjs/testing";

import { SessionService } from "../../src/service";

describe("SessionService", () => {
  let service: SessionService;
  let context: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: CONTEXT,
          useValue: {
            req: {
              session: {},
            },
          },
        },
      ],
    }).compile();
    service = moduleRef.get(SessionService);
    context = moduleRef.get(CONTEXT);
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("getUserId", () => {
    it("should get userId", () => {
      const userId = 5;
      context.req.session.userId = userId;

      expect(service.getUserId()).toBe(userId);
    });
    it("should return null when userId set is not set", () => {
      delete context.req.session.userId;

      expect(service.getUserId()).toBe(null);
    });
  });

  describe("setUserId", () => {
    it("should set new userId", () => {
      const newUserId = 11;

      service.setUserId(newUserId);
      expect(context.req.session.userId).toBe(newUserId);
    });

    it("should remove user", () => {
      service.setUserId(null);

      expect(context.req.session.userId).toBe(null);
    });
  });
});
