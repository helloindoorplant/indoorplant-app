"use client";

import { updateGeneralSettings } from "@/app/admin/settings/actions";
import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";
import { SiteSettings } from "@prisma/client";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
      <Save className="w-4 h-4 mr-2" />
      {pending ? "Saving..." : "Save Settings"}
    </button>
  );
}

export function GeneralSettingsForm({ settings }: { settings: SiteSettings | null }) {
  return (
    <form action={updateGeneralSettings} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage global store configuration.</p>
        </div>
        <SubmitButton />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Store Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input 
              type="text" 
              name="storeName"
              required
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              defaultValue={settings?.storeName || "IndoorPlant.in"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input 
              type="email" 
              name="supportEmail"
              required
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              defaultValue={settings?.supportEmail || "support@indoorplant.in"}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
