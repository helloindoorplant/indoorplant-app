"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MapPin, Globe, Package, RefreshCw, Edit2, Eye, EyeOff,
  CheckCircle, XCircle, Save, X, ChevronDown, ChevronUp, Search
} from "lucide-react";

interface CityHub {
  id: string; slug: string; cityName: string; state: string; batchNumber: number;
  metaTitle: string | null; metaDesc: string | null; h1: string | null;
  introPara: string | null; climateNote: string | null; deliveryInfo: string | null;
  coverageAreas: string | null; localReviews: string | null;
  isActive: boolean; isIndexed: boolean; updatedAt: string;
}


const TABS = [
  { id: "cities",  label: "City Hubs",         icon: MapPin },
  { id: "states",  label: "State Hubs",         icon: Globe },
];

export default function AdminSEOPage() {
  const [tab, setTab] = useState<"cities" | "states">("cities");
  const [cities, setCities] = useState<CityHub[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCity, setEditingCity] = useState<CityHub | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadCities = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/seo/cities");
    const data = await res.json();
    setCities(data);
    setLoading(false);
  }, []);


  useEffect(() => { if (tab === "cities") loadCities(); }, [tab, loadCities]);

  const saveCity = async () => {
    if (!editingCity) return;
    setSaving(true);
    await fetch("/api/admin/seo/cities", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingCity),
    });
    setSaving(false);
    setEditingCity(null);
    loadCities();
    showToast(`✅ ${editingCity.cityName} saved`);
  };


  const toggleCityIndex = async (hub: CityHub) => {
    await fetch("/api/admin/seo/cities", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: hub.slug, isIndexed: !hub.isIndexed }),
    });
    loadCities();
    showToast(`${hub.cityName} ${!hub.isIndexed ? "indexed" : "noindexed"}`);
  };


  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-top">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO & GEO Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage city pages, product×city pages, and structured data. Changes reflect in Google within 1–4 weeks.
          </p>
        </div>
        <button
          onClick={loadCities}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── City Hubs Tab ── */}
      {tab === "cities" && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading…</div>
          ) : (
            [1, 2].map((batch) => (
              <div key={batch}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Batch {batch} {batch === 1 ? "— Launch Ready" : "— After Batch 1 Results"}
                </h3>
                {cities.filter((c) => c.batchNumber === batch).map((hub) => (
                  <div key={hub.slug} className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-2">
                    <div className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${hub.isActive && hub.isIndexed ? "bg-green-500" : hub.isActive ? "bg-yellow-400" : "bg-gray-300"}`} />
                        <div>
                          <p className="font-semibold text-gray-900">{hub.cityName}</p>
                          <p className="text-xs text-gray-500">{hub.state} · /plants/{hub.slug}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${hub.isIndexed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {hub.isIndexed ? "Indexed" : "NoIndex"}
                        </span>
                        <button
                          onClick={() => toggleCityIndex(hub)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"
                          title={hub.isIndexed ? "Set NoIndex" : "Set Indexed"}
                        >
                          {hub.isIndexed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setEditingCity(hub)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setExpandedCity(expandedCity === hub.slug ? null : hub.slug)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"
                        >
                          {expandedCity === hub.slug ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {expandedCity === hub.slug && (
                      <div className="border-t px-5 py-4 bg-gray-50 text-sm space-y-2">
                        <div><span className="font-medium text-gray-600">Meta Title:</span> <span className="text-gray-800">{hub.metaTitle ?? "⚠️ Not set"}</span></div>
                        <div><span className="font-medium text-gray-600">Climate Note:</span> <span className="text-gray-800">{hub.climateNote ? "✅ Set" : "⚠️ Not set"}</span></div>
                        <div><span className="font-medium text-gray-600">Delivery Info:</span> <span className="text-gray-800">{hub.deliveryInfo ? "✅ Set" : "⚠️ Not set"}</span></div>
                        <div><span className="font-medium text-gray-600">Coverage Areas:</span> <span className="text-gray-800">{hub.coverageAreas ? "✅ Set" : "⚠️ Not set"}</span></div>
                        <div><span className="font-medium text-gray-600">Local Reviews:</span> <span className="text-gray-800">{hub.localReviews ? "✅ Set" : "⚠️ Not set"}</span></div>
                        <a href={`/plants/${hub.slug}`} target="_blank" rel="noopener noreferrer" className="text-green-700 underline text-xs">
                          Preview page ↗
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

              >
                <option value="">All Products</option>
                {uniqueProducts.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">All Cities</option>
              {["bengaluru","delhi","mumbai","pune","chennai"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={loadProductPages} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
              Filter
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading…</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">City</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {productPages.map((p) => (
                    <tr key={`${p.productSlug}-${p.citySlug}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{p.productSlug}</td>
                      <td className="px-4 py-3 text-gray-600">{p.citySlug}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.isIndexed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {p.isIndexed ? "Indexed" : "NoIndex"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${p.isAutoGenerated ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}>
                          {p.isAutoGenerated ? "Auto" : "Manual"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setEditingPage(p)}
                          className="flex items-center gap-1 text-gray-500 hover:text-green-700 text-xs font-medium"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productPages.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        No product×city pages found. Save a product in admin to auto-seed them.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── State Hubs Tab ── */}
      {tab === "states" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <Globe className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="font-bold text-amber-900 mb-2">State Hubs — Batch 4</h3>
          <p className="text-sm text-amber-700">
            State hubs are disabled by default. Enable them in Batch 4 only after Search Console confirms state-level keyword demand.
            State pages are seeded via the <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">prisma/seed-seo.ts</code> script.
          </p>
        </div>
      )}

      {/* ── Edit City Modal ── */}
      {editingCity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Edit: {editingCity.cityName}</h2>
              <button onClick={() => setEditingCity(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { key: "metaTitle", label: "Meta Title", type: "input", hint: "60 chars max" },
                { key: "metaDesc", label: "Meta Description", type: "textarea", hint: "160 chars max" },
                { key: "h1", label: "H1 Heading", type: "input" },
                { key: "introPara", label: "Intro Paragraph", type: "textarea", hint: "150–200 words, unique to this city" },
                { key: "climateNote", label: "Climate & Care Note", type: "textarea", hint: "Local climate tips for plants in this city" },
                { key: "deliveryInfo", label: "Delivery Info", type: "textarea", hint: "E.g. 'Delivered in 2–4 days across Bengaluru, including Whitefield…'" },
                { key: "coverageAreas", label: "Coverage Areas (JSON)", type: "textarea", hint: '["Whitefield","HSR Layout","Koramangala"]' },
                { key: "localReviews", label: "Local Reviews (JSON)", type: "textarea", hint: '[{"name":"Priya","rating":5,"comment":"Loved it!","area":"HSR Layout"}]' },
              ].map(({ key, label, type, hint }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {hint && <span className="text-gray-400 font-normal ml-2 text-xs">{hint}</span>}
                  </label>
                  {type === "input" ? (
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={(editingCity as unknown as Record<string, unknown>)[key] as string ?? ""}
                      onChange={(e) => setEditingCity({ ...editingCity, [key]: e.target.value })}
                    />
                  ) : (
                    <textarea
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
                      value={(editingCity as unknown as Record<string, unknown>)[key] as string ?? ""}
                      onChange={(e) => setEditingCity({ ...editingCity, [key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCity.isIndexed}
                    onChange={(e) => setEditingCity({ ...editingCity, isIndexed: e.target.checked })}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Allow Google to index this page</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setEditingCity(null)} className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={saveCity}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
