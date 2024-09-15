"use client";
import { SidebarItem } from "../SidebarItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dataGeneralSidebar, dataSupportSidebar } from "./SidebarRoutes.data";

export function SidebarRoutes() {
  const handleButtonClick = () => {
    window.location.href = "https://arvoredo-dashboard-braganca.vercel.app/";
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">Geral</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />
        {/* <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">Ferramentas</p>
          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div> */}
        <Separator />
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">Suporte</p>
          {dataSupportSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>
      <div>
        <div className="p-6 text-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleButtonClick}
          >
            Plataforma arvoredo - CM Bragança
          </Button>
        </div>
        <Separator />
        <footer className="mt-3 p-3 text-center text-xs">
          Grupo Érre
          <br /> 2024, Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
}
