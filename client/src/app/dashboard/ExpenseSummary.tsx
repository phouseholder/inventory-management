import { Panel } from "@/app/(components)";
import { ExpenseCategory } from "@/models";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const ExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseCategorySummary = dashboardMetrics?.expenseCategory || [];

  const expenseSums = expenseCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseCategory) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({ name, value })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );

  return (
    <Panel
      title="Expense Summary"
      classes="row-span-3 flex flex-col justify-between"
      isLoading={isLoading}
    >
      <div className="xl:flex justify-between pr-7">
        <div className="relative basis-3/5">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={expenseCategories}
                innerRadius={50}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
            <span className="font-bold text-xl">
              ${totalExpenses.toFixed(2)}
            </span>
          </div>
        </div>
        <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
          {expenseCategories.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center text-xs">
              <span
                className="mr-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <hr />
        {expenseSummary && (
          <div className="mt-3 flex justify-between items-center px-7 mb-4">
            <div className="pt-2">
              <p className="text-sm">
                Average:{" "}
                <span className="font-semibold">
                  ${expenseSummary.totalExpenses.toFixed(2)}
                </span>
              </p>
            </div>
            <span className="flex items-center mt-2">
              <TrendingUp className="mr-2 text-green-500" />
              30%
            </span>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default ExpenseSummary;
