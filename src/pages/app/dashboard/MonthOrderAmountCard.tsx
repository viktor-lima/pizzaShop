import { getMonthOrdersAmount } from "@/api/getMonthOrdersAmount";
import { PTBR } from "@/app/constants/linguage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

interface MonthOrderAmountCardProps {
  // adicione suas props aqui
}

export function MonthOrderAmountCard(props: MonthOrderAmountCardProps) {
  
  const { data: monthOrdersAmount} = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount']
  })
  
  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
          <span className="text-2xl font-bold tracking-tight">{monthOrdersAmount.amount.toLocaleString(PTBR)}</span>
          <p className="text-xs text-muted-foreground">
            {monthOrdersAmount.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">+{monthOrdersAmount.diffFromLastMonth}%</span> em relação ao mês passado
              </>
            ) : (
              <>
                <span className="text-rose-600 dark:text-rose-400">{monthOrdersAmount.diffFromLastMonth}%</span> em relação ao mês passado
              </>
            )}
          </p>
          </> 
        )}
      </CardContent>
    </Card>
  );
}