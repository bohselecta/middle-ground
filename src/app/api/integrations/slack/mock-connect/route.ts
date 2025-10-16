import { NextResponse } from 'next/server'
let CONNECTED = true
export async function POST(){
  return NextResponse.json({ ok: true, connected: CONNECTED })
}
