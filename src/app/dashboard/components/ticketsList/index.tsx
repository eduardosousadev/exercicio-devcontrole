"use client";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useState, useEffect, useContext } from "react";
import { TicketItem } from "../ticket";
import { ModalContext } from "@/providers/modal";
import { ModalTicket } from "@/components/modal";
import { FiRefreshCcw } from "react-icons/fi";

export default function TicketsList({ userId }: { userId: string}) {
  const [tickets, setTickets] = useState<(TicketProps & { customer: CustomerProps })[]>([]);
  const [hasOpenTickets, sethasOpenTickets] = useState<boolean>(false);
  const [hasClosedTickets, setHasClosedTickets] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const tailwindClasses:string = "uppercase font-medium text-center md:text-base text-xs border border-gray-300 py-1 bg-gray-200 whitespace-nowrap";
  const { visible, hasUpdated, setHasUpdated } = useContext(ModalContext);

  const fetchTickets = async () => {
    setLoading(true);

    try {
      const openTickets = await fetch(`/api/tickets?userId=${userId}&all=${hasOpenTickets}`);
      const openTicketsData = await openTickets.json();

      const closedTickets = await fetch(`/api/tickets?userId=${userId}&all=false`);
      const closetTicketsData = await closedTickets.json();

      setTickets(openTicketsData.tickets);
      setHasClosedTickets(closetTicketsData.hasClosedTickets ?? false);
    } catch {
      setTickets([]);
      setHasClosedTickets(false);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchTickets();
    setHasUpdated(false);
  }, [hasOpenTickets, userId, hasUpdated === true]);

  const refreshTickets = () => {
    fetchTickets();
  }

  let content;
  if(loading) {
    content = <p>Carregando...</p>;
  } else if(tickets.length === 0) {
    content = <div className="flex justify-between items-center">
      <p>Não há chamados {hasOpenTickets ? "cadastrados" : "abertos"}.</p>
      {
        !hasOpenTickets && hasClosedTickets && (
          <label className="text-xs md:text-base flex justify-end items-center gap-2">
            <input
              type="checkbox"
              checked={hasOpenTickets}
              onChange={() => sethasOpenTickets(true)}
            />
            Mostrar chamados finalizados
          </label>
        )
      }
    </div>;
  } else {
    content = <>
      <table className="min-w-full my-2 table-auto border border-gray-300">
        <thead>
          <tr>
            <th className={ tailwindClasses }>Cliente</th>
            <th className={ tailwindClasses }>Data</th>
            <th className={ `${ tailwindClasses } hidden sm:table-cell` }>Status</th>
            <th className={ tailwindClasses }>Nome</th>
          </tr>
        </thead>
        <tbody>
          {
            tickets.map((ticket) => (
              <TicketItem 
                key={ ticket.id }
                ticket={ ticket }
                customer={ ticket.customer }
                onStatusChange={ refreshTickets }
              />
            ))
          }
        </tbody>
      </table>
        {
          hasClosedTickets ? (
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2 text-xs md:text-base">
                <FiRefreshCcw 
                  title="Atualizar lista" 
                  className="cursor-pointer transition-colors duration-300 md:hover:text-blue-500" 
                  onClick={ refreshTickets }
                />
                <p>Atualizar lista</p>
              </div>
              <label className="text-xs md:text-base flex justify-end items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasOpenTickets}
                  onChange={() => sethasOpenTickets(!hasOpenTickets)}
                />
                Mostrar chamados finalizados
              </label>
            </div>
          ) : (
            <div className="flex justify-end items-center gap-2 text-xs md:text-base">
              <FiRefreshCcw 
                title="Atualizar lista" 
                className="w-fit cursor-pointer transition-colors duration-300 md:hover:text-blue-500" 
                onClick={ refreshTickets }
              />
              <p>Atualizar lista</p>
            </div>
          )
        }
    </>
  }

  return ( 
    <section>
      { content }
      { visible && <ModalTicket />}
    </section>
  );
}
