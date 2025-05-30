import { Container } from "@/components/container";
import { DashboardHeader } from "./components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container tailwindClass="min-h-[calc(100vh-137px)]">
      <DashboardHeader />
      { children }
    </Container>
  )
}