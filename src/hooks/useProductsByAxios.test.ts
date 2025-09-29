import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { useProductsAxios } from "./useProductByAxios";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("useProducts with axios", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns data on success", async () => {
        const mockData = [{ id: 1, name: "Test", description: "Description" }];
        mockedAxios.get.mockResolvedValue({ status: 200, data: mockData });

        const { result } = renderHook(() => useProductsAxios());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it("returns error on failure", async () => {
        mockedAxios.get.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useProductsAxios());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Network error");
        expect(result.current.data).toEqual([]);
    });

    it("handles non-200 status", async () => {
        mockedAxios.get.mockResolvedValue({ status: 500 });

        const { result } = renderHook(() => useProductsAxios());

        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBe("Could not fetch data");
    });
});
