import Hero from "@/components/layout/Herro";
import Dress from "@/components/Casual/Dress";
import Top_sell from "./product/top-sell";
import Product from "./product/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Product />
      <Top_sell />
      <Dress />
    </div>
  );
}
