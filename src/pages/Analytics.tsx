import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Heart,
} from "lucide-react";

interface SalesData {
  date: string;
  sales: number;
  revenue: number;
  orders: number;
}

interface ProductPerformance {
  name: string;
  sales: number;
  revenue: number;
  rating: number;
}

interface UserMetrics {
  date: string;
  newUsers: number;
  activeUsers: number;
  returning: number;
}

interface DesignTrend {
  color: string;
  popularity: number;
  usage: number;
}

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");

  const salesData: SalesData[] = [
    { date: "Jan 01", sales: 2400, revenue: 24000, orders: 24 },
    { date: "Jan 05", sales: 1398, revenue: 22100, orders: 18 },
    { date: "Jan 10", sales: 9800, revenue: 29500, orders: 42 },
    { date: "Jan 15", sales: 3908, revenue: 39080, orders: 35 },
    { date: "Jan 20", sales: 4800, revenue: 38000, orders: 38 },
    { date: "Jan 25", sales: 5390, revenue: 43120, orders: 45 },
    { date: "Jan 28", sales: 4300, revenue: 34400, orders: 40 },
  ];

  const userMetricsData: UserMetrics[] = [
    { date: "Jan 01", newUsers: 240, activeUsers: 2400, returning: 1800 },
    { date: "Jan 05", newUsers: 139, activeUsers: 2210, returning: 1900 },
    { date: "Jan 10", newUsers: 200, activeUsers: 2290, returning: 2000 },
    { date: "Jan 15", newUsers: 220, activeUsers: 2000, returning: 2181 },
    { date: "Jan 20", newUsers: 250, activeUsers: 2181, returning: 2500 },
    { date: "Jan 25", newUsers: 290, activeUsers: 2500, returning: 2100 },
    { date: "Jan 28", newUsers: 190, activeUsers: 2100, returning: 2200 },
  ];

  const productPerformance: ProductPerformance[] = [
    { name: "Classic T-Shirt", sales: 245, revenue: 6347, rating: 4.5 },
    { name: "Premium Polo", sales: 198, revenue: 9102, rating: 4.8 },
    { name: "Designer Edition", sales: 134, revenue: 8040, rating: 4.6 },
    { name: "Limited Edition", sales: 89, revenue: 5340, rating: 4.9 },
    { name: "Casual Hoodie", sales: 156, revenue: 4992, rating: 4.3 },
  ];

  const designTrends: DesignTrend[] = [
    { color: "#FF6B6B", popularity: 28, usage: 156 },
    { color: "#4ECDC4", popularity: 22, usage: 134 },
    { color: "#45B7D1", popularity: 18, usage: 98 },
    { color: "#FFA07A", popularity: 15, usage: 87 },
    { color: "#98D8C8", popularity: 17, usage: 92 },
  ];

  const trafficSources = [
    { name: "Direct", value: 35, color: "#8b5cf6" },
    { name: "Search", value: 28, color: "#ec4899" },
    { name: "Social Media", value: 22, color: "#f59e0b" },
    { name: "Referral", value: 15, color: "#10b981" },
  ];

  const conversionFunnel = [
    { stage: "Visitors", count: 5432, conversion: "100%" },
    { stage: "Product Viewers", count: 3210, conversion: "59%" },
    { stage: "Cart Added", count: 1567, conversion: "49%" },
    { stage: "Checkout", count: 892, conversion: "57%" },
    { stage: "Completed Orders", count: 342, conversion: "38%" },
  ];

  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const totalVisitors = trafficSources.reduce((sum, s) => sum + (s.value * 100), 0);
  const conversionRate = (
    (342 / 5432) *
    100
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your sales, users, and design trends</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex gap-2">
          {(["week", "month", "quarter", "year"] as const).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? "default" : "outline"}
              onClick={() => setDateRange(range)}
              className={
                dateRange === range
                  ? "bg-purple-600 hover:bg-purple-700"
                  : ""
              }
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(totalVisitors / 1000).toFixed(1)}K
              </div>
              <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-green-600 mt-1">↑ 2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="designs">Designs</TabsTrigger>
          </TabsList>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales & Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#8b5cf6" />
                      <Bar dataKey="orders" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.stage}</span>
                        <span className="text-sm text-gray-600">
                          {item.count} visitors • {item.conversion}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                          style={{
                            width: `${((5432 - idx * 1000) / 5432) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newUsers"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#ec4899"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="returning"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">New Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,234</div>
                  <p className="text-xs text-gray-600 mt-2">
                    This period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8,567</div>
                  <p className="text-xs text-gray-600 mt-2">
                    Currently active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Returning Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">62%</div>
                  <p className="text-xs text-gray-600 mt-2">
                    Of users return
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productPerformance.map((product) => (
                        <TableRow key={product.name}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            ${product.revenue.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              {product.rating} ⭐
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Sales Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={productPerformance}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Designs Tab */}
          <TabsContent value="designs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Design Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {designTrends.map((trend, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-gray-200"
                        style={{ backgroundColor: trend.color }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">
                            Popularity: {trend.popularity}%
                          </span>
                          <span className="text-sm text-gray-600">
                            Used {trend.usage} times
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                            style={{ width: `${trend.popularity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Customization Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">
                        Customizations
                      </span>
                    </div>
                    <div className="text-3xl font-bold">2,345</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-pink-600" />
                      <span className="text-sm font-medium">Favorites</span>
                    </div>
                    <div className="text-3xl font-bold">1,234</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium">Orders</span>
                    </div>
                    <div className="text-3xl font-bold">342</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
