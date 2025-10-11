import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./OrderDetails";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/CancelOrder";
import { GetOrdersResponse } from "@/api/getOrders";
import { approveOrder } from "@/api/ApproveOrder";
import { dispatchOrder } from "@/api/DispatchOrder";
import { deliverOrder } from "@/api/DeliveryOrder";
import { OrderStatus, OrderStatusEnum } from "@/components/ORderStatus";

interface OrderTableRowProps {
  key: string
  order: {
    orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
  }
}

export function OrderTableRow(props: OrderTableRowProps) {
  const { key, order  } = props;

  const queryClient = useQueryClient();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function updateOrderStatusOnCache(orderId:string, status: OrderStatusEnum) {
    const ordersListCach =  queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'], 
      })
      ordersListCach.forEach(([cacheKey, cacheData]) => {
        if(!cacheData){
          return;
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if(order.orderId === orderId) {
              return {
                ...order,
                status
              }
            }
            return order;
          }),
        });
      });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  });
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  });
  const { mutateAsync: dispatchOrderFn, isPending: isDispathingOrder } = useMutation({
    mutationFn: dispatchOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  });
  const { mutateAsync: deliveryOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  });


  return (
   <TableRow key={key}>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button 
          onClick={() => approveOrderFn({orderId: order.orderId})} 
          variant="outline" 
          size="xs"
          disabled={isApprovingOrder}
          >
            <ArrowRight  className="h-3 w-3 mr-2"/>
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button 
          onClick={() => dispatchOrderFn({orderId: order.orderId})} 
          variant="outline" 
          size="xs"
          disabled={isDispathingOrder}
          >
            <ArrowRight  className="h-3 w-3 mr-2"/>
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button 
          onClick={() => deliveryOrderFn({orderId: order.orderId})} 
          variant="outline" 
          size="xs"
          disabled={isDeliveringOrder}
          >
            <ArrowRight  className="h-3 w-3 mr-2"/>
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button 
          disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder} 
          variant="ghost" 
          size="xs" 
          onClick={() => cancelOrderFn({orderId: order.orderId})}
        >
          <X  className="h-3 w-3 mr-2"/>
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}