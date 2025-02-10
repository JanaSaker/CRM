import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import ContactModal from "./ContactModal";

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <header className="flex absolute box-border w-full p-4  gap-2">
      <InputText placeholder="Search" className="ml-[43%]" />
      <div className="flex gap-4 ml-auto">
        <ButtonGroup>
          <Button
            icon="pi pi-objects-column"
            className="bg-amber-200 h-8 w-10"
          />
          <Button className="h-8 w-10 bg-gray-300" icon="pi pi-list" />
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
