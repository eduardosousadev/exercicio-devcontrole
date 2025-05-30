"use client";

import { Container } from "@/components/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch, LuX } from "react-icons/lu";
import { z } from "zod";
import { FormTicket } from "./components/formTicket";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { email, set } from "zod/v4";

const schema = z.object({
  customerEmail: z.string().min(1, "O campo email é obrigatório")
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
  const { register, handleSubmit, setValue, formState: { errors }, watch, setError } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleClearCustomer = () => {
    setCustomer(null);
    setValue("customerEmail", "");
  };

  const handleSearchCustomer = async (data: FormData) => {
    const response = await api.get("/api/customer", {
      params: {
        email: data.customerEmail
      }
    });

    if(response.data === null) {
      setError("customerEmail", {
        type: "custom",
        message: "Cliente não encontrado"
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name
    });
  }

  return(
    <Container tailwindClass="flex flex-col min-h-[calc(100vh-120px)]">
      <h1 className="font-bold text-3xl text-center mt-16">Abrir chamado</h1>

      <main className="flex flex-col items-center mt-4 mb-2">
          {customer ? (
            <div className="flex flex-col justify-center items-center gap-8 w-full">
              <div className="bg-slate-200 px-4 md:px-6 lg:px-10 py-2 rounded-md w-full md:w-[80%] lg:w-1/2 flex justify-between items-center">
                <p className="text-sm md:text-lg flex-1 mr-4 truncate"><strong>Cliente selecionado:</strong> { customer.name }</p>
                <button 
                  className="text-2xl md:text-3xl text-red-600 transition duration-300 lg:hover:scale-125 cursor-pointer"
                  onClick={ handleClearCustomer }
                >
                  <LuX />
                </button>
              </div>

              <FormTicket customer={ customer } />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-8 w-full">
              <form 
                className="flex flex-col justify-center items-center bg-slate-200 px-4 py-2 md:px-6 lg:px-10 rounded-md w-full md:w-[80%] lg:w-1/2"
                onSubmit={ handleSubmit(handleSearchCustomer) }
              >
                <div className="flex flex-col py-4 w-full">
                  <Input 
                    type="email"
                    name="customerEmail"
                    placeholder="Digite o email do cliente..."
                    register={ register }
                    setValue={ setValue }
                    watch={ watch }
                    error={ errors.customerEmail?.message }
                  />

                  <button 
                    type="submit"
                    className="bg-blue-500 text-sm md:text-base text-white py-2 rounded-md flex justify-center items-center gap-4 mt-4 cursor-pointer"
                  >
                    <p>Procurar cliente</p>
                    <LuSearch className="text-xl md:text-2xl" />
                  </button>
                </div>
              </form>           
            </div>
          )}
      </main>
    </Container>
  )
}