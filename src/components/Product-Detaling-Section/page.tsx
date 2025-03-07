"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ProductDetails from "./ProductDetailContact";
import ReviewsContent from "./ReviewSection";
import FaqContent from "./FaqContact";
import ProductRecommendations from "./ProductRecomendation";
import Top_sell from "../arrivals";

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Product Details",
  },
  {
    id: 2,
    label: "Rating & Reviews",
  },
  {
    id: 3,
    label: "FAQs",
  },
];

const DetailPageSec = () => {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            className={cn([
              active === tab.id
                ? "border-black border-b-2 font-medium"
                : "border-b border-black/10 text-black/60 font-normal",
              "p-5 sm:p-6 rounded-none flex-1",
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mb-12 sm:mb-16">
        {active === 1 && <ProductDetails />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
      {/* <ProductRecommendations /> */}
      <Top_sell/>
    </div>
  );
};

export default DetailPageSec;
