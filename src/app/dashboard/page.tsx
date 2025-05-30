import { requireSession } from "@/lib/requireSession";
import { DashboardButton } from "./components/dashboardButton";
import TicketsList from "./components/ticketsList";

export default async function Dashboard() {
  const session = await requireSession();

  return (
    <main className="flex flex-col pt-9 pb-2">
      <DashboardButton
        title="Chamados"
        titleButton="Abrir chamado"
        hrefButton="/dashboard/new"
      />

      <TicketsList userId={session.user.id} />
    </main>
  );
}