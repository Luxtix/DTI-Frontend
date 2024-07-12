'use client'
import purchasedTicket from '@/hooks/purchasedTicket';
import React, { createContext, ReactNode, useContext } from 'react'

type Ticket = {
  transactionId: number,
  eventId: number,
  eventDate: Date,
  eventName: string,
  eventImage: string,
  isDone: boolean
}

interface TransactionTicketContextType {
  transactionList: Ticket[];
  error: unknown;
  loading: boolean;
}

export const TransactionContext = createContext<TransactionTicketContextType>({
  transactionList: [],
  error: null,
  loading: false,
});

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { transactionList, error, loading } = purchasedTicket();
  return (
    <TransactionContext.Provider value={{ transactionList, error, loading }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TicketProvider;

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  return ctx;
}