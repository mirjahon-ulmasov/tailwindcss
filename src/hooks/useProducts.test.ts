import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";

describe("useProducts", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should set loading true initially and then return data on success", async () => {
        const mockData = [{ id: 1, name: "Test", description: "Description" }];

        global.fetch = vi.fn().mockResolvedValue({
            status: 200,
            json: async () => mockData,
        }) as unknown as typeof fetch;

        const { result } = renderHook(() => useProducts());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it("should return error when fetch fails", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Network error")) as unknown as typeof fetch;

        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Network error");
        expect(result.current.data).toEqual([]);
    });

    it("should return error when status is not 200", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            status: 500,
            json: async () => [],
        }) as unknown as typeof fetch;

        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Could not fetch data");
        expect(result.current.data).toEqual([]);
    });
});
