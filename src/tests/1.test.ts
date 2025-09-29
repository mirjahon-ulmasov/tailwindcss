import { expect, test } from "vitest";
import { sum } from "./1";

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, NaN)).toBe(NaN);
});

test("adds 3 + 5 to equal 3", () => {
    expect(3 + 5).toBe(8);
});
