import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("render Home and Login links", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    const loginLink = screen.getByRole("link", { name: /login/i });
  });
});
