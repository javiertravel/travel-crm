import { TrendingUp, Users, Plane, DollarSign } from 'lucide-react';

interface DashboardContentProps {
  clients: any[];
  loading: boolean;
}

export default function DashboardContent({ clients, loading }: DashboardContentProps) {
  const totalClients = clients.length;
  const pendingCount = clients.filter((c) => c.status === 'pending').length;
  const paidCount = clients.filter((c) => c.status === 'paid').length;
  const totalCommission = clients.reduce((sum, c) => sum + (c.my_commission || 0), 0);

  const stats = [
    {
      label: 'Total Clients',
      value: totalClients,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Pending Payments',
      value: pendingCount,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Paid',
      value: paidCount,
      icon: DollarSign,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Total Commission',
      value: `$${totalCommission.toFixed(0)}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-2">Updated in real time</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {clients.slice(0, 5).map((client, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{client.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{client.name}</p>
                    <p className="text-gray-400 text-sm">{client.phone}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    client.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : client.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300 text-sm">Conversion Rate</span>
              <span className="text-white font-bold">{totalClients > 0 ? ((paidCount / totalClients) * 100).toFixed(0) : 0}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300 text-sm">Avg Commission</span>
              <span className="text-white font-bold">${totalClients > 0 ? (totalCommission / totalClients).toFixed(0) : 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300 text-sm">Active Trips</span>
              <span className="text-white font-bold">{totalClients}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
