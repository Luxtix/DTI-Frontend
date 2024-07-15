'use client'
import useTransactionList from '@/hooks/transactionList';
import transactionDetail from '@/hooks/transactionDetail';
import { TransactionDetail } from '@/types/transaction';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import TransactionList from '@/hooks/transactionList';

interface TransactionList {
  data: Transaction[];
  totalData: number;
}

type Transaction = {
  transactionId: number;
  eventId: number;
  eventDate: string;
  eventName: string;
  eventImage: string;
  isDone: boolean;
}

interface TransactionTicketContextType {
  userTransactionList: TransactionList;
  error: unknown;
  loading: boolean;
  transactionLimit: number;
  setTransactionLimit: (query: number) => void;
}

const defaultTransactionList: TransactionList = {
  data: [],
  totalData: 0
};

export const TransactionContext = createContext<TransactionTicketContextType>({
  userTransactionList: defaultTransactionList,
  error: null,
  loading: false,
  transactionLimit: 1,
  setTransactionLimit: (query: number) => { }
});

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { transactionList, error, loading, transactionLimit, setTransactionLimit } = useTransactionList();
  const [userTransactionList, setUserTransactionList] = useState<TransactionList>(defaultTransactionList);

  useEffect(() => {
    setUserTransactionList(transactionList || defaultTransactionList);
  }, [transactionList]);


  return (
    <TransactionContext.Provider value={{ userTransactionList, error, loading, transactionLimit, setTransactionLimit }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TicketProvider;

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  return ctx;
}