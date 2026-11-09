
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderNumber =
      typeof body.orderNumber === "string"
        ? body.orderNumber.trim().toUpperCase()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (
      !/^SOL-\d{8}-[A-F0-9]{8}$/.test(orderNumber) ||
      email.length > 254 ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      return NextResponse.json(
        { error: "Please enter a valid order number and email." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("orders")
      .select(`
        order_number,
        customer_email,
        subtotal,
        shipping_fee,
        total,
        order_status,
        payment_status,
        payment_method,
        checkout_mode,
        created_at,
        order_items (
          product_name,
          size,
          color,
          unit_price,
          quantity,
          line_total
        )
      `)
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (error) {
      console.error("Order tracking error:", error.message);

      return NextResponse.json(
        { error: "Unable to retrieve your order right now." },
        { status: 500 }
      );
    }

    // Verify the email on the server.
    if (
      !data ||
      data.customer_email.trim().toLowerCase() !== email
    ) {
      return NextResponse.json(
        { error: "We couldn't find an order matching those details." },
        { status: 404 }
      );
    }

    // Return only the information needed by the tracking page.
    return NextResponse.json({
      success: true,
      order: {
        orderNumber: data.order_number,
        subtotal: data.subtotal,
        shippingFee: data.shipping_fee,
        total: data.total,
        orderStatus: data.order_status,
        paymentStatus: data.payment_status,
        paymentMethod: data.payment_method,
        checkoutMode: data.checkout_mode,
        createdAt: data.created_at,
        items: data.order_items ?? [],
      },
    });
  } catch (error) {
    console.error("Track order API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
