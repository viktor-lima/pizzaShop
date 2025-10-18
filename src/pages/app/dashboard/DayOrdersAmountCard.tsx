import { getDayOrdersAmount } from "@/api/getDayOrdersAmount";
import { PTBR } from "@/app/constants/linguage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MatricCardSkeleton } from "./MatricCardSkeleton";

interface DayOrdersAmountCardProps {
  // adicione suas props aqui
}

export function DayOrdersAmountCard(props: DayOrdersAmountCardProps) {

  const { data: dayOrdersAmount} = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'day-orders-amount']
  })
  
  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
         <>
          <span className="text-2xl font-bold tracking-tight">{dayOrdersAmount.amount.toLocaleString(PTBR)}</span>
          <p className="text-xs text-muted-foreground">
            {dayOrdersAmount.diffFromYesterday >= 0 ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">+{dayOrdersAmount.diffFromYesterday}%</span>  em relação a ontem
              </>
            ) : (
              <>
                <span className="text-rose-600 dark:text-rose-400">{dayOrdersAmount.diffFromYesterday}%</span> em relação a ontem
              </>
            )}
          </p>
         </> 
        ) : (
          <MatricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}