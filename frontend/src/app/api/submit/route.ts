import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { surveySchema } from "@/lib/survey-schema"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const result = surveySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { error } = await supabase.from("survey_responses").insert(result.data)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
