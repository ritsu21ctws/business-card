import React, { memo } from "react";
import { useParams } from "react-router";

export const BusinessCard: React.FC = memo(() => {
  const params = useParams();

  return <p>{`BusinessCardページです。idは${params.id}です。`}</p>;
});
