import { Users, UserCog, Activity, Package, BarChart3, PieChart, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Eye, Calendar } from "lucide-react";
import { useProductsQuery } from "@/hooks/products/useProductsQuery.hook";
import { useLocalUsers } from "@/store/useLocalUsers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, LineChart, Line, AreaChart, Area } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { usersAPI } from "@/apis/users/users.api";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data } = useProductsQuery(1, 10);
  const { users: localUsers } = useLocalUsers();
  const { data: apiUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getAll()
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const productsCount = data?.total || 0;
  const apiUsersCount = apiUsers?.data?.length || 0;
  const localUsersCount = localUsers.length;
  const totalUsersCount = apiUsersCount + localUsersCount;
  const totalItems = productsCount + totalUsersCount;
  
  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400, orders: 240 },
    { month: 'Feb', sales: 3000, revenue: 1398, orders: 221 },
    { month: 'Mar', sales: 2000, revenue: 9800, orders: 229 },
    { month: 'Apr', sales: 2780, revenue: 3908, orders: 200 },
    { month: 'May', sales: 1890, revenue: 4800, orders: 218 },
    { month: 'Jun', sales: 2390, revenue: 3800, orders: 250 }
  ];
  
  const recentActivity = [
    { action: 'New user registered', user: 'John Doe', time: '2 min ago', type: 'user' },
    { action: 'Product updated', user: 'Admin', time: '5 min ago', type: 'product' },
    { action: 'Order completed', user: 'Jane Smith', time: '10 min ago', type: 'order' },
    { action: 'New product added', user: 'Admin', time: '15 min ago', type: 'product' }
  ];
  
  const topProducts = [
    { name: 'iPhone 15', sales: 145, revenue: '$145,000' },
    { name: 'MacBook Pro', sales: 89, revenue: '$178,000' },
    { name: 'AirPods', sales: 234, revenue: '$46,800' },
    { name: 'iPad Air', sales: 67, revenue: '$40,200' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          {currentTime.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">$24,500</p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5%
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
              <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">{productsCount}</p>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.2%
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">1,358</p>
              <div className="flex items-center mt-2 text-sm text-orange-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -2.1%
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">{totalUsersCount}</p>
              <p className="text-xs mt-2 text-gray-500">API: {apiUsersCount} | Local: {localUsersCount}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales & Revenue Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Products</h3>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} sales</p>
                </div>
                <p className="font-semibold text-green-600">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900' :
                  activity.type === 'product' ? 'bg-green-100 dark:bg-green-900' :
                  'bg-orange-100 dark:bg-orange-900'
                }`}>
                  {activity.type === 'user' ? <Users className="h-4 w-4 text-blue-600" /> :
                   activity.type === 'product' ? <Package className="h-4 w-4 text-green-600" /> :
                   <ShoppingCart className="h-4 w-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Analytics Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={[
                  { name: 'API Users', value: apiUsersCount },
                  { name: 'Local Users', value: localUsersCount }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                <Cell fill="#10b981" />
                <Cell fill="#3b82f6" />
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
