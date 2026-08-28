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

  it("remove the dangerous events handlers from protected html", async () => {
    const user = userEvent.setup();
    render(<App />);
    const message = screen.getByRole("textbox", {
      name: /message/i,
    });

    const payload = `<img src="x" onerror="alert('Xss Demo')">`;

    await user.type(message, payload);

    const protectedPanel = screen.getByRole("region", {
      name: /protected html/i,
    });

    const protectedImage = protectedPanel.querySelector("img");

    expect(protectedImage).toBeInTheDocument();
    expect(protectedImage).toHaveAttribute("src", "x");
    expect(protectedImage).not.toHaveAttribute("onerror");
  });

  it("renders the untrusted markups as text in the safe react panel", async () => {
    const user = userEvent.setup();

    render(<App />);

    const messsage = screen.getByRole("textbox", {
      name: /message/i,
    });

    const payload = `<img src="x" onerror="alert('xss lab')"`;

    await user.type(messsage, payload);

    const safePanel = screen.getByRole("region", {
      name: /safe react/i,
    });

    expect(safePanel).toHaveTextContent(payload);
    expect(safePanel.querySelector("img")).not.toBeInTheDocument();
  });

  it("render row html in the vulnerable panel only after a vaild submission", async () => {
    const user = userEvent.setup();

    render(<App />);

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });

    const messageInput = screen.getByRole("textbox", { name: /message/i });
    const payload = `<img src="x" onerror="alert('xss-demo')">`;

    await user.type(nameInput, "Eslam");

    await user.type(messageInput, payload);

    const vulnerablePanel = screen.getByRole("region", {
      name: /vulnerable html/i,
    });

    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(vulnerablePanel.querySelector("img")).not.toBeInTheDocument();

    await user.click(submitButton);

    const vulnerableImage = vulnerablePanel.querySelector("img");

    expect(vulnerableImage).toBeInTheDocument();
    expect(vulnerableImage).toHaveAttribute("onerror", "alert('xss-demo')");
  });
});
