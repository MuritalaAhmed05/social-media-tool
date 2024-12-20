import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our website! We are dedicated to providing the best services to our customers.
          Our team is passionate about what we do and strives to exceed expectations.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to deliver high-quality products and services that enhance the lives of our customers.
          We believe in innovation, integrity, and excellence in everything we do.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Customer Satisfaction</li>
          <li>Integrity and Honesty</li>
          <li>Innovation and Creativity</li>
          <li>Teamwork and Collaboration</li>
          <li>Continuous Improvement</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions or would like to learn more about our services, feel free to contact us!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Email: <a href="mailto:info@example.com" className="text-blue-500 hover:underline">info@example.com</a>
        </p>
      </div>
    </div>
  );
}