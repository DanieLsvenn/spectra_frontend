// ========================
// Core Types matching Backend Models
// ========================

// User
export interface User {
  userId: string;
  fullName: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export type UserRole = "customer" | "staff" | "manager" | "admin";
export type UserStatus = "active" | "inactive" | "suspended" | "pending";

// Frame
export interface Frame {
  frameId: string;
  frameName: string;
  brand: string;
  color: string | null;
  material: string;
  lensWidth: number | null;
  bridgeWidth: number | null;
  frameWidth: number | null;
  templeLength: number | null;
  shape: string;
  size: string;
  basePrice: number;
  status: FrameStatus;
  stockQuantity: number | null;
  reorderLevel: number | null;
  frameMedia?: FrameMedia[];
}

export type FrameStatus = "available" | "inactive" | "out_of_stock";

// Frame Media
export interface FrameMedia {
  mediaId: string;
  frameId: string;
  mediaUrl: string;
  mediaType: string;
}

// Lens Type
export interface LensType {
  lensTypeId: string;
  lensSpecification: string;
  requiresPrescription: boolean;
  extraPrice: number;
}

// Lens Feature
export interface LensFeature {
  featureId: string;
  lensIndex: number;
  featureSpecification: string;
  extraPrice: number;
}

// Prescription
export interface Prescription {
  prescriptionId: string;
  userId: string;
  sphereLeft: number | null;
  sphereRight: number | null;
  cylinderLeft: number | null;
  cylinderRight: number | null;
  axisLeft: number | null;
  axisRight: number | null;
  addLeft: number | null;
  addRight: number | null;
  pupillaryDistance: number | null;
  doctorName: string | null;
  clinicName: string | null;
  expirationDate: string | null;
  createdAt: string;
}

// Order
export interface Order {
  orderId: string;
  userId: string;
  totalAmount: number;
  shippingAddress: string;
  arrivalDate: string | null;
  status: OrderStatus;
  createdAt: string;
  orderItems?: OrderItem[];
  payments?: Payment[];
  user?: User;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Order Item
export interface OrderItem {
  orderItemId: string;
  orderId: string;
  prescriptionId: string | null;
  frameId: string;
  featureId: string | null;
  lensTypeId: string | null;
  quantity: number;
  orderPrice: number;
  selectedColor: string | null;
  frame?: Frame;
  lensType?: LensType;
  lensFeature?: LensFeature;
  prescription?: Prescription;
}

// Preorder
export interface Preorder {
  preorderId: string;
  userId: string;
  expectedDate: string | null;
  status: PreorderStatus;
  createdAt: string;
  preorderItems?: PreorderItem[];
  payments?: Payment[];
}

export type PreorderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "converted"
  | "cancelled";

// Preorder Item
export interface PreorderItem {
  preorderItemId: string;
  preorderId: string;
  prescriptionId: string | null;
  frameId: string;
  featureId: string | null;
  lensTypeId: string | null;
  quantity: number;
  preorderPrice: number;
  selectedColor: string | null;
  frame?: Frame;
  lensType?: LensType;
  lensFeature?: LensFeature;
  prescription?: Prescription;
}

// Payment
export interface Payment {
  paymentId: string;
  orderId: string | null;
  preorderId: string | null;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
}

export interface CreatePaymentResponse {
  paymentId: string;
  orderId: string | null;
  preorderId: string | null;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentUrl: string | null;
  paidAt: string | null;
}

export type PaymentMethod = "vnpay" | "cash" | "bank_transfer";
export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded";

// Complaint Request
export interface ComplaintRequest {
  requestId: string;
  userId: string;
  orderItemId: string;
  requestType: ComplaintType;
  reason: string;
  mediaUrl: string | null;
  status: ComplaintStatus;
  createdAt: string;
  user?: User;
  orderItem?: OrderItem;
}

export type ComplaintType =
  | "return"
  | "exchange"
  | "refund"
  | "complaint"
  | "warranty";
export type ComplaintStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "in_progress"
  | "resolved"
  | "cancelled";

// ========================
// API Request/Response Types
// ========================

export interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface CreateOrderRequest {
  shippingAddress: string;
  items: CreateOrderItemRequest[];
}

export interface CreateOrderItemRequest {
  frameId: string;
  featureId?: string;
  lensTypeId?: string;
  prescriptionId?: string;
  quantity: number;
  selectedColor?: string;
}

export interface CreatePreorderRequest {
  expectedDate?: string;
  items: CreatePreorderItemRequest[];
}

export interface CreatePreorderItemRequest {
  frameId: string;
  featureId?: string;
  lensTypeId?: string;
  prescriptionId?: string;
  quantity: number;
  selectedColor?: string;
}

export interface CreatePaymentRequest {
  orderId?: string;
  preorderId?: string;
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface CreatePrescriptionRequest {
  sphereLeft?: number;
  sphereRight?: number;
  cylinderLeft?: number;
  cylinderRight?: number;
  axisLeft?: number;
  axisRight?: number;
  addLeft?: number;
  addRight?: number;
  pupillaryDistance?: number;
  doctorName?: string;
  clinicName?: string;
  expirationDate?: string;
}

export interface UpdatePrescriptionRequest extends CreatePrescriptionRequest {}

export interface CreateComplaintRequest {
  orderItemId: string;
  requestType: ComplaintType;
  reason: string;
  mediaUrl?: string;
}

export interface UpdateComplaintRequest {
  reason?: string;
  mediaUrl?: string;
}

export interface PriceCalculationRequest {
  frameId: string;
  featureId?: string;
  lensTypeId?: string;
}

export interface PriceCalculationResponse {
  framePrice: number;
  featurePrice: number;
  lensTypePrice: number;
  totalPrice: number;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  fullName?: string;
  phone?: string;
  address?: string;
}

export interface UpdateStockRequest {
  stockQuantity: number;
  reorderLevel?: number;
}

export interface DashboardStatistics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalFrames: number;
  pendingOrders: number;
  pendingComplaints: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface PopularFrame {
  frameId: string;
  frameName: string;
  brand: string;
  totalSold: number;
  revenue: number;
}

export interface OrderSummary {
  todayOrders: number;
  weekOrders: number;
  monthOrders: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
}

// Cart (client-side only)
export interface CartItem {
  cartItemId: string;
  frame: Frame;
  lensType: LensType | null;
  lensFeature: LensFeature | null;
  prescription: Prescription | null;
  quantity: number;
  selectedColor: string | null;
  unitPrice: number;
  isPreorder: boolean;
}
