"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailsTicket: (details: TicketInfo) => void;
  showTicketEditor: boolean;
  handleTicketEditorVisible: () => void;
  hasUpdated: boolean;
  setHasUpdated: (value: boolean) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [ticket, setTicket] = useState<TicketInfo>();
  const [showTicketEditor, setShowTicketEditor] = useState<boolean>(false);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  const handleModalVisible = () => {
    if(showTicketEditor) setShowTicketEditor(false);
    setVisible(!visible);
  };

  const setDetailsTicket = ( details: TicketInfo) => {
    setTicket(details);
  }

  const handleTicketEditorVisible = () => {
    setShowTicketEditor(!showTicketEditor);
  }

  return (
    <ModalContext.Provider value={{ 
      visible, 
      handleModalVisible, 
      ticket, 
      setDetailsTicket, 
      showTicketEditor, 
      handleTicketEditorVisible,
      hasUpdated,
      setHasUpdated,
    }}>
      { children }
    </ModalContext.Provider>
  )
}