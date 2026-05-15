import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AccountContainer from "../../components/AccountContainer";
import userEvent from "@testing-library/user-event";

describe("Searched and Sorted Transactions", () => {

    test("Search and Sort Transactions", async () => {

        const transactions = [

            { id: 1, date: "2026-01-14", description: "Pokemon Cards", category: "Misc", amount: 8 },
            { id: 2, date: "2026-01-21", description: "PlayStation", category: "Electronic", amount: 400 }

        ]

        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(transactions)
        })

        render(<AccountContainer />)

        await screen.findByText("Pokemon Cards")

        await userEvent.type(screen.getByPlaceholderText(/search/i), "PlayStation")

        expect(screen.getByText("PlayStation")).toBeInTheDocument()
        expect(screen.queryByText("Pokemon Cards")).not.toBeInTheDocument()

    })

    test("Sort when dropdown is changed", async () => {

        const transactions = [

            { id: 1, date: "2026-01-14", description: "Pokemon Cards", category: "Misc", amount: 8 },
            { id: 2, date: "2026-01-21", description: "PlayStation", category: "Electronic", amount: 400 }

        ]

        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(transactions)
        })

        render(<AccountContainer />)

        await screen.findByText("Pokemon Cards")

        await userEvent.selectOptions(screen.getByRole("combobox"), "category")

        expect(screen.getByText("Pokemon Cards")).toBeInTheDocument()
        expect(screen.queryByText("PlayStation")).toBeInTheDocument()

    })

})

afterEach(() => {
    cleanup();
});