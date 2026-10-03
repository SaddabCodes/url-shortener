import { useQuery } from "react-query";
import api from "../api/api";



export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    ["my-shortenurls", token],
    async () => {
      return await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
      select: (data) => {
        const sortedData = data.data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
      enabled: Boolean(token),
    },
  );
};

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
