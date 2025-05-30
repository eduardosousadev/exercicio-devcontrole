"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  const handleDeleteCustomer = async () => {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id
        }
      });

      router.refresh();

      toast.success("Cliente deletado com sucesso!");

      console.info("RESPOSTA -> ", response.data);
    } catch (error) {
      console.error("ERRO AO DELETAR CLIENTE -> ", error);
    }
  };

  return (
    <article className="flex flex-col gap-2 bg-gray-100 border-2 border-gray-100 p-2 rounded-md transition duration-300 hover:bg-gray-200 hover:border-black">
      <h2 className="text-sm md:text-base truncate overflow-hidden whitespace-nowrap">
        <strong>Nome:</strong> { customer.name }
      </h2>
      <p className="text-sm md:text-base">
        <strong>Email:</strong> { customer.email }
      </p>
      <p className="text-sm md:text-base">
        <strong>Telefone:</strong> { customer.phone }
      </p>

      <button 
        className="self-start text-sm md:text-base py-1 px-6 mt-2 bg-red-500 text-white rounded-md cursor-pointer transition duration-300 hover:scale-105"
        onClick={ handleDeleteCustomer }
      >
        Deletar
      </button>
    </article>
  )
}