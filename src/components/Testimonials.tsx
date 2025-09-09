import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Premium Gadgets offered me the best price for my iPhone 14 Pro. The pickup was seamless, and I received payment within hours. Highly professional service!",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I was skeptical about selling online, but Premium Gadgets exceeded my expectations. Fair pricing, quick evaluation, and excellent customer support throughout.",
      location: "Bangalore"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Sold my Samsung Galaxy S23 Ultra here and got ₹35,000 - much better than other platforms. The entire process was transparent and trustworthy.",
      location: "Delhi"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Doctor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Amazing experience! They picked up my iPad from my clinic and processed payment immediately. Will definitely recommend to friends and family.",
      location: "Hyderabad"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Professional team, competitive prices, and instant payments. Premium Gadgets is now my go-to platform for selling electronics. Simply outstanding!",
      location: "Pune"
    },
    {
      id: 6,
      name: "Kavya Nair",
      role: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The quote was accurate, pickup was on time, and payment was instant. No hidden charges, no complications. Exactly what they promise!",
      location: "Chennai"
    }
  ];

  return (
    <section className="section-padding bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What Our <span className="text-glow">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied customers who have trusted Premium Gadgets for their device selling needs. 
            Real reviews from real customers across India.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-16">
          <div className="text-center animate-slide-in-up">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center animate-slide-in-up" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl font-bold text-gold mb-2">10,000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl font-bold text-primary mb-2">₹50Cr+</div>
            <div className="text-muted-foreground">Paid to Customers</div>
          </div>
          <div className="text-center animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl font-bold text-gold mb-2">25+</div>
            <div className="text-muted-foreground">Cities Covered</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="testimonial-card animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary">{testimonial.location}</div>
                </div>
              </div>

              {/* Decorative Quote */}
              <div className="absolute top-4 right-4 text-6xl text-primary/10 font-serif">"</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-scale">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join our community of satisfied customers?
          </p>
          <button 
            onClick={() => document.getElementById('price-evaluation')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hero pulse-glow"
          >
            Start Selling Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;