import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // In a real application, you would save this data or process it
  console.log('Received location:', body)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json({ message: 'Location received successfully' })
}