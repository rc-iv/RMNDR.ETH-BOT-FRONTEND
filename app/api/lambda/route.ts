import { NextResponse } from "next/server"

const URL = "https://hnrkhewcy8.execute-api.us-east-1.amazonaws.com/default/rmndrBotMain"

// get function
export async function GET() {
    const dummyData = {
        "message": "hello world"
    }
  return NextResponse.json(dummyData)
}