import { TicketProps } from "./ticket.type";
import { CustomerProps } from "./customer.type";

export interface DashboardProps  extends TicketProps {
  customer: CustomerProps | null;
}