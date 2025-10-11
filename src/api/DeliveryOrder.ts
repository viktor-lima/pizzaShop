import { api } from "@/lib/axios";

export interface DeliveryOrderRequest {
  orderId: string;
}

export async function deliverOrder({orderId}: DeliveryOrderRequest) {
  await api.patch(`/orders/${orderId}/deliver`);
}