import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, PaymentStatus } from '../../types';
import { InvoiceModal } from '../../components/InvoiceModal';
import {
  Search,
  Filter,
  Truck,
  Printer,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Eye,
  AlertCircle
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, formatMoney, lang } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any>(null);
  const [trackingInput, setTrackingInput] = useState<string>('');

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.order_status !== statusFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchNo = order.order_number.toLowerCase().includes(q);
      const matchName = order.name.toLowerCase().includes(q);
      const matchPhone = order.phone.includes(q);
      if (!matchNo && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // When marking delivered, automatically mark payment as paid
    const newPaymentStatus: PaymentStatus | undefined = newStatus === 'delivered' ? 'paid' : undefined;
    
    // If transitioning to shipped, generate Steadfast Consignment ID if not present
    let tracking: string | undefined = undefined;
    if (newStatus === 'shipped') {
      tracking = `ST-BD-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    updateOrderStatus(
      orderId,
      newStatus,
      newStatus === 'shipped' ? 'Dispatched via Steadfast Courier' : undefined,
      tracking,
      newPaymentStatus
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Cash on Delivery Orders
          </h1>
          <p className="text-xs text-zinc-500">
            Manage COD verification, Steadfast courier dispatch & status tracking
          </p>
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <input
            type="text"
            placeholder="Search by Order #, Customer, Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-2 rounded-xl font-bold uppercase tracking-wider transition shrink-0 cursor-pointer ${
              statusFilter === st
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {st} ({st === 'all' ? orders.length : orders.filter(o => o.order_status === st).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Address & Area</th>
                <th className="py-3 px-4">COD Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status & Dispatch</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-zinc-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    {/* Order # */}
                    <td className="py-3 px-4">
                      <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {order.order_number}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-zinc-900 dark:text-white">{order.name}</p>
                      <p className="font-mono text-zinc-500">{order.phone}</p>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold">{order.district}, {order.upazila}</p>
                      <p className="text-[11px] text-zinc-500 truncate">{order.address}</p>
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded font-mono">
                        {order.area_type === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'} (৳{order.shipping_fee})
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-4 font-black text-zinc-900 dark:text-white">
                      {formatMoney(order.total_amount)}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.payment_status === 'paid'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {order.payment_status} (COD)
                      </span>
                    </td>

                    {/* Order Status & Steadfast action */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <select
                          value={order.order_status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold border border-zinc-300 dark:border-zinc-700 focus:outline-none cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped (Steadfast)</option>
                          <option value="delivered">Delivered (Paid)</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {order.courier_consignment_id && (
                          <div className="flex items-center space-x-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">
                            <Truck className="w-3 h-3" />
                            <span>{order.courier_consignment_id}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setInvoiceOrder(order)}
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                          title="Print Invoice PDF"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 hover:bg-indigo-100 cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full p-6 space-y-5 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white font-mono">
                  {selectedOrder.order_number}
                </h3>
                <p className="text-xs text-zinc-400">Placed on {new Date(selectedOrder.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-bold text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Customer Details */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1 text-xs">
              <p className="font-bold text-zinc-900 dark:text-white">{selectedOrder.name}</p>
              <p className="text-zinc-500 font-mono">Phone: {selectedOrder.phone}</p>
              <p className="text-zinc-600 dark:text-zinc-400">Address: {selectedOrder.address}, {selectedOrder.upazila}, {selectedOrder.district}</p>
              {selectedOrder.notes && (
                <p className="text-amber-600 font-semibold pt-1">Notes: "{selectedOrder.notes}"</p>
              )}
            </div>

            {/* Steadfast Consignment Dispatch Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-white flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <span>Steadfast Courier Dispatch</span>
                </span>
                {selectedOrder.courier_consignment_id ? (
                  <span className="font-mono font-bold text-indigo-600">{selectedOrder.courier_consignment_id}</span>
                ) : (
                  <span className="text-zinc-400">Not Dispatched</span>
                )}
              </div>

              {!selectedOrder.courier_consignment_id && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'shipped');
                    setSelectedOrder(null);
                  }}
                  className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 cursor-pointer"
                >
                  Generate Steadfast Consignment & Mark Shipped
                </button>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-zinc-400">Order Items</h4>
              {selectedOrder.items.map((it: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-zinc-100 dark:border-zinc-800">
                  <span>{it.quantity}x {it.title_en} ({it.variant_name_en})</span>
                  <span className="font-bold">{formatMoney(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatMoney(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee ({selectedOrder.area_type}):</span>
                <span>+{formatMoney(selectedOrder.shipping_fee)}</span>
              </div>
              {selectedOrder.discount_amount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({selectedOrder.coupon_code}):</span>
                  <span>-{formatMoney(selectedOrder.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total Cash on Delivery:</span>
                <span className="text-indigo-600">{formatMoney(selectedOrder.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          isOpen={!!invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
