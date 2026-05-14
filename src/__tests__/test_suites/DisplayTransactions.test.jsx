import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { describe, expect, test, vi } from "vitest";


describe("Display Transactions?", () => {

    test("Display transactions on start", async () => {

        const transactions = [

            { id: 1, date: "2026-01-14", description: "Pokemon Cards", category: "Misc", amount: 8 }

        ]

        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(transactions),
        })

        render(<AccountContainer />)

        expect(await screen.findByText("Pokemon Cards")).toBeInTheDocument()
        expect(await screen.findByText(8)).toBeInTheDocument()
        expect(await screen.findByText("2026-01-14")).toBeInTheDocument()
        expect(await screen.findByText("Misc")).toBeInTheDocument()

    })

})