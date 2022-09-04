import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import MapContainer from "../src/components/Map"


describe("Map Container", () => {

    it("render google map correctly", () => {
        render(<MapContainer cordinates={[28.704060, 77.102493]} />)
        expect(screen.getByTestId("map__container")).toBeInTheDocument();
    })
})