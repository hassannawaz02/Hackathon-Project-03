import { Playfair_Display, Cinzel, Bodoni_Moda, Prata, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"] });
const prata = Prata({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });

const BrandShowcase: React.FC = () => {
  return (
    <div className="w-full bg-black py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8">
        <div className={`${playfair.className} text-white text-2xl md:text-3xl font-serif tracking-wider`}>
          VERSACE
        </div>
        <div className={`${bodoni.className} text-white text-2xl md:text-3xl font-serif tracking-widest`}>
          ZARA
        </div>
        <div className={`${cinzel.className} text-white text-2xl md:text-3xl font-serif`}>
          GUCCI
        </div>
        <div className={`${prata.className} text-white text-2xl md:text-3xl font-bold tracking-wider`}>
          PRADA
        </div>
        <div className={`${montserrat.className} text-white text-2xl md:text-3xl font-light`}>
          Calvin Klein
        </div>
      </div>
    </div>
  );
}

export default BrandShowcase;
