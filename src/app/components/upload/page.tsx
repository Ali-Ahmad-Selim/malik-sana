"use client";

import React, { useRef, useState } from "react";

type AllowedOption = "home" | "waist coat" | "casual coat" | "shaiwani";

type CreatedPosting = {
  id: string;
  url: string;
  publicId: string;
  title: string;
  description: string;
  alt: string;
  option: AllowedOption;
  createdAt: string;
};

export default function PostingUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alt, setAlt] = useState("");
  const [option, setOption] = useState<AllowedOption>("home");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [created, setCreated] = useState<CreatedPosting | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const COLORS = { gold: "#C69749", blue: "#192e45" };

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setMsg(null);
    setCreated(null);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setCreated(null);

    if (!file) return setMsg({ ok: false, text: "Please select an image file." });
    if (!title.trim()) return setMsg({ ok: false, text: "Title is required." });

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("title", title.trim());
      fd.append("description", description);
      fd.append("alt", alt);
      fd.append("option", option);

      // 🔁 Correct API path that matches your server route
      const res = await fetch("/api/photos", {
        method: "POST",
        body: fd, // don’t set Content-Type manually
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");

      setMsg({ ok: true, text: "Created successfully!" });
      setCreated(json.posting as CreatedPosting);

      // reset form
      setTitle("");
      setDescription("");
      setAlt("");
      setOption("home");
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setMsg({ ok: false, text: err?.message || "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!created?.id) return;
    if (!confirm("Delete this posting? This will also remove the Cloudinary image.")) return;

    setDeleting(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/photos?id=${encodeURIComponent(created.id)}`, { method: "DELETE" });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Delete failed");

      setMsg({ ok: true, text: "Deleted successfully." });
      setCreated(null);
    } catch (e: any) {
      setMsg({ ok: false, text: e?.message || "Delete failed." });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: COLORS.blue,
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "grid",
          gap: 14,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: COLORS.blue,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          New Posting
        </h1>

        {/* File */}
        <label style={{ fontWeight: 600, color: COLORS.blue }}>
          Image file
          <input
            ref={fileInputRef}
            onChange={onPickFile}
            type="file"
            accept="image/*"
            style={{
              display: "block",
              marginTop: 6,
              padding: 10,
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 10,
              width: "100%",
            }}
          />
        </label>

        {/* Preview */}
        {preview && (
          <div
            style={{
              border: `1px dashed ${COLORS.blue}44`,
              borderRadius: 12,
              padding: 10,
              display: "grid",
              placeItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 8,
                display: "block",
              }}
            />
          </div>
        )}

        {/* Title */}
        <label style={{ fontWeight: 600, color: COLORS.blue }}>
          Title <span style={{ color: COLORS.gold }}>*</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Elegant Black Coat"
            style={{
              display: "block",
              marginTop: 6,
              padding: "12px 14px",
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 10,
              width: "100%",
              outlineColor: COLORS.gold,
            }}
          />
        </label>

        {/* Option */}
        <label style={{ fontWeight: 600, color: COLORS.blue }}>
          Option <span style={{ color: COLORS.gold }}>*</span>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value as AllowedOption)}
            style={{
              display: "block",
              marginTop: 6,
              padding: "12px 14px",
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 10,
              width: "100%",
              background: "#fff",
              outlineColor: COLORS.gold,
              color: COLORS.blue,
            }}
          >
            <option value="home">home</option>
            <option value="waist coat">waist coat</option>
            <option value="casual coat">casual coat</option>
            <option value="shaiwani">shaiwani</option>
          </select>
        </label>

        {/* Description */}
        <label style={{ fontWeight: 600, color: COLORS.blue }}>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
            style={{
              display: "block",
              marginTop: 6,
              padding: "12px 14px",
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 10,
              width: "100%",
              resize: "vertical",
              outlineColor: COLORS.gold,
            }}
          />
        </label>

        {/* Alt */}
        <label style={{ fontWeight: 600, color: COLORS.blue }}>
          Alt text
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="e.g., black coat front view"
            style={{
              display: "block",
              marginTop: 6,
              padding: "12px 14px",
              border: `1px solid ${COLORS.blue}22`,
              borderRadius: 10,
              width: "100%",
              outlineColor: COLORS.gold,
            }}
          />
        </label>

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: submitting ? "#C6974999" : "#C69749",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              fontWeight: 800,
              letterSpacing: 0.4,
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "transform 120ms ease",
            }}
            onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.99)")}
            onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          >
            {submitting ? "Uploading..." : "Create Posting"}
          </button>

          {created && (
            <div
              style={{
                padding: "12px",
                borderRadius: 10,
                background: "#f7f7ff",
                border: "1px solid #e6e6ff",
                fontSize: 13.5,
                display: "grid",
                gap: 8,
              }}
            >
              <div><b>ID:</b> {created.id}</div>
              <div><b>publicId:</b> {created.publicId}</div>
              <div style={{ overflowWrap: "anywhere" }}>
                <b>URL:</b> <a href={created.url} target="_blank" rel="noreferrer">{created.url}</a>
              </div>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  marginTop: 6,
                  background: deleting ? "#d9534f99" : "#d9534f",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  fontWeight: 700,
                  cursor: deleting ? "not-allowed" : "pointer",
                }}
              >
                {deleting ? "Deleting..." : "Delete this posting"}
              </button>
            </div>
          )}

          {msg && (
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                background: msg.ok ? "#e9f9f0" : "#ffefef",
                color: msg.ok ? "#1e7f4f" : "#9b1c1c",
                border: `1px solid ${msg.ok ? "#c8f0dc" : "#ffd5d5"}`,
                fontSize: 13.5,
              }}
            >
              {msg.text}
            </div>
          )}
        </div>

        <p style={{ margin: 0, textAlign: "center", color: COLORS.blue, opacity: 0.8, fontSize: 12 }}>
          Posting will be saved with Cloudinary URL & publicId; you can delete both in one click.
        </p>
      </form>
    </div>
  );
}
