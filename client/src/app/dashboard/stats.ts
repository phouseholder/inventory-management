import { TrendingDown, TrendingUp, Package, CheckCircle, Tag } from "lucide-react";

const stats = [
    {title: "Customer & Expenses", data: [
        {
          title: "Customer Growth",
          amount: "175.00",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Expenses",
          amount: "10.00",
          changePercentage: -56,
          IconComponent: TrendingDown,
        },
      ], icon: Package},
    {title: "Sales & Discount", data: [
        {
          title: "Sales",
          amount: "1000.00",
          changePercentage: 20,
          IconComponent: TrendingUp,
        },
        {
          title: "Discount",
          amount: "200.00",
          changePercentage: -10,
          IconComponent: TrendingDown,
        },
      ], icon: Tag},
    {title: "Dues & Pending Orders", data: [
        {
          title: "Dues",
          amount: "250.00",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Pending Orders",
          amount: "147",
          changePercentage: -56,
          IconComponent: TrendingDown,
        },
      ], icon: CheckCircle}
  ]

  export default stats;