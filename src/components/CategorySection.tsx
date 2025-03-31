
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Cotton Tees", image: "/lovable-uploads/f58560c1-52ee-4c3e-a214-0a25ef2ce2ac.png", link: "/category/cotton-tees" },
  { id: 2, name: "Polo Shirts", image: "/lovable-uploads/942023d1-8c37-428d-ba46-52cb1dee3186.png", link: "/category/polos" },
  { id: 3, name: "Hoodies", image: "/lovable-uploads/65186a80-a920-449a-aec0-8604fca41066.png", link: "/category/hoodies" },
  { id: 4, name: "Custom Prints", image: "/lovable-uploads/a80b18ad-52c5-4b00-a243-513405d1c910.png", link: "/customize" },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our wide range of high-quality t-shirts and clothing items for every style and occasion.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
