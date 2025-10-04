import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./OrderDetails";
import { OrderStatus } from "@/components/ORderStatus";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";

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

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
        <Button variant="outline" size="xs">
          <ArrowRight  className="h-3 w-3 mr-2"/>
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X  className="h-3 w-3 mr-2"/>
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}