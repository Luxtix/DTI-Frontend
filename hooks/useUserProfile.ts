import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  email: string;
  displayName: string;
  phoneNumber: string;
  avatar: string;
  referralCode: string;
}

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/profile",
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast]);

  return { userProfile, loading };
}
