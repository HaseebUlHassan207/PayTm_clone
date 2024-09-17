import { useEffect, useState } from "react";
import { Appbar } from "../component/AppBar";
import { Balance } from "../component/Balance";
import { Users } from "../component/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/accounts/balance", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        // Format the balance to 2 decimal places
        const formattedBalance = parseFloat(response.data.balance).toFixed(2);
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        // Optionally set error state or show a user-friendly message
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        {balance !== null ? (
          <Balance value={balance} />
        ) : (
          <div className="text-center text-gray-500">Loading balance...</div>
        )}
        <Users />
      </div>
    </div>
  );
};