import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Chat from "./Chat";

describe("Chat", () => {
  test("renders event chat information", async () => {
    render(
      <Chat
        user={{ id: "1", token: "123abc" }}
        eventId="1"
        eventName="Event Name"
      />
    );

    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Event Name")).toBeInTheDocument();
  });

  test("renders direct chat information", async () => {
    render(
      <Chat
        user={{ id: "1", token: "123abc" }}
        friend={{ id: "2", firstname: "John", lastname: "Doe" }}
      />
    );

    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("shows send button", async () => {
    render(<Chat user={{ id: "1", token: "123abc" }} />);

    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  test("renders disabled message", async () => {
    render(
      <Chat
        user={{ id: "1", token: "123abc" }}
        isDisabled={true}
        disabledMessage="Chat is disabled"
      />
    );

    expect(screen.getByText("Chat is disabled")).toBeInTheDocument();
    expect(screen.queryByTestId("send-button")).toHaveProperty(
      "disabled",
      true
    );
    expect(screen.queryByTestId("message-box")).toHaveProperty(
      "disabled",
      true
    );
  });
});
