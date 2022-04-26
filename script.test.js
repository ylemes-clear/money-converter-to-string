const convertNum = require('./script');

describe('testing convertNum functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test("should convert numeric input into string", () => {
    expect(convertNum(2689)).toBe("two thousand six hundred eighty-nine ")
  });


  test("should return error if number is over 1 trillion", () => {
    expect(convertNum(1000000000000000)).toBe("Error trying to convert")
  });
})