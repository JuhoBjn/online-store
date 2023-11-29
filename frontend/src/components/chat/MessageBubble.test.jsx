import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MessageBubble from "./MessageBubble";
import formatTime from "./timeFormat";
import { BrowserRouter } from "react-router-dom";

describe("MessageBubble", () => {
  const message = {
    message: "Hello, world!",
    sentAt: new Date(),
    name: "John Doe",
    senderUserId: "1"
  };

  test("renders message content", async () => {
    render(
      <BrowserRouter>
        <MessageBubble message={message} isMine={false} isGroupChat={false} />
      </BrowserRouter>
    );

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  test("renders sender's name in group chat", async () => {
    render(
      <BrowserRouter>
        <MessageBubble message={message} isMine={false} isGroupChat={true} />
      </BrowserRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("does not render sender's name in direct chat", async () => {
    render(
      <MessageBubble message={message} isMine={false} isGroupChat={false} />
    );

    expect(screen.queryByText("John Doe")).toBeNull();
  });

  test("renders message time", async () => {
    render(
      <MessageBubble message={message} isMine={false} isGroupChat={false} />
    );

    expect(screen.getByText(formatTime(message.sentAt))).toBeInTheDocument();
  });

  test("renders sender's name in group chat", async () => {
    render(
      <BrowserRouter>
        <MessageBubble message={message} isMine={false} isGroupChat={true} />
      </BrowserRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("does not render sender's name in direct chat", async () => {
    render(
      <MessageBubble message={message} isMine={false} isGroupChat={false} />
    );

    expect(screen.queryByText("John Doe")).toBeNull();
  });

  test("Sender name is a link to their profile", async () => {
    render(
      <BrowserRouter>
        <MessageBubble message={message} isMine={false} isGroupChat={true} />
      </BrowserRouter>
    );

    expect(screen.getByText("John Doe").closest("a")).toHaveAttribute(
      "href",
      "/user/1"
    );
  });
});
