import { NextResponse } from 'next/server'

let CONNECTED = false // replace with DB-backed status when ready

export async function GET(){
  return NextResponse.json({ connected: CONNECTED })
}
