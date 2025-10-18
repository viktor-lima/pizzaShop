import { getPopularProducts } from "@/api/getPopularProducts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, LucideLoader2 } from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Pie, PieChart, Cell } from "recharts";
import colors from "tailwindcss/colors";
import { MatricCardSkeleton } from "./MatricCardSkeleton";

interface PopularProductsChartProps {
  // adicione suas props aqui
}


const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500]
]

export function PopularProductsChart(props: PopularProductsChartProps) {

  const {data: popularProducts} = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })
  

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">|Produtos Populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground"/>
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer width='100%' height={240}>
            <PieChart style={{fontsize: 12}}>
              <Pie 
                data={popularProducts} 
                dataKey="amount" 
                nameKey="product" 
                cx="50%" cy="50%" 
                outerRadius={86} 
                innerRadius={64} 
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const safeMidAngle = midAngle ?? 0
                  const x = cx + radius * Math.cos(-safeMidAngle * RADIAN)
                  const y = cy + radius * Math.sin(-safeMidAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      
                      {popularProducts[index as number].product.length > 12
                        ? popularProducts[index as number].product.substring(0, 12).concat('...')
                        : popularProducts[index as number].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularProducts.map((_, index) => {
                  return(
                    <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80"/>
                  )
                })}
              </Pie>

            </PieChart>
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