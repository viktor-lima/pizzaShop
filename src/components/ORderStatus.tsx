export type OrderStatusEnum = "pending" | "canceled" | "processing" | "delivering" | "delivered";

interface ORderStatusProps {
  status: OrderStatusEnum,
}


const orderStatusMap: Record<OrderStatusEnum, string> = {
  pending: 'Pendente',
  canceled: 'cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: ORderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />  
      )}
      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      {['processing', 'delivering'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}
        <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
    </div>
  );
}