import { getDailyRenevueinPeriod } from "@/api/getDailyRenevueinPeriod";
import { PTBR } from "@/app/constants/linguage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts'
import { subDays } from 'date-fns'
import colors from 'tailwindcss/colors'
import { LucideLoader2 } from "lucide-react";

interface RevenueChartProps {
  // adicione suas props aqui
}

export function RevenueChart(props: RevenueChartProps) {

  const [dateRange, setDateRange] =  useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const {data: dailyRenevueinPeriod } =  useQuery({
    queryKey: ['metrics', 'daily-receipt-in-period', dateRange],
    queryFn: () => getDailyRenevueinPeriod({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
  })
  
  const chartData = useMemo(() => {
    return dailyRenevueinPeriod?.map(chartItem => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100
      }
    })
  }, [dailyRenevueinPeriod])
  
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">|Receita no Período</CardTitle>
          <CardDescription>Receita diaria no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Periodo</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width='100%' height={240}>
          <LineChart data={chartData} style={{fontsize: 12}}>

            <XAxis 
              dataKey="date"
              axisLine={false} 
              tickLine={false} 
              dy={16}
              stroke="#888" 
            />

            <YAxis
              stroke="#888" 
              axisLine={false} 
              tickLine={false} 
              width={90}
              tickFormatter={(value: number) => value.toLocaleString(PTBR,{
                style: 'currency',
                currency: "BRL"
            })} />
 

            <CartesianGrid vertical={false} className="stroke-muted"/>

            <Line type='linear' strokeWidth={2} dataKey="receipt" stroke={colors.violet[500]}/>

          </LineChart>
        </ResponsiveContainer>
        ): (
          <div className="flex h-[240px] w-full items-center justify-center">
            <LucideLoader2 className="h8 w8 text-muted-foreground animate-spin"/>
          </div>
        )}
      </CardContent>
    </Card>
  );
}