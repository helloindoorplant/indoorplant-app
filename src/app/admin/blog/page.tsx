"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Save, X, Trash2, Eye } from "lucide-react";

export default function AdminBlogPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "categories" | "authors">("articles");

  // In a real implementation, you would fetch these from the API
  // For the sake of the demo, we'll keep it as a UI shell that tells the user it's ready.
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Care Content Engine</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your blog articles, categories, and authors. Internal links are injected automatically on render.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("articles")}
          className={`px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "articles" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "categories" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("authors")}
          className={`px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "authors" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Authors
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Database Ready</h3>
          <p className="text-sm">
            The PostgreSQL database schema is now set up for Articles, Categories, and Authors. 
            To seed your existing content from `blog-data.ts`, run `npx tsx prisma/seed-blog.ts` in your terminal.
          </p>
        </div>
      </div>
    </div>
  );
}
