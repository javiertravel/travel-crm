import { useState, useEffect } from 'react';
import { Plus, Sun, Moon, Plane } from 'lucide-react';
import { supabase, Client } from './lib/supabase';
import { useTheme } from './contexts/ThemeContext';
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
      console.error('Error al cargar clientes:', error);
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
      console.error('Error al guardar cliente:', error);
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
      console.error('Error al agregar abono:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const totalCommission = clients.reduce((sum, client) => sum + client.my_commission, 0);
  const pendingCount = clients.filter((c) => c.status === 'pending').length;
  const paidCount = clients.filter((c) => c.status === 'paid').length;
  const completedCount = clients.filter((c) => c.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  NEXUS
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gestión de clientes y comisiones
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Cambiar tema"
              >
                {theme === 'light' ? (
                  <Moon className="text-gray-700 dark:text-gray-300" size={20} />
                ) : (
                  <Sun className="text-gray-300" size={20} />
                )}
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Nuevo Cliente</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Clientes</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{clients.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingCount}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pagados</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{paidCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Comisión Total</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${totalCommission.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Lista de Clientes
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
              </div>
            ) : (
              <ClientTable
                clients={clients}
                onEdit={handleEdit}
                onAddPayment={handleAddPayment}
              />
            )}
          </div>
        </div>
      </main>

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
