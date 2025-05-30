import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

// https://localhost:3000/api/tickets?userId=1&all=true
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const all =  request.nextUrl.searchParams.get("all") === "true";

  if(!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
  }

  try {
    const condition = ({ ticketStatus }: { ticketStatus: "ABERTO" | "FECHADO" }) => ({
      ...(all ? {} : { status: ticketStatus }),
      OR: [
        { customer: { userId } },
        { customer: { userId: null } },
      ],
    });

    const tickets = await prismaClient.ticket.findMany({
      where: condition({ ticketStatus: "ABERTO"}),
      include: {
        customer: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    const closedCount = await prismaClient.ticket.count({
      where: condition({ ticketStatus: "FECHADO" })
    });

    const hasClosedTickets = closedCount > 0;
    
    return NextResponse.json({ tickets, hasClosedTickets }, { status: 200 });
  } catch(error) {
    return new Response(JSON.stringify({ error: "Error fetching tickets" }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { customerId, name, description } = await request.json();

  if(!customerId || !name || !description) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name,
        description,
        status: "ABERTO",
        customerId
      }
    });

    return NextResponse.json({ message: "Ticket created" }, { status: 201 });

  } catch(error) {
    return new Response(JSON.stringify({ error: "Error creating new ticket" }), { status: 500 });
  }

  // return NextResponse.json({ message: "Ticket created" }, { status: 201 });
}