"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    itemCount,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add some frames to get started.
        </p>
        <Link href="/shop">
          <Button className="mt-6 gap-2">
            Browse Frames
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-destructive"
        >
          Clear Cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.cartItemId}>
              <CardContent className="flex gap-4 p-4">
                <div className="h-24 w-24 shrink-0 rounded-lg bg-muted/50" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">
                        {item.frame.brand}
                      </p>
                      <p className="font-semibold">{item.frame.frameName}</p>
                      {item.lensType && (
                        <p className="text-xs text-muted-foreground">
                          Lens: {item.lensType.lensSpecification}
                        </p>
                      )}
                      {item.lensFeature && (
                        <p className="text-xs text-muted-foreground">
                          Feature: {item.lensFeature.featureSpecification}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-xs text-muted-foreground">
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeItem(item.cartItemId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-bold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items ({itemCount})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full gap-2" size="lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
