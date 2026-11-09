import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      items,
    } = body;

    if (
      typeof customerName !== "string" ||
      typeof customerEmail !== "string" ||
      typeof customerPhone !== "string" ||
      !shippingAddress ||
      typeof shippingAddress !== "object" ||
      !Array.isArray(items) ||
      !["cod", "gcash", "card"].includes(paymentMethod)
    ) {
      return NextResponse.json(
        { error: "Invalid checkout information." },
        { status: 400 }
      );
    }

    const checkoutItems = items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("create_demo_order", {
      p_customer_name: customerName,
      p_customer_email: customerEmail,
      p_customer_phone: customerPhone,
      p_shipping_address: shippingAddress,
      p_payment_method: paymentMethod,
      p_items: checkoutItems,
    });

    if (error) {
      console.error("Checkout error:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error("Checkout API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while processing your order." },
      { status: 500 }
    );
  }
}