"use client";
import { PricingTable } from "@clerk/nextjs";
import React from "react";
import Header from "../_shared/Header";

export default function Pricing() {
  console.log("🔥 Pricing page rendered");
  return (
    
    <div>
      
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        <h2 className="text-center text-xl font-bold my-5">Pricing</h2>
        <PricingTable />
      </div>
    </div>
  );
}


