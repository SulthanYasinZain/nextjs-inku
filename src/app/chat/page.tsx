"use client";

import { useChat } from "ai/react";
import { AnimatedMarkdown } from "flowtoken";
import { auth } from "../../auth";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
  } = useChat({ api: "/api/chat" });

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          <div>{message.content}</div>
        </div>
      ))}

      {isLoading && (
        <div>
          <p>Loading</p>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
