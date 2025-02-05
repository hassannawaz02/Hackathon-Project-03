
import Image from "next/image";
import BrandShowcase from "./HeroFooter";
export default function Hero() {
  return (
    <div className="mt-24">
      <main className="flex flex-col lg:flex-row font-IntegralCF justify-between items-center mx-auto text-black relative bg-[#F2F0F1] w-full lg:h-[663px] gap-8 px-6 lg:px-12">
        {/* left */}
        <div className="  md:pl-0 md:w-[500px] lg:w-[600px] space-y-5  sm:pt-7 mt-10 px-3">
          <h1 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold`}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white text-sm sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full">
            Shop Now
          </button>
        </div>
        {/* Image Section */}
        <div className="lg:w-1/2 w-full h-full relative">
          <div className="absolute left-[60px] top-[260px] transform -translate-y-1/2 z-10">
            <Image
              src="/heroImages/star.png"
              alt="Vector Image Left-Center"
              layout="intrinsic"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="absolute right-8 top-10 z-10">
            <Image
              src="/heroImages/star.png"
              alt="heroImages/cover.png"
              layout="intrinsic"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="relative w-full h-64 sm:h-80 lg:h-full">
            <Image
              src="/heroImages/profile.png"
              alt="Hero Image"
              layout="fill"
              objectFit="contain"
              className="object-center"
            />
          </div>
        </div>
      </main>
      <BrandShowcase />
    </div>
  );
}
