import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const POTLUCK_PASSWORD = "pc2026";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("potluck_entries")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, dish, category, password } = body;

  if (password !== POTLUCK_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  if (!name || !dish || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("potluck_entries")
    .insert({ name: name.trim(), dish: dish.trim(), category });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id, password } = body;

  if (password !== POTLUCK_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("potluck_entries")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
