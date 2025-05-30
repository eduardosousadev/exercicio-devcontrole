"use client";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FaCheck } from "react-icons/fa";
import { FiFile } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { api } from "@/lib/api";
import { useContext, useState } from "react";
import { ModalContext } from "@/providers/modal";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
  onStatusChange: () => void;
}

export function TicketItem({ ticket, customer, onStatusChange }: TicketItemProps) {
  const condition = `${ticket.status === "ABERTO" ? "bg-green-500" : "bg-red-500"} w-4 h-4 rounded-full sm:hidden`;
  const { handleModalVisible, setDetailsTicket } = useContext(ModalContext);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChangeStatus = async () => {
    try {
      await api.patch(`/api/tickets/${ ticket.id }`);

      if(onStatusChange) onStatusChange();

    } catch(error) {
      console.error(error);
    }
  };

  const handleOpenDetailsModal = () => {
    handleModalVisible();
    setDetailsTicket({
      customer: customer,
      ticket: ticket
    });
  }

  const handleDeleteTicket = async () => {
    try {
      setOpenModal(true);
      await api.delete(`/api/tickets/${ ticket.id }`);
      if(onStatusChange) onStatusChange();
      toast.success("Chamado excluído com sucesso!");
    } catch(error) {
      console.error(error);
    } finally {
      setOpenModal(false);
    }
  }

  return (
    <>
      <tr className="h-8 transition-colors duration-300 hover:bg-gray-100">
        <td className="text-left text-xs sm:text-sm border border-gray-300 pl-2">
          <div className="flex items-center gap-2">
            <span className={`${ condition }`}></span> { customer?.name }
          </div>
        </td>
        <td className="text-left text-xs sm:text-sm border border-gray-300 pl-2">
          { ticket.created_at 
            ? new Date(ticket.created_at).toLocaleDateString("pt-br")
            : "Indisponível" }
        </td>
        <td className="text-center text-xs sm:text-sm border border-gray-300 pl-2 hidden sm:table-cell">
          <div className={ `inline-block px-2 py-1 rounded-md w-[85px] ${ ticket.status === "ABERTO" ? "bg-green-500" : "bg-red-500" }` }>
            { ticket.status }
          </div>
        </td>
        <td className="border border-gray-300">
          <div className="flex justify-center items-center gap-2">
            <button 
              className="text-black transition-colors hover:text-[#3bf673] text-base sm:text-lg cursor-pointer"
              title="Alterar status do chamado"
              onClick={ handleChangeStatus }
            >
              <FaCheck />
            </button>
            <button 
              className="text-black transition-colors hover:text-[#3b82f6] text-base sm:text-lg cursor-pointer"
              title="Visualizar chamado"
              onClick={ handleOpenDetailsModal }
            >
              <FiFile />
            </button>
            <button 
              className="text-black transition-colors hover:text-[#ef4444] text-base sm:mr-2 sm:text-lg cursor-pointer"
              title="Excluir chamado"
              onClick={ () => setOpenModal(true) }
            >
              <BsTrash3 />
            </button>
          </div>
        </td>
      </tr>

      {
        openModal && (
          createPortal(
            <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Excluir chamado</h2>
                <p className="text-sm mb-4">
                  Tem certeza que deseja excluir este chamado?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-900 text-white rounded-md cursor-pointer transition duration-300 md:hover:text-blue-500"
                    onClick={ () => setOpenModal(false) }
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-900 text-white rounded-md cursor-pointer transition duration-300 md:hover:text-blue-500"
                    onClick={ handleDeleteTicket }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        )
      }
    </>
  )
}