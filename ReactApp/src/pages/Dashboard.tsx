import { Users, UserCog, Activity, Package, BarChart3, PieChart } from "lucide-react";
import { useProductsQuery } from "@/hooks/products/useProductsQuery.hook";
import { useLocalUsers } from "@/store/useLocalUsers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { usersAPI } from "@/apis/users/users.api";

export default function Dashboard() {
  const { data } = useProductsQuery(1, 10);
  const { users: localUsers } = useLocalUsers();
  const { data: apiUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getAll()
  });

  const productsCount = data?.total || 0;
  const apiUsersCount = apiUsers?.data?.length || 0;
  const localUsersCount = localUsers.length;
  const totalUsersCount = apiUsersCount + localUsersCount;
  const totalItems = productsCount + totalUsersCount;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-3xl font-bold mt-2">{totalItems}</p>
              <p className="text-sm mt-2 text-green-600">+12% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-3xl font-bold mt-2">{productsCount}</p>
              <p className="text-sm mt-2 text-green-600">+8% from last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold mt-2">{totalUsersCount}</p>
              <p className="text-sm mt-2 text-blue-600">API: {apiUsersCount} | Local: {localUsersCount}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserCog className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Analytics Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Product Analytics</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Electronics', count: 25 },
              { name: 'Books', count: 18 },
              { name: 'Clothing', count: 32 },
              { name: 'Home', count: 15 },
              { name: 'Sports', count: 10 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Analytics Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">User Analytics</h3>
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
