import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import ContactModal from "./ContactModal";

interface HeaderProps {
  setActive: any;
  active: string;
}

export default function Header({ setActive, active }: HeaderProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <header className="flex absolute box-border w-full p-4  gap-2">
      <InputText placeholder="Search" className="ml-[43%]" />
      <div className="flex gap-4 ml-auto">
        <ButtonGroup>
          <Button
            icon="pi pi-objects-column"
            className={`${
              active === "kanban" ? "bg-amber-200" : " bg-gray-300"
            } h-8 w-10`}
            onClick={() => setActive("kanban")}
          />
          <Button
            className={`${
              active === "table" ? "bg-amber-200" : " bg-gray-300"
            } h-8 w-10`}
            icon="pi pi-list"
            onClick={() => setActive("table")}
          />
        </ButtonGroup>
        <Button
          className="w-9 h-9 text-white bg-blue-500"
          icon="pi pi-plus"
          rounded
          onClick={() => setIsContactModalOpen(true)}
        />
      </div>
      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </header>
  );
}
