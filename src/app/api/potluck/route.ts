import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const POTLUCK_PASSWORD = "pc2026";

function getSupabase() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(`Supabase env missing — URL:${!!url} KEY:${!!key}`);
  }

  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("potluck_entries")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("GET /api/potluck error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dish, category, dish_allergens, personal_allergies, password } = body;

    if (password !== POTLUCK_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    if (!name || !dish || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("potluck_entries")
      .insert({
        name: name.trim(),
        dish: dish.trim(),
        category,
        dish_allergens: dish_allergens?.trim() || null,
        personal_allergies: personal_allergies?.trim() || null,
      });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("POST /api/potluck error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (password !== POTLUCK_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("potluck_entries").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("DELETE /api/potluck error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
