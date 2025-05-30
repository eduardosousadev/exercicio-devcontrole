import { requireSession } from "@/lib/requireSession";
import { BackButtonDashboard } from "../components/backButton";
import prismaClient from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
  const session = await requireSession();

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  });

  const handleRegisterTicket = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if(!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        status: "ABERTO",
        customerId: customerId as string,
        userId: session?.user.id,
      }
    });

    redirect("/dashboard");
  };
  return (
    <>
      {
        customers.length > 0 && (
        <main className="pt-9 pb-2">
          <BackButtonDashboard title="Novo chamado" link="/dashboard" />

          <form className="flex flex-col mt-6" action={ handleRegisterTicket }>
            <label className="flex flex-col flex-1">
              <p className="text-sm md:text-base transition-colors duration-300 hover:text-blue-500">
                Nome do chamado
              </p>
              <input 
                className="text-sm md:text-base w-full h-[32px] border-2 border-black rounded-md p-1 mb-4"
                type="text" 
                placeholder="Digite o nome do chamado..."
                required
                name="name"
              />
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-sm md:text-base transition-colors duration-300 hover:text-blue-500">
                Descreva o problema
              </p>
              <textarea 
                className="text-sm md:text-base w-full border-2 border-black rounded-md p-1 mb-4 h-24 resize-none"
                placeholder="Digite o problema..."
                required
                name="description"
              ></textarea>
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-sm md:text-base transition-colors duration-300 hover:text-blue-500">
                Selecione o cliente
              </p>
              <select
                className="text-sm md:text-base w-full h-[32px] border-2 border-black rounded-md p-1 mb-4"
                defaultValue=""
                name="customer"
              >
                <option disabled value="">Selecione um cliente</option>
                {
                  customers.map((customer) => (
                    <option 
                      key={ customer.id } 
                      value={ customer.id }
                    >
                      { customer.name }
                    </option>
                  ))
                }
              </select>
            </label>

            <button 
              type="submit"
              className="border-2 bg-blue-500 text-white py-1 mt-2 rounded-md text-sm md:text-base cursor-pointer transition duration-300 hover:scale-101"
            >
              Cadastrar
            </button>
          </form>
        </main>
        )
      }
      {
        customers.length === 0 && (
          <main className="mt-9 mb-2 flex flex-col justify-center items-center min-h-[calc(100vh-225px)]">
            <p className="text-sm md:text-xl text-center">Você não possui nenhum cliente cadastrado.</p>
            <p className="text-sm md:text-xl text-center">
              <Link 
                href="/dashboard/customers/new"
                className="underline font-bold transition-colors duration-300 hover:text-blue-500"
              >
                Clique aqui
              </Link> para cadastrar seu primeiro cliente.
            </p>
          </main>
        )
      }
    </>
  )
}