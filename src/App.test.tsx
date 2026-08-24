import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
describe("App", () => {
  it("render the text input demo heading", () => {
    render(<App />);

    const heading = screen.getByRole("heading", {
      name: /text input demo/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("updates the live preview while the user types", async () => {
    const user = userEvent.setup();

    render(<App />);

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });

    const messageInput = screen.getByRole("textbox", {
      name: /message/i,
    });

    await user.type(nameInput, "Eslam");
    await user.type(messageInput, "Learning controlled inputs");

    const preivew = screen.getByRole("region", {
      name: /live preview/i,
    });

    expect(within(preivew).getByText("Eslam")).toBeInTheDocument();
    expect(
      within(preivew).getByText("Learning controlled inputs"),
    ).toBeInTheDocument();
  });

  it("validate and confirms a complete submission", async () => {
    const user = userEvent.setup();

    render(<App />);

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });

    const messageInput = screen.getByRole("textbox", {
      name: /message/i,
    });

    expect(nameInput).toBeRequired();
    expect(nameInput).toHaveAttribute("maxlength", "60");

    expect(messageInput).toBeRequired();
    expect(messageInput).toHaveAttribute("maxlength", "500");

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    await user.click(submitButton);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    await user.type(nameInput, "Eslam");
    await user.type(messageInput, "Learing Controlled inputs");
    await user.click(submitButton);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Thank you, Eslam. Your message is ready.",
    );
  });
});
