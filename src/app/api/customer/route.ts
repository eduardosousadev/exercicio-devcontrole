import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

// Rota para cadastrar um novo cliente
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId,
      }
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed create new customer" }, { status: 400 });
  }
}

// Rota para deletar um cliente
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "Failed delete customer" }, { status: 400 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId
    }
  });

  if (findTickets) {
    return NextResponse.json({ error: "Failed delete customer" }, { status: 400 });
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId
      }
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed delete customer" }, { status: 400 });
  }
};

// Rota para buscar um cliente pelo email
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if(!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Failed find customer" }, { status: 400 });
  };

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail
      }
    });

    return NextResponse.json(customer);
  } catch(error) {
    return NextResponse.json({ error: "Failed find customer!" }, { status: 400 });
  }

}