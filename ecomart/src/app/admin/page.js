"use client";
import { useState } from 'react';
import Companies from '../../components/Companies';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Eco-Product Verification Dashboard
        </h1>
        <Companies />
      </div>
    </div>
  );
}
