"use client";

import { useEffect, useState, useCallback } from "react";

const CATEGORIES = ["Main Dish", "Side Dish / Salad", "Dessert", "Drinks"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_EMOJI: Record<Category, string> = {
  "Main Dish": "🍖",
  "Side Dish / Salad": "🥗",
  Dessert: "🍰",
  Drinks: "🥤",
};

interface Entry {
  id: number;
  name: string;
  dish: string;
  category: Category;
  created_at: string;
}

type FormStatus = "idle" | "sending" | "success" | "error" | "wrong-password";

export default function PotluckClient() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ name: string; dish: string; category: Category; password: string }>({ name: "", dish: "", category: CATEGORIES[0], password: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/potluck");
      const data = await res.json();
      if (Array.isArray(data)) setEntries(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
    const interval = setInterval(fetchEntries, 15000);
    return () => clearInterval(interval);
  }, [fetchEntries]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/potluck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) { setStatus("wrong-password"); return; }
      if (!res.ok) { setStatus("error"); return; }
      setStatus("success");
      setForm({ name: "", dish: "", category: CATEGORIES[0], password: "" });
      fetchEntries();
    } catch {
      setStatus("error");
    }
  }

  async function handleDelete(id: number) {
    setDeleteError(false);
    const res = await fetch("/api/potluck", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: deletePassword }),
    });
    if (res.status === 401) { setDeleteError(true); return; }
    setDeleteId(null);
    setDeletePassword("");
    fetchEntries();
  }

  const grouped = CATEGORIES.reduce<Record<Category, Entry[]>>((acc, cat) => {
    acc[cat] = entries.filter((e) => e.category === cat);
    return acc;
  }, {} as Record<Category, Entry[]>);

  const inputClass = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent";

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-3xl font-bold text-slate-800">PC Potluck</h1>
          <p className="text-slate-500 mt-1">Monday, June 1st — Sign up below!</p>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mt-2">
            🔑 Password: <span className="font-bold tracking-widest">pc2026</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">List refreshes automatically every 15 seconds</p>
        </div>

        {/* Current list */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-6">
          <h2 className="font-semibold text-slate-700 mb-4 text-lg">Who&apos;s bringing what</h2>
          {loading ? (
            <p className="text-slate-400 text-sm text-center py-4">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">No one has signed up yet — be the first! 🎉</p>
          ) : (
            <div className="flex flex-col gap-5">
              {CATEGORIES.map((cat) =>
                grouped[cat].length === 0 ? null : (
                  <div key={cat}>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2">
                      {CATEGORY_EMOJI[cat]} {cat}
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {grouped[cat].map((e) => (
                        <li key={e.id} className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2">
                          <span className="text-sm text-slate-700">
                            <span className="font-medium">{e.name}</span>
                            <span className="text-slate-400"> — </span>
                            {e.dish}
                          </span>
                          <button
                            onClick={() => { setDeleteId(e.id); setDeletePassword(""); setDeleteError(false); }}
                            className="text-slate-300 hover:text-red-400 transition-colors text-xs ml-2"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Add form */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
          <h2 className="font-semibold text-slate-700 mb-4 text-lg">Add your name</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Your name</label>
                <input
                  type="text" required placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">What are you bringing?</label>
                <input
                  type="text" required placeholder="Pasta salad, brownies..."
                  value={form.dish}
                  onChange={(e) => setForm({ ...form, dish: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className={inputClass + " bg-white"}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{CATEGORY_EMOJI[c]} {c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
                <input
                  type="password" required placeholder="••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {status === "wrong-password" && (
              <p className="text-red-500 text-xs">❌ Wrong password. Try again.</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-xs">✅ You&apos;re on the list!</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 text-white font-medium py-2.5 px-6 rounded-lg transition-colors text-sm"
            >
              {status === "sending" ? "Adding..." : "Add me to the list 🙋"}
            </button>
          </form>
        </div>

        {/* Delete modal */}
        {deleteId !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
              <h3 className="font-semibold text-slate-800 mb-3">Remove this entry?</h3>
              <p className="text-sm text-slate-500 mb-3">Enter the password to confirm.</p>
              <input
                type="password" placeholder="Password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className={inputClass + " mb-2"}
              />
              {deleteError && <p className="text-red-500 text-xs mb-2">❌ Wrong password.</p>}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Remove
                </button>
                <button
                  onClick={() => { setDeleteId(null); setDeletePassword(""); setDeleteError(false); }}
                  className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
