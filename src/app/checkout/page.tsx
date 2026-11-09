
"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "cod" | "gcash" | "card";

type OrderResult = {
  order_id: string;
  order_number: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
};

const SHIPPING_FEE = 150;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);

const inputClass =
  "w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

export default function CheckoutPage() {
  const { items, removeFromCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedOrder, setCompletedOrder] =
    useState<OrderResult | null>(null);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + SHIPPING_FEE;

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: {
            address_line: addressLine,
            barangay,
            city,
            province,
            postal_code: postalCode,
          },
          paymentMethod,
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to place your order."
        );
      }

      // Clear the cart only after the order is saved successfully.
      items.forEach((item) => removeFromCart(item.variantId));

      setCompletedOrder(result.order);
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

  // ORDER CONFIRMATION
  if (completedOrder) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
        <Navbar />

        <section className="bg-[#090909] px-6 py-14 text-white md:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              GAEL / Order Confirmation
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase sm:text-6xl">
              ORDER PLACED<span className="text-gray-500">.</span>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="border border-gray-200 bg-white p-6 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-3xl text-white">
              ✓
            </div>

            <div className="mt-7 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Thank You For Your Order
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase">
                YOU'RE ALL SET.
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500">
                Your GAEL demo order has been successfully recorded.
                You can use your order number and email address to
                check its status.
              </p>
            </div>

            <div className="mt-9 border border-gray-200 p-5 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Order Number
              </p>

              <p className="mt-2 break-all text-lg font-black sm:text-xl">
                {completedOrder.order_number}
              </p>

              <div className="mt-7 space-y-4 border-t border-gray-200 pt-5">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(completedOrder.subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Shipping Fee</span>
                  <span>{formatPrice(completedOrder.shipping_fee)}</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-gray-200 pt-5">
                  <span className="text-sm font-black uppercase">
                    Total
                  </span>

                  <span className="text-xl font-black">
                    {formatPrice(completedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-gray-400">
              This is a portfolio demonstration. No actual payment
              was processed or collected.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/track-order"
                className="bg-black px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-700"
              >
                Track Your Order
              </Link>

              <Link
                href="/shop"
                className="border border-black px-6 py-4 text-center text-xs font-bold uppercase tracking-widest transition hover:bg-black hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // EMPTY CART
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
        <Navbar />

        <section className="bg-[#090909] px-6 py-16 text-white md:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              GAEL / Checkout
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase">
              CHECKOUT<span className="text-gray-500">.</span>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Nothing To Checkout
          </p>

          <h2 className="mt-5 text-3xl font-black uppercase">
            YOUR CART IS EMPTY.
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Add something from the GAEL collection before
            proceeding to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-700"
          >
            Browse Collection ↗
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-[#090909] px-6 py-14 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            GAEL / Checkout
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase sm:text-6xl">
            CHECKOUT<span className="text-gray-500">.</span>
          </h1>

          <p className="mt-4 text-sm text-gray-400">
            Complete your details and get ready for your next step.
          </p>
        </div>
      </section>

      {/* CHECKOUT CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <Link
          href="/cart"
          className="text-xs font-bold uppercase tracking-widest text-gray-500 transition hover:text-black"
        >
          ← Back to Cart
        </Link>

        <form onSubmit={handleCheckout}>
          <div className="mt-9 grid items-start gap-10 lg:grid-cols-[1fr_390px]">
            {/* CUSTOMER DETAILS */}
            <div className="space-y-8">
              {/* CUSTOMER INFORMATION */}
              <section className="border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                   Your Details
                </p>

                <h2 className="mt-3 text-xl font-black uppercase">
                  Customer Information
                </h2>

                <div className="mt-7 space-y-5">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      Full Name
                    </label>

                    <input
                      id="customerName"
                      required
                      minLength={2}
                      maxLength={120}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Juan Dela Cruz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customerEmail"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      Email Address
                    </label>

                    <input
                      id="customerEmail"
                      required
                      type="email"
                      maxLength={254}
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      Phone Number
                    </label>

                    <input
                      id="customerPhone"
                      required
                      type="tel"
                      minLength={7}
                      maxLength={20}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="09XXXXXXXXX"
                    />
                  </div>
                </div>
              </section>

              {/* SHIPPING ADDRESS */}
              <section className="border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                   Delivery
                </p>

                <h2 className="mt-3 text-xl font-black uppercase">
                  Shipping Address
                </h2>

                <div className="mt-7 space-y-5">
                  <div>
                    <label
                      htmlFor="addressLine"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      House Number, Street, Building
                    </label>

                    <input
                      id="addressLine"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      autoComplete="street-address"
                      className={inputClass}
                      placeholder="House 123, Sample Street"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="barangay"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      Barangay
                    </label>

                    <input
                      id="barangay"
                      required
                      value={barangay}
                      onChange={(e) => setBarangay(e.target.value)}
                      className={inputClass}
                      placeholder="Barangay name"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                      >
                        City / Municipality
                      </label>

                      <input
                        id="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        autoComplete="address-level2"
                        className={inputClass}
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="province"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide"
                      >
                        Province
                      </label>

                      <input
                        id="province"
                        required
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        autoComplete="address-level1"
                        className={inputClass}
                        placeholder="Province"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      autoComplete="postal-code"
                      className={inputClass}
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </section>

              {/* PAYMENT METHOD */}
              <section className="border border-gray-200 bg-white p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                   Payment
                </p>

                <h2 className="mt-3 text-xl font-black uppercase">
                  Payment Method
                </h2>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Choose how you would like to pay for this demo order.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    {
                      value: "cod",
                      title: "Cash on Delivery",
                      description: "Pay when your order arrives.",
                    },
                    {
                      value: "gcash",
                      title: "GCash (Demo)",
                      description:
                        "Simulated GCash payment. No actual transaction.",
                    },
                    {
                      value: "card",
                      title: "Credit / Debit Card (Demo)",
                      description:
                        "Simulated card payment. Do not enter card details.",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex cursor-pointer gap-4 border p-5 transition ${
                        paymentMethod === method.value
                          ? "border-black bg-[#f5f5f5]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() =>
                          setPaymentMethod(method.value as PaymentMethod)
                        }
                        className="mt-1 accent-black"
                      />

                      <span>
                        <span className="block text-sm font-bold uppercase">
                          {method.title}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-gray-500">
                          {method.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-5 border-l-2 border-gray-300 bg-gray-50 p-4">
                  <p className="text-xs leading-6 text-gray-500">
                    Portfolio demo only. No real GCash transaction,
                    card payment, PIN, OTP, or payment credentials
                    are collected.
                  </p>
                </div>
              </section>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="h-fit border border-gray-200 bg-white p-6 sm:p-8 lg:sticky lg:top-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                GAEL / Your Selection
              </p>

              <h2 className="mt-3 text-xl font-black uppercase">
                Order Summary
              </h2>

              <div className="mt-7 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#e8e8e8]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black uppercase">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Size {item.size} · {item.color}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Shipping Fee</span>
                  <span>{formatPrice(SHIPPING_FEE)}</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-gray-200 pt-5">
                  <span className="text-sm font-black uppercase">
                    Total
                  </span>

                  <span className="text-xl font-black">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="mt-7 w-full bg-[#090909] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Processing Order..." : "Place Order ↗"}
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-gray-400">
                Demo checkout only. No actual payment will be collected.
              </p>

              <div className="mt-6 border-t border-gray-200 pt-5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  OWN YOUR EVERY STEP.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-[#090909] px-6 py-8 text-center text-white">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        © 2026 GAEL. Own Your Every Step.
      </p>
    </footer>
  );
}
