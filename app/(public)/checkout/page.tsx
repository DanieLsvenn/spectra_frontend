"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { ordersApi } from "@/lib/api/orders";
import { preordersApi } from "@/lib/api/preorders";
import { paymentsApi } from "@/lib/api/payments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Banknote, Building } from "lucide-react";
import { toast } from "sonner";
import type { PaymentMethod } from "@/types";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, hasPreorderItems, hasOrderItems, clearCart } =
    useCart();
  const { isAuthenticated, fullUser } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState(fullUser?.address || "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vnpay");
  const [loading, setLoading] = useState(false);

  const orderItems = items.filter((item) => !item.isPreorder);
  const preorderItems = items.filter((item) => item.isPreorder);

  const orderTotal = orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const preorderTotal = preorderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Please sign in to checkout</h1>
        <Link href="/login">
          <Button className="mt-4">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/shop">
          <Button className="mt-4">Shop Now</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter a shipping address.");
      return;
    }

    setLoading(true);
    try {
      let paymentUrl: string | null = null;

      // Create order for in-stock items
      if (orderItems.length > 0) {
        const orderRes = await ordersApi.create({
          shippingAddress: address,
          items: orderItems.map((item) => ({
            frameId: item.frame.frameId,
            featureId: item.lensFeature?.featureId,
            lensTypeId: item.lensType?.lensTypeId,
            prescriptionId: item.prescription?.prescriptionId,
            quantity: item.quantity,
            selectedColor: item.selectedColor || undefined,
          })),
        });

        const order = orderRes.data;

        const paymentRes = await paymentsApi.create({
          orderId: order.orderId,
          amount: orderTotal,
          paymentMethod,
        });

        paymentUrl = paymentRes.data.paymentUrl;
      }

      // Create preorder for out-of-stock items
      if (preorderItems.length > 0) {
        const preorderRes = await preordersApi.create({
          items: preorderItems.map((item) => ({
            frameId: item.frame.frameId,
            featureId: item.lensFeature?.featureId,
            lensTypeId: item.lensType?.lensTypeId,
            prescriptionId: item.prescription?.prescriptionId,
            quantity: item.quantity,
            selectedColor: item.selectedColor || undefined,
          })),
        });

        const preorder = preorderRes.data;

        const preorderPaymentRes = await paymentsApi.create({
          preorderId: preorder.preorderId,
          amount: preorderTotal,
          paymentMethod,
        });

        // If we don't already have a paymentUrl from order, use preorder's
        if (!paymentUrl) {
          paymentUrl = preorderPaymentRes.data.paymentUrl;
        }
      }

      clearCart();

      // Redirect based on payment method
      if (paymentMethod === "vnpay" && paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        router.push(`/payment/return?method=${paymentMethod}`);
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to place order"
          : "Failed to place order";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <Label
                      htmlFor="vnpay"
                      className="flex flex-1 cursor-pointer items-center gap-3"
                    >
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">VNPay</p>
                        <p className="text-xs text-muted-foreground">
                          Pay securely with VNPay gateway
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label
                      htmlFor="bank_transfer"
                      className="flex flex-1 cursor-pointer items-center gap-3"
                    >
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-xs text-muted-foreground">
                          Direct bank transfer
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label
                      htmlFor="cash"
                      className="flex flex-1 cursor-pointer items-center gap-3"
                    >
                      <Banknote className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">
                          Pay when you receive your order
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasOrderItems && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order Items
                </p>
                {orderItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.frame.frameName}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </>
            )}

            {hasPreorderItems && (
              <>
                {hasOrderItems && <Separator />}
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Preorder Items
                </p>
                {preorderItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {item.frame.frameName}
                        <Badge variant="outline" className="ml-2 text-xs">
                          Preorder
                        </Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${preorderTotal.toFixed(2)}</span>
                </div>
              </>
            )}

            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
