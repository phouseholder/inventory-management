import { useGetDashboardMetricsQuery } from "@/state/api";
import { Rating, Panel } from "../(components)";
import { ShoppingBag } from "lucide-react";

const PopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <Panel
      title="Popular Products"
      isLoading={isLoading}
      classes="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16"
    >
      <div className="h-full flex flex-col justify-between overflow-auto">
        {dashboardMetrics?.popularProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between gap-3 px-5 py-7 border-b"
          >
            <div className="flex items-center gap-3">
              <div>img</div>
              <div className="flex flex-col justify-between gap-1">
                <div className="font-bold text-gray-700">{product.name}</div>
                <div className="flex text-sm items-center">
                  <span className="font-bold text-blue-500 text-xs">
                    ${product.price}
                  </span>
                  <span className="mx-2">|</span>
                  <Rating rating={product.rating || 0} />
                </div>
              </div>
            </div>
            <div className="text-xs flex items-center">
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                <ShoppingBag className="w-4 h-4" />
              </button>
              {Math.round(product.stockQuantity / 1000)}k Sold
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default PopularProducts;
