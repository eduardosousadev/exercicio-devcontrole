import { requireSession } from "@/lib/requireSession"
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma";
import { DashboardButton } from "../components/dashboardButton";
import { CheckDashboardItems } from "../components/checkDashboardItems";

export default async function Customers() {
  const session = await requireSession(); 

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  });

  return (
    <main className="flex flex-col pt-9 pb-2">
      <DashboardButton 
        title="Meus clientes" 
        titleButton="Novo cliente" 
        hrefButton="/dashboard/customers/new" 
      />

      <CheckDashboardItems 
        table={ customers } 
        message="Você ainda não possui nenhum cliente cadastrado." 
      />

      {
        customers.length > 0 && (
          <section className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {
              customers.map( customer => (
                <CardCustomer key={ customer.id } customer={ customer } />
              ))
            }
          </section>
        )
      }
    </main>
  )
}