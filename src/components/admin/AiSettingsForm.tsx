"use client";

import { updateAiSettings } from "@/app/admin/settings/actions";
import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";
import { SiteSettings } from "@prisma/client";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
      <Save className="w-4 h-4 mr-2" />
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export function AiSettingsForm({ settings }: { settings: SiteSettings | null }) {
  return (
    <form action={updateAiSettings} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Advisor Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">Manage AI prompts, behavior, and view conversation analytics.</p>
        </div>
        <SubmitButton />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Behavior Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Enable AI Advisor</h4>
              <p className="text-xs text-gray-500">Turn the AI chatbot on or off across the site.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="aiEnabled" defaultChecked={settings?.aiEnabled ?? true} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">AI Temperature ({settings?.aiTemperature || 0.7})</label>
            <input 
              type="range" 
              name="aiTemperature"
              min="0" max="1" step="0.1" 
              defaultValue={settings?.aiTemperature || 0.7}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Lower values are more deterministic, higher values are more creative.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt Context</label>
            <textarea 
              name="aiPromptContext"
              required
              className="w-full h-40 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              defaultValue={settings?.aiPromptContext || "You are an expert plant care assistant named AI Advisor for IndoorPlant.in."}
            />
            <p className="text-xs text-gray-500 mt-1">This defines the core personality and instructions for the AI.</p>
          </div>
        </div>
      </div>
    </form>
  );
}
