'use client';  // Add this at the top since we're using client-side components

import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useState } from 'react';

const growthData = [
  { month: 'Jan', growth: 20 },
  { month: 'Feb', growth: 35 },
  { month: 'Mar', growth: 45 },
  { month: 'Apr', growth: 60 },
  { month: 'May', growth: 75 },
  { month: 'Jun', growth: 85 },
];

const impactData = [
  { year: '2020', impact: 30 },
  { year: '2021', impact: 45 },
  { year: '2022', impact: 65 },
  { year: '2023', impact: 85 },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <button onClick={() => scrollToSection('home')} className="text-green-600 text-xl font-bold">
                  Eco-Friendly
                </button>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('statistics')}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Statistics
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Register Button */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {/* Menu Icon */}
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close Icon */}
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="bg-green-50 border-green-500 text-green-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('statistics')}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
            >
              Statistics
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
            >
              Contact
            </button>
            <Link
              href="/register"
              className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mx-2"
            >
              Register Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Add IDs to each section */}
      <div id="home" className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Welcome to</span>
                    <span className="block text-green-600">Eco-Friendly Products</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join us in making the world a better place. Register your eco-friendly products and be part of the sustainable revolution.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        href="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                      >
                        Register With Us
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        href="/products"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                      >
                        View Products
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <div id="about">
        {/* About Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">About Our Products</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Sustainable Solutions for a Better Tomorrow
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                We carefully curate and verify eco-friendly products that meet our strict environmental standards.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    🌱
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Eco-Friendly Materials</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    All our products are made from sustainable materials that minimize environmental impact.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    ♻️
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Recyclable Packaging</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    We ensure all our packaging is recyclable or biodegradable.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    🌍
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Carbon Neutral</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    We offset our carbon footprint through various environmental initiatives.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    💚
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Verified Products</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Each product undergoes thorough verification for environmental compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="statistics">
        {/* Statistics Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Impact Analysis</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Our Growth Story
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                See how businesses have grown with our eco-friendly certification platform
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Growth Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Business Growth</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="growth" fill="#059669" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Average monthly growth rate of businesses after certification
                </p>
              </div>

              {/* Yearly Impact Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact Score</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impact" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Yearly improvement in environmental impact scores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact">
        {/* Footer */}
        <footer className="bg-gray-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Eco-Friendly Products</h3>
                <p className="text-gray-400 text-sm">
                  Making the world better through sustainable product certification.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/register" className="text-gray-400 hover:text-green-500 text-sm">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-gray-400 hover:text-green-500 text-sm">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-green-500 text-sm">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 text-sm">
                    <span className="font-medium">Email:</span> contact@eco-friendly.com
                  </li>
                  <li className="text-gray-400 text-sm">
                    <span className="font-medium">Phone:</span> +1 (555) 123-4567
                  </li>
                  <li className="text-gray-400 text-sm">
                    <span className="font-medium">Address:</span> 123 Green Street, Eco City
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Eco-Friendly Products. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
