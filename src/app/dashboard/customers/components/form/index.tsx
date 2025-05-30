"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/label";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome completo é obrigatório"),
  email: z.string().email("Digite um e-mail válido").min(1, "O campo e-mail é obrigatório"),
  phone: z.string().min(1, "O campo telefone é obrigatório").refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{5}-?\d{4}$/.test(value) || /^\d{2}\s?\d{9}$/.test(value) || /^\d{11}$/.test(value);
  }, {
    message: "Formato de telefone válido (XX) XXXXX-XXXX",
  }),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const { register, setValue, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();
  const handleRegisterCustomer = async (data: FormData) => {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId
    });

    reset();
    toast.success("Cliente cadastrado com sucesso!");

    setTimeout(() => {
      router.refresh();
      router.replace("/dashboard/customers");
    }, 2000);
  }
  return (
    <form className="mt-6 flex flex-col" onSubmit={ handleSubmit(handleRegisterCustomer) }>
      <Label 
        label="Nome completo" 
        type="text" 
        placeholder="Digite o nome completo..." 
        name="name"
        register={ register }
        setValue={ setValue }
        watch={ watch }
        error={ errors.name?.message}
      />
      <section className="flex flex-col sm:gap-4 sm:flex-row w-full">
        <Label 
          label="Telefone" 
          type="text" 
          placeholder="Exemplo: (85) 99999-9999 ou 85999999999" 
          name="phone"
          register={ register }
          setValue={ setValue }
          watch={ watch }
          error={ errors.phone?.message}
        />
        <Label 
          label="Email" 
          type="text" 
          placeholder="Digite o e-mail..." 
          name="email"
          register={ register }
          setValue={ setValue }
          watch={ watch }
          error={ errors.email?.message}
        />
      </section>
      <Label 
        label="Endereço completo"
        type="text"
        placeholder="Digite o endereço completo..."
        name="address"
        register={ register }
        setValue={ setValue }
        watch={ watch }
      />
      <input 
        type="submit" 
        value="Cadastrar" 
        className="border-2 bg-blue-500 text-white py-1 mt-5 rounded-md text-sm md:text-base cursor-pointer transition duration-300 hover:scale-101"
      />
    </form>
  )
}