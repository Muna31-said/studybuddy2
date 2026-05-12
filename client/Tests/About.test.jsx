import "@testing-library/jest-dom/vitest";

import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";

import About from "../src/Components/About";
import React from "react";
//Test case 1
describe("About", () => {
  it("should display About and check h1", () => {
    render(<About />);

    const h1element = screen.getByRole("heading", { level: 1 });

    expect(h1element).toBeInTheDocument();
  });

  // Test 2
  it("should display About StudyBuddy heading", () => {
    render(<About />);

    const text = screen.getByText(/About StudyBuddy/i);

    expect(text).toBeInTheDocument();
  });

  // Test 3
  it("should display Main Features section", () => {
    render(<About />);

    const features = screen.getByText(/Main Features/i);

    expect(features).toBeInTheDocument();
  });

  // Test 4
  it("should display developer name", () => {
    render(<About />);

    const developer = screen.getByText(/Developed by: Mona/i);

    expect(developer).toBeInTheDocument();
  });
});
