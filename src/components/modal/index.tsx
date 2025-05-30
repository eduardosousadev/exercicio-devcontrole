"use client";
import { ModalContext } from "@/providers/modal";
import { useContext, useRef, MouseEvent, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { Label } from "../label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(3, { message: "O novo nome é obrigatório" }),
  description: z.string().min(3, { message: "A nova descrição é obrigatória" })
});

type FormData = z.infer<typeof schema>;

export function ModalTicket() {
  const { 
    handleModalVisible, 
    ticket, 
    showTicketEditor, 
    handleTicketEditorVisible,
    setHasUpdated
  } = useContext(ModalContext);
  const { register, setValue, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (event: MouseEvent<HTMLElement>) => {
    if(modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleModalVisible();
    }
  }

  const handleUpdateTicket = async (data: FormData) => {
    try {
      await api.put(`/api/tickets/${ticket?.ticket?.id}`, data);

      setHasUpdated(true);
      handleModalVisible();
      toast.success("Chamado atualizado com sucesso!");

    } catch(error) {
      console.error("Erro ao atualizar o ticket: ", error)
    }
  };

  useEffect(() => {
    if(ticket?.ticket) {
      reset({
        name: ticket.ticket.name,
        description: ticket.ticket.description
      });
    }
  }, [ticket, reset, showTicketEditor]);

  return(
    <section 
      className="w-full min-h-screen fixed inset-0 bg-gray-900/80" 
      onClick={ handleModalClick }
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div ref={ modalRef } className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded-md">
          <div className={`${ showTicketEditor && 'hidden'}`}>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[18px] md:text-2xl font-bold">Detalhes do chamado</h1>
              <IoMdCloseCircle 
                size={24} 
                className="cursor-pointer md:hidden" 
                onClick={ handleModalVisible }
              />
              <button 
                className="hidden md:flex text-white bg-red-500 px-4 py-2 rounded-md transition duration-300 lg:hover:scale-105 cursor-pointer"
                onClick={ handleModalVisible }
              >
                Fechar
              </button>
            </div>

            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-sm mb-2">
              <strong>Nome: </strong>{ ticket?.ticket.name }
            </div>

            <div className="flex flex-col gap-1 text-sm break-words">
              <strong>Descrição:</strong>
              <p>{ticket?.ticket.description}</p>
            </div>

            <hr className="border-1 border-gray-200 my-4" />

            <strong className="md:text-xl">Detalhes do cliente</strong>

            <div className="text-sm mt-4 flex flex-col gap-2">
              <p>
                <strong>Nome: </strong>{ ticket?.customer?.name }
              </p>
              <p>
                <strong>Telefone: </strong>{ ticket?.customer?.phone}
              </p>
              <p>
                <strong>Email: </strong>{ ticket?.customer?.email }
              </p>
              {
                ticket?.customer?.address && (
                  <p>
                    <strong>Endereço: </strong>{ ticket?.customer?.address }
                  </p>
                )
              }
            </div>

            <button 
              className="w-full text-sm bg-gray-900 text-white mt-4 py-2 rounded-md transition duration-300 lg:hover:scale-101 cursor-pointer"
              onClick={ handleTicketEditorVisible }
            >
              Editar chamado
            </button>
          </div>

          <div className={`${ !showTicketEditor && 'hidden'}`}>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[18px] md:text-2xl font-bold">Detalhes do chamado</h1>
              <IoMdCloseCircle 
                size={24} 
                className="cursor-pointer md:hidden" 
                onClick={ handleModalVisible }
              />
              <button 
                className="hidden md:flex text-white bg-red-500 px-4 py-2 rounded-md transition duration-300 lg:hover:scale-105 cursor-pointer"
                onClick={ handleModalVisible }
              >
                Fechar
              </button>
            </div>
            <form onSubmit={ handleSubmit(handleUpdateTicket)} >
              <Label 
              label="Nome:"
              type="text"
              placeholder="Digite o novo nome do chamado..."
              name="name"
              register={ register }
              setValue={ setValue }
              watch={ watch }
              error={ errors.name?.message }           
              />
              <Label 
                label="Descrição:"
                placeholder="Digite a nova descrição do chamado..."
                name="description"
                register={ register }
                setValue={ setValue }
                watch={ watch }
                error={ errors.description?.message }
                asTextArea={ true }
              />
              <div className="flex justify-center items-center mt-4"> 
                <div 
                  className="w-fit text-xl bg-gray-600 text-white py-2 px-4 rounded-tl-md rounded-bl-md transition duration-300 lg:hover:scale-108 cursor-pointer h-9"
                  onClick={ handleTicketEditorVisible }
                >
                  <IoArrowBackSharp />
                </div>
                <button 
                  type="submit"
                  className="w-full text-sm bg-gray-900 text-white py-2 rounded-tr-md rounded-br-md transition duration-300 lg:hover:scale-103 cursor-pointer h-9"                  
                >
                  Concluir edição
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}