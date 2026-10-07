"use client";

import { useState } from "react";
import {
  helpSections,
  helpTasks,
  supportWhatsAppUrl,
} from "../help/tasks";

type Tab = "tasks" | "sections";

type HelpDeskContentProps = {
  onRestartTour?: () => void;
};

export function HelpDeskContent({ onRestartTour }: HelpDeskContentProps) {
  const [tab, setTab] = useState<Tab>("tasks");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div
      style={{
        fontFamily: "inherit",
        fontSize: "18px",
        lineHeight: 1.5,
        padding: "1rem",
        maxWidth: "720px",
        margin: "0 auto",
        color: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => setTab("tasks")}
          style={{
            padding: "0.6rem 1rem",
            fontSize: "18px",
            fontWeight: tab === "tasks" ? 700 : 400,
            border: "1px solid var(--card-border-color, #ccc)",
            borderRadius: "6px",
            background:
              tab === "tasks"
                ? "var(--card-muted-bg-color, #e8f5e9)"
                : "var(--card-bg-color, transparent)",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          What do I want to do?
        </button>
        <button
          type="button"
          onClick={() => setTab("sections")}
          style={{
            padding: "0.6rem 1rem",
            fontSize: "18px",
            fontWeight: tab === "sections" ? 700 : 400,
            border: "1px solid var(--card-border-color, #ccc)",
            borderRadius: "6px",
            background:
              tab === "sections"
                ? "var(--card-muted-bg-color, #e8f5e9)"
                : "var(--card-bg-color, transparent)",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          All sections
        </button>
        {onRestartTour && (
          <button
            type="button"
            onClick={onRestartTour}
            style={{
              padding: "0.6rem 1rem",
              fontSize: "18px",
              border: "1px solid #2e7d32",
              borderRadius: "6px",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
              marginInlineStart: "auto",
            }}
          >
            Restart tour
          </button>
        )}
      </div>

      {tab === "tasks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {helpTasks.map((task) => {
            const open = expandedId === task.id;
            return (
              <div
                key={task.id}
                style={{
                  border: "1px solid var(--card-border-color, #ddd)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : task.id)}
                  style={{
                    width: "100%",
                    textAlign: "start",
                    padding: "1rem",
                    fontSize: "18px",
                    fontWeight: 600,
                    border: "none",
                    background: "var(--card-muted-bg-color, #fafafa)",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <div>{task.title}</div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "var(--card-muted-fg-color, #666)",
                      marginTop: "0.35rem",
                    }}
                  >
                    {task.where}
                  </div>
                </button>
                {open && (
                  <div
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid var(--card-border-color, #eee)",
                    }}
                  >
                    <ol style={{ margin: 0, paddingInlineStart: "1.25rem" }}>
                      {task.steps.map((step, i) => (
                        <li key={i} style={{ marginBottom: "0.75rem" }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                    {task.support && (
                      <a
                        href={supportWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "0.5rem",
                          padding: "0.75rem 1.25rem",
                          background: "#25D366",
                          color: "#fff",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        WhatsApp support
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "sections" && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {helpSections.map((section) => (
            <li
              key={section.title}
              style={{
                padding: "1rem",
                borderBottom: "1px solid var(--card-border-color, #eee)",
              }}
            >
              <div style={{ fontWeight: 600 }}>{section.title}</div>
              <div
                style={{
                  fontSize: "16px",
                  color: "var(--card-muted-fg-color, #555)",
                  marginTop: "0.35rem",
                }}
              >
                {section.description}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
