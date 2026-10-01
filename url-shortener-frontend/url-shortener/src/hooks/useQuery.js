import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    ["url-total-clicks", token],
    async () => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 30);

      const response = await api.get("/api/urls/totalClicks", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        params: {
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        },
      });

      return response;
    },
    {
      enabled: Boolean(token),
      select: (data) => {
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: data.data[key],
        }));
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    },
  );
};
