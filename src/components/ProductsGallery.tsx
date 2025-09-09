import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const ProductsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "smartphones", name: "Smartphones" },
    { id: "tablets", name: "Tablets" },
    { id: "watches", name: "Smart Watches" },
    { id: "accessories", name: "Accessories" }
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "smartphones",
      price: "₹52,000",
      originalPrice: "₹65,000",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      discount: "20% off"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "smartphones", 
      price: "₹45,000",
      originalPrice: "₹58,000",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      discount: "22% off"
    },
    {
      id: 3,
      name: "iPad Pro 12.9\"",
      category: "tablets",
      price: "₹38,000",
      originalPrice: "₹48,000",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      discount: "21% off"
    },
    {
      id: 4,
      name: "Apple Watch Ultra 2",
      category: "watches",
      price: "₹28,000",
      originalPrice: "₹35,000",
      condition: "Good",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
      discount: "20% off"
    },
    {
      id: 5,
      name: "AirPods Pro (2nd Gen)",
      category: "accessories",
      price: "₹8,500",
      originalPrice: "₹12,000",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      discount: "29% off"
    },
    {
      id: 6,
      name: "Google Pixel 8 Pro",
      category: "smartphones",
      price: "₹35,000",
      originalPrice: "₹42,000",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      discount: "17% off"
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="section-padding bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Premium <span className="text-glow">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully curated collection of certified pre-owned and refurbished devices. 
            Each product undergoes rigorous quality checks to ensure premium standards.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="device-card group animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Discount Badge */}
                <Badge className="absolute top-4 right-4 bg-gradient-gold text-gold-foreground font-semibold">
                  {product.discount}
                </Badge>

                {/* Condition Badge */}
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  {product.condition}
                </Badge>
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-glow">
                      {product.price}
                    </div>
                    <div className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </div>
                  </div>
                  
                  <button className="btn-gold text-sm px-4 py-2">
                    View Details
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                  <span>✓ Warranty Included</span>
                  <span>✓ Quality Assured</span>
                  <span>✓ Fast Delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="btn-hero">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsGallery;