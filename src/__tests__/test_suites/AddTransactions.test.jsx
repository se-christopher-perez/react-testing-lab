import { render, screen, cleanup } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Adds Transaction", () => {

    //Using a single test to test both
    test("Add a new transaction to the lista and calls the POST", async () => {

        const transactions = [

            { id: 1, date: "2026-01-14", description: "Pokemon Cards", category: "Misc", amount: 8 }

        ]

        const newTransaction = { id: 2, description: "PlayStation", category: "Electronic", amount: 400 }

        global.fetch = vi.fn()
            .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(transactions) })
            .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue(newTransaction) })

        render(<AccountContainer />)

        await screen.findByText("Pokemon Cards")

        await userEvent.type(screen.getByPlaceholderText("Description"), "PlayStation")
        await userEvent.type(screen.getByPlaceholderText("Category"), "Electronic")
        await userEvent.type(screen.getByPlaceholderText("Amount"), "400")

        await userEvent.click(screen.getByRole("button", { name: /add transaction/i }))

        expect(await screen.findByText("PlayStation")).toBeInTheDocument()

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:6001/transactions",
            expect.objectContaining({ method: "POST" })
        )

    })

})

afterEach(() => {
    cleanup();
});