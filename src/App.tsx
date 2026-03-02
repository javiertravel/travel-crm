import { useState, useEffect } from 'react';
import { supabase, Client } from './lib/supabase';
import { useTheme } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import ClientForm from './components/ClientForm';
import ClientTable from './components/ClientTable';
import PaymentDialog from './components/PaymentDialog';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentClient, setPaymentClient] = useState<Client | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'trips' | 'payments' | 'settings'>('dashboard');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clientela')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (clientData: Partial<Client>) => {
    try {
      if (editingClient) {
        const { error } = await supabase
          .from('clientela')
          .update({ ...clientData, updated_at: new Date().toISOString() })
          .eq('id', editingClient.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('clientela').insert([clientData]);

        if (error) throw error;
      }

      await loadClients();
      setShowForm(false);
      setEditingClient(null);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingClient(null);
  };

  const handleAddPayment = (client: Client) => {
    setPaymentClient(client);
  };

  const handlePaymentSubmit = async (amount: number) => {
    if (!paymentClient) return;

    setPaymentLoading(true);
    try {
      const newMontoPagado = paymentClient.monto_pagado + amount;
      let newStatus = paymentClient.status;

      if (newMontoPagado >= paymentClient.free_amount && paymentClient.status !== 'completed') {
        newStatus = 'paid';
      }

      const { error } = await supabase
        .from('clientela')
        .update({
          monto_pagado: newMontoPagado,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', paymentClient.id);

      if (error) throw error;

      await loadClients();
      setPaymentClient(null);
    } catch (error) {
      console.error('Error adding payment:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header theme={theme} onThemeToggle={toggleTheme} onAddClient={() => setShowForm(true)} />

        <main className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            {activeTab === 'dashboard' && (
              <DashboardContent clients={clients} loading={loading} />
            )}

            {activeTab === 'clients' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-white font-bold text-lg mb-6">Clients Management</h3>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <p className="text-gray-400">Loading...</p>
                  </div>
                ) : clients.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-gray-400 mb-6">No clients yet</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Add First Client
                    </button>
                  </div>
                ) : (
                  <ClientTable
                    clients={clients}
                    onEdit={handleEdit}
                    onAddPayment={handleAddPayment}
                  />
                )}
              </div>
            )}

            {activeTab === 'trips' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-white font-bold text-lg">Trips Management</h3>
                <p className="text-gray-400 mt-4">Trips feature coming soon</p>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-white font-bold text-lg">Payments</h3>
                <p className="text-gray-400 mt-4">Payment management coming soon</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-white font-bold text-lg">Settings</h3>
                <p className="text-gray-400 mt-4">Settings coming soon</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {showForm && (
        <ClientForm client={editingClient} onSave={handleSave} onClose={handleCloseForm} />
      )}

      {paymentClient && (
        <PaymentDialog
          clientName={paymentClient.name}
          currentMontoPagado={paymentClient.monto_pagado}
          onConfirm={handlePaymentSubmit}
          onClose={() => setPaymentClient(null)}
          isLoading={paymentLoading}
        />
      )}
    </div>
  );
}

export default App;
