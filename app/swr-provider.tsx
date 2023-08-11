"use client";
import axios from "axios";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios.get(url).then((response) => response.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};
