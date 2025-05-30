import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

// http:///localhost:3000/api/tickets/[id]
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  };

  const findTicket = await prismaClient.ticket.findUnique({where: { id }})

  if(!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  try {
    await prismaClient.ticket.update({
      where: { id },
      data: {
        status: findTicket.status === "ABERTO" ? "FECHADO" : "ABERTO"
      }
    })
    return NextResponse.json({ message: "Ticket updated" });
    
  } catch(error) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if(!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await prismaClient.ticket.delete({
      where: { id }
    })
    return NextResponse.json({ message: "Ticket deletado com sucesso" }, { status: 200 });

  } catch(error) {
    return NextResponse.json({ error: "Error deleting ticket" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  };


  const { name, description } = await request.json();

  const findTicket = await prismaClient.ticket.findUnique({ where: { id } });

  if(!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  try {
    const updated = await prismaClient.ticket.update({
      where: { id },
      data: {
        name,
        description,
        status: "ABERTO",
        updated_at: new Date()
      }
    });

    return NextResponse.json({ message: "Ticket updated", ticket: updated });
  } catch(error) {
    console.error("Erro ao atualizar o ticket: ", error);
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }
}