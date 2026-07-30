'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { SavedOrder, Inquiry } from '@/lib/orderStore';
import { getClientOrders, getClientInquiries, updateClientOrderStatus, syncOrdersFromCloud, pushOrdersToCloud } from '@/lib/clientStore';
import { CookingPot, Home, Users, IndianRupee, Package, CheckCircle2, Clock, Phone, MessageSquare, RefreshCw, Filter, Sparkles, AlertCircle, ArrowLeft, ShieldCheck, Check, XCircle, Hash, Bell } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPayment, setFilterPayment] = useState<'all' | 'PENDING' | 'PAID'>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries'>('orders');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Sync real-time orders from Cloud DB across all customer mobile phones
      const cloudSyncedOrders = await syncOrdersFromCloud();
      setOrders(cloudSyncedOrders);

      // Local inquiries
      const localInqs = getClientInquiries();
      setInquiries(localInqs);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // 2. Real-time 3-second Cloud Polling Interval to catch orders placed on customer phones
    let prevOrderCount = 0;
    const interval = setInterval(async () => {
      const latestOrders = await syncOrdersFromCloud();
      
      if (latestOrders.length > prevOrderCount && prevOrderCount > 0) {
        const newest = latestOrders[0];
        setNewOrderAlert(`🔔 NEW ORDER: ${newest.customerName} (${newest.id}) placed an order for ₹${newest.totalAmount}!`);
        setTimeout(() => setNewOrderAlert(null), 6000);
      }

      prevOrderCount = latestOrders.length;
      setOrders(latestOrders);
    }, 3000);

    const handleSyncEvent = async () => {
      const latest = await syncOrdersFromCloud();
      setOrders(latest);
    };

    window.addEventListener('tiffin_order_placed', handleSyncEvent);
    window.addEventListener('storage', handleSyncEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('tiffin_order_placed', handleSyncEvent);
      window.removeEventListener('storage', handleSyncEvent);
    };
  }, []);

  const handleConfirmPaymentInDatabase = async (order: SavedOrder) => {
    try {
      // Update local & Cloud store
      updateClientOrderStatus(order.id, {
        paymentStatus: 'PAID',
        orderStatus: 'ACTIVE',
      });

      const updatedList = await syncOrdersFromCloud();
      setOrders(updatedList);
      
      setActionSuccessMsg(`Payment for ${order.id} (UTR: ${order.utrNumber || 'N/A'}) confirmed in database! Subscription Activated.`);
      setTimeout(() => setActionSuccessMsg(''), 4000);

      // Open WhatsApp notification to customer
      const utrText = order.utrNumber ? ` (UTR: ${order.utrNumber})` : '';
      const message = `Hi ${order.customerName}, your payment of ₹${order.totalAmount.toLocaleString('en-IN')}${utrText} for Order ID: ${order.id} has been verified and confirmed in our bank statement! Your Home Made Tiffin subscription is now ACTIVE starting ${order.startDate}.`;
      const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Failed to confirm payment:', err);
    }
  };

  const handleUpdateStatus = async (orderId: string, orderStatus: SavedOrder['orderStatus']) => {
    try {
      updateClientOrderStatus(orderId, { orderStatus });
      const updatedList = await syncOrdersFromCloud();
      setOrders(updatedList);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredOrders = filterPayment === 'all'
    ? orders
    : orders.filter((o) => o.paymentStatus === filterPayment);

  const pendingPaymentsCount = orders.filter((o) => o.paymentStatus === 'PENDING').length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-10">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors" title="Back to Website">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-orange-500 text-white flex items-center justify-center font-bold">
              <CookingPot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>{siteConfig.brandName} Kitchen Portal</span>
                <span className="flex h-2.5 w-2.5 relative" title="Live Global Mobile Cloud Sync Active">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </h1>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Cloud Sync Active — Instant Mobile Customer Order Alerts
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {newOrderAlert && (
        <div className="max-w-7xl mx-auto mb-6 p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-sm flex items-center gap-2 animate-bounce">
          <Bell className="w-5 h-5 text-amber-400" />
          <span>{newOrderAlert}</span>
        </div>
      )}

      {actionSuccessMsg && (
        <div className="max-w-7xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Revenue</span>
              <IndianRupee className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Confirmed Paid Subscriptions</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Pending UTR Check</span>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              {pendingPaymentsCount}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Awaiting Bank UTR Cross-Check</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Active Subscriptions</span>
              <Package className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {orders.filter((o) => o.orderStatus === 'ACTIVE').length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Daily Kitchen Dispatch</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Catering Inquiries</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {inquiries.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Party Requests</div>
          </div>

        </div>

        {/* Tab Switcher & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('orders');
                setFilterPayment('all');
              }}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
                activeTab === 'orders' && filterPayment === 'all'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('orders');
                setFilterPayment('PENDING');
              }}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all relative ${
                filterPayment === 'PENDING'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-400 hover:text-amber-200 bg-amber-500/10'
              }`}
            >
              Needs UTR Verification ({pendingPaymentsCount})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Catering Requests ({inquiries.length})
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All Payment Statuses</option>
                <option value="PENDING" className="bg-slate-900">PENDING UTR Check</option>
                <option value="PAID" className="bg-slate-900">PAID & Verified</option>
              </select>
            </div>
          )}
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Plan & Amount</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">UTR & Payment Verification</th>
                    <th className="p-4">Dispatch Status</th>
                    <th className="p-4 text-right">Database Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium text-slate-300">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                        No orders matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-800/50 transition-colors">
                        
                        <td className="p-4">
                          <div className="font-extrabold text-white font-mono">{o.id}</div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(o.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-white">{o.customerName}</div>
                          <div className="text-emerald-400 font-mono">{o.customerPhone}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1 max-w-[200px]" title={o.address}>
                            {o.address}
                          </div>
                          {o.instructions && (
                            <div className="text-[10px] text-amber-400 italic mt-0.5">
                              Note: {o.instructions}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-white">{o.planName}</div>
                          <div className="text-emerald-400 font-black text-sm">₹{o.totalAmount.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-slate-500">{o.tiffinsCount} Tiffins</div>
                        </td>

                        <td className="p-4 font-bold text-slate-300">
                          {o.startDate}
                        </td>

                        <td className="p-4">
                          {o.paymentStatus === 'PAID' ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <Check className="w-3 h-3" /> VERIFIED PAID
                              </span>
                              {o.utrNumber && (
                                <div className="text-[10px] font-mono text-slate-400">
                                  UTR: <span className="font-extrabold text-emerald-300">{o.utrNumber}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                <Clock className="w-3 h-3 animate-pulse" /> PENDING UTR CHECK
                              </span>
                              {o.utrNumber ? (
                                <div className="text-[11px] font-mono font-black text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                  UTR: {o.utrNumber}
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-500 italic">No UTR provided</div>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateStatus(o.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-800 text-xs font-bold text-white rounded-lg p-1.5 focus:outline-none cursor-pointer"
                          >
                            <option value="NEW">NEW</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          {o.paymentStatus === 'PENDING' ? (
                            <button
                              onClick={() => handleConfirmPaymentInDatabase(o)}
                              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5 ml-auto"
                            >
                              <ShieldCheck className="w-4 h-4" />
                              <span>Confirm Payment & Activate</span>
                            </button>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`tel:${o.customerPhone}`}
                                className="p-2 rounded-lg bg-slate-800 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                                title="Call Customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <a
                                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(o.customerName)},%20your%20Home%20Made%20Tiffin%20subscription%20(${o.id})%20is%20ACTIVE!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                                title="WhatsApp Customer"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Inquiry ID</th>
                    <th className="p-4">Client Name & Phone</th>
                    <th className="p-4">Event Type</th>
                    <th className="p-4">Guest Count</th>
                    <th className="p-4">Event Date</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium text-slate-300">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                        No event catering inquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 font-bold text-white">{inq.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-white">{inq.name}</div>
                          <div className="text-emerald-400 font-mono">{inq.phone}</div>
                        </td>
                        <td className="p-4 font-extrabold text-amber-400">{inq.eventType}</td>
                        <td className="p-4 font-bold text-white">{inq.guestCount} Guests</td>
                        <td className="p-4 text-slate-300">{inq.eventDate}</td>
                        <td className="p-4 text-slate-400">{inq.notes || 'No special notes'}</td>
                        <td className="p-4 text-right">
                          <a
                            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(inq.name)},%20regarding%20your%20${encodeURIComponent(inq.eventType)}%20catering%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Quote</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
