"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, Home, Briefcase, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Address>>({
    label: "Home",
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: value }));

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const po = data[0].PostOffice[0];
          setFormData(prev => ({
            ...prev,
            city: po.District || po.Block || prev.city,
            state: po.State || prev.state
          }));
        }
      } catch (err) {
        console.error("Failed to fetch pincode details", err);
      }
    }
  };

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/user/addresses');
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      label: "Home", fullName: "", phone: "", street: "", city: "", state: "", pincode: "", country: "India", isDefault: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingId(addr.id);
    setFormData(addr);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/user/addresses/${editingId}` : `/api/user/addresses`;
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchAddresses();
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await fetch(`/api/user/addresses/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const getLabelIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("home")) return <Home className="w-4 h-4" />;
    if (l.includes("work") || l.includes("office")) return <Briefcase className="w-4 h-4" />;
    if (l.includes("gift")) return <Gift className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-playfair text-gray-900">Saved Addresses</h1>
        <Button onClick={openAddModal} className="bg-primary hover:bg-[#1B4332] text-white h-11 rounded-lg px-6">
          <Plus className="w-4 h-4 mr-2" /> Add New Address
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Addresses Found</h3>
          <p className="text-gray-500 mt-1 mb-6">You haven't saved any delivery addresses yet.</p>
          <Button onClick={openAddModal} variant="outline" className="h-11 rounded-lg px-6">Add Your First Address</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className={`bg-white rounded-xl border ${addr.isDefault ? 'border-primary shadow-md relative' : 'border-gray-200 shadow-sm'} p-6`}>
              {addr.isDefault && (
                <span className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-white" /> Default
                </span>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getLabelIcon(addr.label)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{addr.label}</h3>
                    <p className="text-sm font-medium text-gray-700">{addr.fullName}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => openEditModal(addr)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-md hover:bg-primary/10">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-md hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.pincode}</p>
                <p>{addr.country}</p>
                <p className="pt-2 font-medium">Phone: {addr.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold font-playfair text-gray-900">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address Label</label>
                  <Input required placeholder="Home, Office, Gift to Mom..." value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} />
                </div>
                <div className="space-y-2 flex items-end pb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} />
                    <span className="text-sm font-medium text-gray-700">Set as Default Address</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Recipient's Full Name</label>
                  <Input required placeholder="John Doe" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input required placeholder="+91 9876543210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Street Address</label>
                <Input required placeholder="Flat / House No / Building / Street" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <Input required placeholder="Mumbai" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <Input required placeholder="Maharashtra" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <Input required placeholder="400001" value={formData.pincode} onChange={handlePincodeChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <Input required value="India" readOnly className="bg-gray-50 cursor-not-allowed text-gray-600" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-[#1B4332] text-white">Save Address</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
