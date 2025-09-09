import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" }
    ],
    services: [  
      { name: "Sell Your Device", href: "#" },
      { name: "Buy Refurbished", href: "#" },
      { name: "Trade-In Program", href: "#" },
      { name: "Bulk Sales", href: "#" },
      { name: "Corporate Solutions", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Support", href: "#contact" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns Policy", href: "#" },
      { name: "Warranty", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Data Protection", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-gradient-hero border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold">
                  <span className="text-glow">Premium</span>
                  <span className="text-foreground"> Gadgets</span>
                </h3>
                <p className="text-muted-foreground mt-2">
                  Your trusted marketplace for quality electronics
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're revolutionizing how people buy and sell premium gadgets in India. 
                With transparent pricing, instant payments, and doorstep services, 
                we make technology accessible to everyone.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-primary" />
                  <span>support@premiumgadgets.com</span>
                </div>
                <div className="flex items-start text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary mt-1" />
                  <span>Tech Hub, Koramangala, Bangalore 560034</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-muted-foreground">
                Get the latest deals, tech news, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="form-premium flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-4 py-3"
                />
              </div>
              <button className="btn-gold px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="py-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-muted-foreground">
              <p className="mb-1">
                © {currentYear} Premium Gadgets. All rights reserved.
              </p>
              <p className="text-sm">
                Made with ❤️ in India | Trusted by 10,000+ customers
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-6 border-t border-border/30">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              SSL Secured
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              ISO 27001 Certified
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              GDPR Compliant
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-gold rounded-full mr-2"></div>
              RBI Approved Partner
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;