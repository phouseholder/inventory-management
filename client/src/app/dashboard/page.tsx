"use client";

import ExpenseSummary from "./ExpenseSummary";
import PopularProducts from "./PopularProducts";
import PurchaseSummary from "./PurchaseSummary";
import SalesSummary from "./SalesSummary";
import StatCard from "./StatCard";
import stats from "./stats";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          primaryIcon={<stat.icon className="text-blue-600 w-6 h-6" />}
          dateRange="Last Updated: 10/10/1995"
          details={stat.data}
        />
      ))}
      <PopularProducts />
      <SalesSummary />
      <ExpenseSummary />
      <PurchaseSummary />
    </div>
  );
};

export default Dashboard;
