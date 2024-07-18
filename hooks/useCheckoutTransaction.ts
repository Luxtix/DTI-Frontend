interface TransactionProps {
  eventId: string;
  voucherId: number | null;
  totalQty: number;
  finalPrice: number;
  totalDiscount: number;
  originalPrice: number;
  usePoint: number | null;
  tickets: {
    ticketId: number;
    price: number;
    qty: number;
  }[];
}

const useCheckoutTransaction = () => {
  const checkoutTransaction = async (result: TransactionProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(result),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { checkoutTransaction };
};

export default useCheckoutTransaction;
