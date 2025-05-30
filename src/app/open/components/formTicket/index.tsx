"use client";

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { IoMdCloseCircle } from "react-icons/io";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";
import toast from "react-hot-toast";

const schema = z.object({
  ticketName: z.string().min(1, "O campo nome do chamado é obrigatório"),
  description: z.string().min(1, "O campo descrição é obrigatório"),
});

type FormData = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const value = watch("description");

  const handleClearTextarea = () => setValue("description", "");

  const handleRegisterTicket = async (data: FormData) => {
    const response = await api.post("/api/tickets", {
      name: data.ticketName,
      description: data.description,
      customerId: customer.id
    });

    toast.success("Chamado registrado com sucesso!");
    
    setValue("ticketName", "");
    setValue("description", "");
  }

  return(
    <section className="bg-slate-200 px-4 py-2 md:px-6 lg:px-10 rounded-md w-full md:w-[80%] lg:w-1/2">
      <form className="w-full mt-5" onSubmit={ handleSubmit(handleRegisterTicket) }>
        <Input 
          type="text"
          name="ticketName"
          placeholder="Digite o nome do chamado..."
          register={ register }
          setValue={ setValue }
          watch={ watch }
          error={ errors.ticketName?.message}
        />
        <div className="flex flex-col mt-4 relative">
          {
            value && (
              <IoMdCloseCircle
                className="absolute top-0.5 right-0.5"
                onClick={ handleClearTextarea }
              />
            )
          }
          <textarea
            className={`w-full bg-white rounded-md h-24 resize-none px-2 pt-2 ${!errors.description && "mb-4"}`}
            placeholder="Descreva o seu problema..."
            { ...register("description") }
          ></textarea>
          { errors.description && <p className="text-red-500 text-xs sm:text-right pr-1">{ errors.description?.message }</p> }
        </div>
        <button 
          type="submit" 
          className="flex justify-center items-center bg-blue-500 text-white text-sm md:text-base py-2 rounded-md my-4 w-full cursor-pointer"
        >
          Cadastrar
        </button>
      </form>
    </section>
  )
}