import { Container } from "@/components/container";
import Image from "next/image";
import heroImg from "@/assets/hero.svg";

export default function Home() {
  return (
    <main>
      <Container as="main" tailwindClass="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <h2 className="font-medium text-xl mb-2 md:text-3xl">Gerencie sua empresa</h2>
        <h1 className="font-bold text-2xl mb-8 text-blue-600 md:text-4xl">Atendimentos, clientes</h1>
        <Image 
          src={ heroImg }
          alt="Imagem hero do Dev Controle"
          width={ 600 }
          priority={ true }
          className="max-w-2xs md:max-w-xl"
        />
      </Container>
    </main>
  );
}
