"use client";
import { useState } from "react";

interface ApiResponse {
  ok: boolean;
  sent?: number;
  error?: string;
}

export default function SendButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<ApiResponse | null>(null);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    setRes(null);

    try {
      const response = await fetch("/api/send-bulk", { method: "POST" });
      const data: ApiResponse = await response.json();
      setRes(data);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Request failed";
      setRes({ ok: false, error: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 8, }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "8px 12px",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "6px",
        }}
      >
        {loading ? "Sending..." : "Send 100 Emails"}
      </button>

      {res && (
        <pre
          style={{
            background: "#f4f4f4",
            padding: 8,
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  );
}
