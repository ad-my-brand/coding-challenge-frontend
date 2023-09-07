// Map.test.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Map from "./Map";

describe("Map Component", () => {
  it("displays user location marker when userLocation is provided", async () => {
    const userLocation = { lat: 51.505, lng: -0.09 }; // London coordinates
    render(<Map userLocation={userLocation} />);

    // Wait for the presence of the popup content text using data-testid
    await waitFor(() => {
      const popupContent = screen.getByTestId("user-location-popup");
      expect(popupContent).toBeInTheDocument();
    });
  });
});
