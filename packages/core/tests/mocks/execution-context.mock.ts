export const MockExecutionContext = {
  switchToHttp: () => ({
    getRequest: jest.fn(),
    getResponse: jest.fn(),
    getNext: jest.fn(),
  }),
  getType: jest.fn(),
  getArgs: jest.fn(),
  getClass: jest.fn(),
  getHandler: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
