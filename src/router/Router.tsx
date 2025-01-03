import React, { memo } from "react";
import { Routes, Route } from "react-router";
import { Home } from "@/components/pages/Home";
import { BusinessCard } from "@/components/pages/BusinessCard";
import { Register } from "@/components/pages/Register";
import { Page404 } from "@/components/pages/Page404";

export const Router: React.FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cards">
        <Route index element={<Page404 />} />
        <Route path=":id" element={<BusinessCard />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
