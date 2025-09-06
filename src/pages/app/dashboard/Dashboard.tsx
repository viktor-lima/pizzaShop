import { Helmet } from "react-helmet-async";
import { MonthRevenueCard } from "./MonthRevenueCard";
import { MonthOrderAmountCard } from "./MonthOrderAmountCard";
import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./MonthCanceledOrdersAmountCard";
import { RevenueChart } from "./RevenueChart";

export function Dashboard() {
  return(
     <div>
        <Helmet title="Dashboard" />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4">
            <MonthRevenueCard />
            <MonthOrderAmountCard />
            <DayOrdersAmountCard />
            <MonthCanceledOrdersAmountCard />
          </div>

          <div className="grid grid-cols-9 gap-4">
            <RevenueChart />
          </div>
        </div>
    </div>
  )
}
