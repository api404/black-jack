"use client";
import React, { FC } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
interface Props {
  children: React.ReactNode;
}
export const QueryClientProvider: FC<Props> = ({ children }) => (
  <ReactQueryQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryQueryClientProvider>
);
