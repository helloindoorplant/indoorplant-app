'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  ExternalLink,
  Search,
  Filter,
  Ticket,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Trash2
} from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  productId: string;
  isUsed: boolean;
  usedAt: string | null;
  createdAt: string;
}

interface CreatorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string | null;
  note: string | null;
  productId: string;
  productName: string;
  productImage: string | null;
  status: string;
  coupon: Coupon | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCreatorsPage() {
  const [applications, setApplications] = useState<CreatorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<Record<string, 'APPROVED' | 'REJECTED' | 'PENDING'>>({});

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/creators');
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (applicationId: string, action: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    setProcessingId(applicationId);
    try {
      const res = await fetch('/api/admin/creators/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, action }),
      });
      
      if (res.ok) {
        await fetchApplications();
        setSelectedActions((prev) => {
          const next = { ...prev };
          delete next[applicationId];
          return next;
        });
      } else {
        const data = await res.json();
        alert(data.error || 'Action failed');
      }
    } catch (err) {
      console.error('Action error:', err);
      alert('Something went wrong');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this creator application? This action cannot be undone.')) {
      return;
    }
    setProcessingId(applicationId);
    try {
      const res = await fetch('/api/admin/creators/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId }),
      });
      
      if (res.ok) {
        await fetchApplications();
      } else {
        const data = await res.json();
        alert(data.error || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Something went wrong');
    } finally {
      setProcessingId(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = applications.filter((app) => {
    const matchesFilter = filter === 'ALL' || app.status === filter;
    const matchesSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.instagram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    approved: applications.filter(a => a.status === 'APPROVED').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length,
    couponsUsed: applications.filter(a => a.coupon?.isUsed).length,
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
      APPROVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      REJECTED: 'bg-red-100 text-red-700 border-red-200',
    };
    const icons: Record<string, React.ReactNode> = {
      PENDING: <Clock className="w-3.5 h-3.5" />,
      APPROVED: <CheckCircle2 className="w-3.5 h-3.5" />,
      REJECTED: <XCircle className="w-3.5 h-3.5" />,
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || ''}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Creator Program
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage creator applications, coupons, and collaborations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'bg-gray-100 text-gray-700' },
          { label: 'Pending', value: stats.pending, color: 'bg-amber-50 text-amber-700' },
          { label: 'Approved', value: stats.approved, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-50 text-red-700' },
          { label: 'Coupons Used', value: stats.couponsUsed, color: 'bg-blue-50 text-blue-700' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 border border-transparent`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">{s.label}</p>
            <p className="text-2xl font-extrabold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                filter === f 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, IG, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* Applications Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No applications found</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter !== 'ALL' ? 'Try changing the filter.' : 'Applications will appear here.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Creator</th>
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Plant Requested</th>
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Coupon</th>
                  <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                  <th className="text-right px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    {/* Creator */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{app.name}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        <a
                          href={`https://instagram.com/${app.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 font-medium"
                        >
                          <InstagramIcon className="w-3 h-3" />
                          @{app.instagram}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        {app.facebook && (
                          <a
                            href={`https://facebook.com/${app.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <span className="font-bold text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded leading-none shrink-0">FB</span>
                            {app.facebook}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      {app.note && (
                        <p className="text-xs text-gray-400 mt-1.5 max-w-[200px] truncate" title={app.note}>
                          Note: {app.note}
                        </p>
                      )}
                    </td>

                    {/* Plant */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {app.productImage && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <Image
                              src={app.productImage}
                              alt={app.productName}
                              width={40}
                              height={40}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="font-medium text-gray-800 text-sm">{app.productName}</span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {app.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {app.phone}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {statusBadge(app.status)}
                    </td>

                    {/* Coupon */}
                    <td className="px-5 py-4">
                      {app.coupon ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono font-bold text-gray-800">
                              {app.coupon.code}
                            </code>
                            <button 
                              onClick={() => handleCopyCode(app.coupon!.code)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              {copiedCode === app.coupon.code ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-gray-400" />
                              )}
                            </button>
                          </div>
                          {app.coupon.isUsed ? (
                            <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
                              ✓ Used {app.coupon.usedAt && `on ${new Date(app.coupon.usedAt).toLocaleDateString()}`}
                            </span>
                          ) : (
                            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
                              Not yet used
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-xs text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={selectedActions[app.id] || app.status}
                          onChange={(e) => setSelectedActions(prev => ({ ...prev, [app.id]: e.target.value as any }))}
                          disabled={processingId === app.id}
                          className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 cursor-pointer"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="APPROVED">Approve</option>
                          <option value="REJECTED">Reject</option>
                        </select>

                        <button
                          onClick={() => handleAction(app.id, selectedActions[app.id] || (app.status as any))}
                          disabled={processingId === app.id || (selectedActions[app.id] || app.status) === app.status}
                          style={{ backgroundColor: '#1B4332', color: 'white' }}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm hover:opacity-90"
                        >
                          {processingId === app.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          Submit
                        </button>

                        <button
                          onClick={() => handleDelete(app.id)}
                          disabled={processingId === app.id}
                          title="Delete application"
                          className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-40 flex items-center justify-center border border-red-100 shadow-sm"
                        >
                          {processingId === app.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
