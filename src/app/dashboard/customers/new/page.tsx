import { requireSession } from "@/lib/requireSession";
import { NewCustomerForm } from "../components/form";
import { BackButtonDashboard } from "../../components/backButton";

export default async function NewCustomer() {
  const session = await requireSession();

  return (
    <main className="flex flex-col pt-9 pb-2">
      <BackButtonDashboard title="Novo cliente" link="/dashboard/customers" />
      
      <NewCustomerForm userId={ session.user.id } />
    </main>
  )
}