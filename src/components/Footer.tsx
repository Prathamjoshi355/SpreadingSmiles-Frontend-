import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-orange-400" />
              <span className="font-bold text-lg">Spreading Smiles</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Indore Educated Youth Organization dedicated to making a difference in our community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="hover:text-orange-400 transition">
                  What We Do
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-orange-400 transition">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-orange-400 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-orange-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get Involved</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/volunteer" className="hover:text-orange-400 transition">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-orange-400 transition">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-orange-400 transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Indore, Madhya Pradesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:hello@spreadingsmiles.in" className="hover:text-orange-400 transition">
                  hello@spreadingsmiles.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              (c) 2026 Spreading Smiles. All rights reserved. | Indore Educated Youth Organization
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
