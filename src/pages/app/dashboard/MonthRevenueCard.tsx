import { getMonthRevenue } from "@/api/getMonthRevenue";
import { PTBR } from "@/app/constants/linguage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

interface MonthRevenueCardProps {
  // adicione suas props aqui
}

export function MonthRevenueCard(props: MonthRevenueCardProps) {
  
  const { data: monthRevenue} = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-revenue']
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold">Receita toral (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
          <span className="text-2xl font-bold tracking-tight">{(monthRevenue.receipt / 100).toLocaleString(PTBR, {
            style: 'currency',
            currency: 'BRL'
          })}</span>
          <p className="text-xs text-muted-foreground">
            {monthRevenue.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">+{monthRevenue.diffFromLastMonth}%</span> em relação ao mês passado
              </>
            ) : (
              <>
                <span className="text-rose-600 dark:text-rose-400">{monthRevenue.diffFromLastMonth}%</span> em relação ao mês passado
              </>
            )}
          </p>
          </> 
        )}
      </CardContent>
    </Card>
  );
}