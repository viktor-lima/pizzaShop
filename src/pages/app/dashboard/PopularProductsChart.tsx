import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Pie, PieChart, Cell } from "recharts";
import colors from "tailwindcss/colors";

interface PopularProductsChartProps {
  // adicione suas props aqui
}



const data = [
  {
    product: 'Pizza Pepperoni',
    amount: 40
  },
  {
    product: 'Pizza Mussarela',
    amount: 30
  },
  {
    product: 'Pizza Marguerita',
    amount: 50
  },
  {
    product: 'Pizza Calabresa',
    amount: 16
  },
  {
    product: 'Pizza Frango Especial',
    amount: 26
  },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500]
]

export function PopularProductsChart(props: PopularProductsChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">|Produtos Populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground"/>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={240}>
          <PieChart style={{fontsize: 12}}>

            <Pie 
              data={data} 
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
                    
                    {data[index as number].product.length > 12
                      ? data[index as number].product.substring(0, 12).concat('...')
                      : data[index as number].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((_, index) => {
                return(
                  <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80"/>
                )
              })}
            </Pie>

          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}