import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Trending designs", slug: "trending-designs", img: "/Gallery_Img/bg10.jpg" },
  { name: "Indian designs", slug: "indian-designs", img: "/Gallery_Img/bg11.jpg" },
  { name: "Simple designs", slug: "simple-designs", img: "/Gallery_Img/bg12.jpg" },
  { name: "Arabic designs", slug: "arabic-designs", img: "/Gallery_Img/bg13.jpg" },
  { name: "Pakistani Mehndi", slug: "pakistani-mehndi", img: "/Gallery_Img/bg14.jpg" },
  { name: "Aesthetic designs", slug: "aesthetic-designs", img: "/Gallery_Img/bg15.jpg" },
  { name: "Feet designs", slug: "feet-designs", img: "/Gallery_Img/bg16.jpg" },
  { name: "Backhand designs", slug: "backhand-designs", img: "/Gallery_Img/bg17.jpg" },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-28">
      <div className=" py-4 rounded-md mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#B85C1B]">Categories</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/project/${cat.slug}`} className="group">
            <div className="border-2 border-[#B85C1B] rounded-md p-6 flex flex-col items-center hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="w-40 h-40 rounded-full bg-pink-100 overflow-hidden flex items-center justify-center">
                <Image src={cat.img} alt={cat.name} width={220} height={220} className="object-cover w-full h-full" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#B85C1B]">{cat.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
