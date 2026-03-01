"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

function PaymentReturnContent() {
  const searchParams = useSearchParams();

  const vnpResponseCode = searchParams.get("vnp_ResponseCode");
  const method = searchParams.get("method");

  let status: "success" | "failure" | "pending";
  let title: string;
  let description: string;

  if (vnpResponseCode) {
    // VNPay callback
    if (vnpResponseCode === "00") {
      status = "success";
      title = "Payment Successful";
      description =
        "Your payment has been processed successfully. Your order is now being prepared.";
    } else {
      status = "failure";
      title = "Payment Failed";
      description =
        "Your payment could not be processed. Please try again or contact support.";
    }
  } else if (method === "cash") {
    status = "pending";
    title = "Order Placed";
    description = "Your order has been placed. You will pay upon delivery.";
  } else if (method === "bank_transfer") {
    status = "pending";
    title = "Order Placed";
    description =
      "Your order has been placed. Please complete the bank transfer to process your order.";
  } else {
    status = "success";
    title = "Order Placed";
    description = "Your order has been placed successfully.";
  }

  const Icon =
    status === "success"
      ? CheckCircle2
      : status === "failure"
        ? XCircle
        : Clock;

  const iconColor =
    status === "success"
      ? "text-green-500"
      : status === "failure"
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <Icon className={`h-16 w-16 ${iconColor}`} />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/profile/orders">
              <Button>View My Orders</Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <p className="text-muted-foreground">Processing payment...</p>
        </div>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}
