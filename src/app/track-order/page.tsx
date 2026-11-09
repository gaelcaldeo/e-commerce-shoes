
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type OrderItem = {
  product_name: string;
  size: number;
  color: string;
  unit_price: number;
  quantity: number;
  line_total: number;
};

type TrackedOrder = {
  orderNumber: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  checkoutMode: string;
  createdAt: string;
  items: OrderItem[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);

const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  gcash: "GCash (Demo)",
  card: "Credit / Debit Card (Demo)",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function getStatusStyle(status: string) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

function getStatusDescription(status: string) {
  switch (status) {
    case "pending":
      return "Your order has been received and is awaiting processing.";
    case "processing":
      return "Your order is currently being prepared.";
    case "shipped":
      return "Your order has been shipped.";
    case "delivered":
      return "Your order has been delivered. Thanks for choosing GAEL.";
    case "cancelled":
      return "This order has been cancelled.";
    default:
      return "Check back later for an updated order status.";
  }
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrackOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setOrder(null);

    try {
      const response = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber,
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to find your order.");
      }

      setOrder(result.order);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#090909] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            GAEL / Order Support
          </p>

          <h1 className="mt-5 text-4xl font-black uppercase tracking-tight sm:text-6xl">
            Track Your
            <span className="block text-gray-500">Order.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
            Keep up with your order. Enter your order number and email address
            to view your purchase details and current status.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        {/* Search Form */}
        {!order && (
          <section className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Order Lookup
              </p>

              <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">
                Find Your Order
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Use the order number from your checkout confirmation and the
                email address you provided when ordering.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Order Number
                </label>

                <input
                  required
                  value={orderNumber}
                  onChange={(e) =>
                    setOrderNumber(e.target.value.toUpperCase())
                  }
                  placeholder="SOL-20261106-XXXXXXXX"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Enter your complete order number.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Searching..." : "Track My Order"}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Need to place another order?
              </p>

              <Link
                href="/shop"
                className="mt-2 inline-block text-sm font-bold underline underline-offset-4 hover:text-gray-500"
              >
                Explore the Collection
              </Link>
            </div>
          </section>
        )}

        {/* Order Result */}
        {order && (
          <section className="space-y-6">
            {/* Order Overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Order Confirmation
                  </p>

                  <h2 className="mt-2 break-all text-xl font-black tracking-tight sm:text-2xl">
                    {order.orderNumber}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleString("en-PH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${getStatusStyle(
                    order.orderStatus
                  )}`}
                >
                  {statusLabels[order.orderStatus] ?? order.orderStatus}
                </span>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  Current Status
                </p>

                <div className="mt-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <span className="text-sm">✓</span>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {statusLabels[order.orderStatus] ?? order.orderStatus}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {getStatusDescription(order.orderStatus)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Items Ordered
                </h3>

                <span className="text-xs font-medium text-gray-400">
                  {order.items.length} item(s)
                </span>
              </div>

              <div className="space-y-5">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.product_name}-${item.size}-${index}`}
                    className="flex justify-between gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-bold">{item.product_name}</p>

                      <p className="mt-1 text-sm text-gray-500">
                        Size {item.size} · {item.color}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {formatPrice(item.unit_price)} × {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold">
                      {formatPrice(item.line_total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-black uppercase tracking-tight">
                Payment Summary
              </h3>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="text-right font-semibold">
                    {paymentLabels[order.paymentMethod] ??
                      order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Payment Status</span>
                  <span className="font-semibold capitalize">
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Fee</span>
                  <span>{formatPrice(order.shippingFee)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-5 text-lg font-black">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setOrder(null);
                  setOrderNumber("");
                  setEmail("");
                  setErrorMessage("");
                }}
                className="flex-1 rounded-full border border-black px-6 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-gray-100"
              >
                Track Another Order
              </button>

              <Link
                href="/shop"
                className="flex-1 rounded-full bg-black px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-center text-xs leading-6 text-gray-400">
              GAEL portfolio demo. Order statuses are sample store records,
              not live courier tracking.
            </p>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-black px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter"
          >
            GAEL.
          </Link>

          <p className="text-center text-xs text-gray-500">
            OWN YOUR EVERY STEP. © {new Date().getFullYear()} GAEL.
          </p>

          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:text-white"
          >
            Shop Collection
          </Link>
        </div>
      </footer>
    </main>
  );
}
