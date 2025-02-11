// routes/index.tsx
import { h } from "preact";

export default function About() {
  return (
    <div class="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div class="flex-1 flex items-center justify-center px-4 py-12">
        <div class="max-w-2xl w-full text-center bg-white p-8 rounded shadow-md">
          <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
            About Us
          </h1>
          <p class="text-gray-600 mb-8 leading-relaxed">
            We are a team of fragrance enthusiasts who love to explore the world of scents.
          </p>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Our goal is to provide you with the most up-to-date information about your favourite fragrance chemicals.
          </p>
          </div>
        </div>
        </div>
  );
}

function Navbar() {
  return (
    <nav class="bg-white border-b border-gray-200 p-4">
      <div class="max-w-screen-xl mx-auto flex items-center justify-between">
        <span class="text-2xl font-extrabold text-gray-800">ffragrance</span>
        <ul class="flex space-x-6">
          <li>
            <a href="/" class="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
          </li>
          <li>
            <a
              href="/chemicals"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              Chemicals Search
            </a>
          </li>
          <li>
            <a
              href="/formulas"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              Formulas
            </a>
          </li>
          <li>
            <a
              href="/inventory"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              Inventory
            </a>
          </li>
          <li>
            <a
              href="/about"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}