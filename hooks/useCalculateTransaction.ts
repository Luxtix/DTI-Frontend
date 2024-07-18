import { useState } from "react";

interface calculatePriceProps {
  voucherId: number | null;
  originalPrice: number;
  usePoint: number | null;
}

interface CalculateResult {
  totalDiscount: number;
  finalPrice: number;
}

const useCalculateTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculateResult, setCalculateResult] = useState<CalculateResult>();

  const calculateTransaction = async (result: calculatePriceProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transaction/calculate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      const data = await response.json();
      setIsLoading(false);
      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };
  return { calculateTransaction };
};

export default useCalculateTransaction;
