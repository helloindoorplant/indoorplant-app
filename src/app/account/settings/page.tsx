"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Save, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  
  // Settings state
  const [name, setName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ text: data.error || 'Failed to update settings', type: 'error' });
      } else {
        setMessage({ text: 'Settings updated successfully!', type: 'success' });
        setCurrentPassword("");
        setNewPassword("");
        // Update session
        if (update) update({ name });
      }
    } catch (err) {
      setMessage({ text: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' });
      if (res.ok) {
        await signOut({ callbackUrl: '/' });
      } else {
        const data = await res.json();
        setMessage({ text: data.error || 'Failed to delete account', type: 'error' });
        setShowDeleteModal(false);
      }
    } catch (err) {
      setMessage({ text: 'An unexpected error occurred.', type: 'error' });
      setShowDeleteModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-playfair text-gray-900">Account Settings</h1>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleUpdateProfile} className="p-6 md:p-8 space-y-8">
          
          {/* Personal Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="h-11 rounded-lg" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <Input 
                  value={session?.user?.email || ""} 
                  disabled 
                  className="h-11 rounded-lg bg-gray-50 text-gray-500" 
                />
                <p className="text-xs text-gray-500">Email addresses cannot be changed.</p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Security */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
              Change Password
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <Input 
                  type="password"
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  className="h-11 rounded-lg" 
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <Input 
                  type="password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="h-11 rounded-lg" 
                  placeholder="Enter new password"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-[#1B4332] text-white px-8 h-11 rounded-lg">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-xl shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-semibold text-red-700 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Danger Zone
        </h2>
        <p className="text-sm text-red-600/80 mb-6 max-w-2xl">
          Permanently delete your account and all associated data. This action cannot be undone and you will lose all your order history, plant journal entries, and saved settings.
        </p>
        <Button 
          variant="destructive" 
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white h-11 rounded-lg px-8"
        >
          Delete Account
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action is permanent. All your data will be wiped immediately. To confirm, please type <strong>DELETE</strong> below.
            </p>
            <Input 
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="mb-6 h-12"
              placeholder="Type DELETE"
            />
            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button 
                variant="destructive" 
                disabled={deleteConfirmation !== "DELETE" || isLoading}
                onClick={handleDeleteAccount}
              >
                {isLoading ? "Deleting..." : "Permanently Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple internal icon since we couldn't import User directly due to name collision with session.user
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
