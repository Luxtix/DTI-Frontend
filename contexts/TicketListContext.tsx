'use client'
import purchasedTicket from '@/hooks/purchasedTicket';
import transactionDetail from '@/hooks/transactionDetail';
import { TransactionDetail } from '@/types/transaction';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type Ticket = {
  transactionId: number,
  eventId: number,
  eventDate: string,
  eventDay: string
  eventName: string,
  eventImage: string,
  isDone: boolean
}

interface TransactionTicketContextType {
  transactionList: Ticket[];
  transactionDetailList: TransactionDetail[];
  error: unknown;
  loading: boolean;
  setTransactionId: (query: number) => void;

}

export const TransactionContext = createContext<TransactionTicketContextType>({
  transactionList: [],
  transactionDetailList: [],
  error: null,
  loading: false,
  setTransactionId: (query: number) => { },
});

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { transactionList, error, loading } = purchasedTicket();
  const [inputTransactionId, setTransactionId] = useState<number | undefined>(undefined);
  const { transactionDetailList } = transactionDetail(inputTransactionId);

  useEffect(() => {
    console.log(transactionDetailList)
  }, [transactionDetailList])


  return (
    <TransactionContext.Provider value={{ transactionList, transactionDetailList, error, loading, setTransactionId }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TicketProvider;

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  return ctx;
}