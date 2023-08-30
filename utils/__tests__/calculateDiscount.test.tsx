import calculateDiscount from "../calculateDiscountPercentage";

describe("calculateDiscount", () => {
  it("Should return 0 if no discount", () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  it("should return correct discount", () => {
    expect(calculateDiscount(80, 100)).toBe(20);
    expect(calculateDiscount(50, 100)).toBe(50);
  });

  it("Should throw error when discount price is less than price", () => {
    expect(() => calculateDiscount(100, 80)).toThrowError();
  });

  it("Should throw error when either is negative", () => {
    expect(() => calculateDiscount(-100, 80)).toThrowError();
    expect(() => calculateDiscount(100, -80)).toThrowError();
  });

  it("Should throw error when price is negative", () => {
    expect(() => calculateDiscount(0, 0)).toThrowError();
  });
});
