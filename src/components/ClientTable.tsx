import { Edit2, Phone, MapPin, Calendar, DollarSign, Plus } from 'lucide-react';
import { Client } from '../lib/supabase';

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onAddPayment: (client: Client) => void;
}

const statusLabels = {
  pending: 'Pendiente',
  paid: 'Pagado',
  completed: 'Completado',
};

const statusColors = {
  pending: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 font-semibold',
  paid: 'bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 font-semibold',
  completed: 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 font-semibold',
};

export default function ClientTable({ clients, onEdit }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No hay clientes registrados
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Haz clic en "Nuevo Cliente" para agregar uno
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nombre
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Teléfono
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Destino
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Fecha
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Monto
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Comisión
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Pagado
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Estado
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                  {client.name}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {client.phone}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {client.destination}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {new Date(client.travel_date).toLocaleDateString('es-ES')}
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white font-medium">
                  ${client.free_amount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-green-600 dark:text-green-400 font-semibold">
                  ${client.my_commission.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  ${client.monto_pagado.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs ${
                      statusColors[client.status]
                    }`}
                  >
                    {statusLabels[client.status]}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onAddPayment(client)}
                      className="inline-flex items-center justify-center p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      title="Agregar abono"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(client)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Editar cliente"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
                  {client.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1.5 rounded-full text-xs mt-2 ${
                    statusColors[client.status]
                  }`}
                >
                  {statusLabels[client.status]}
                </span>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => onAddPayment(client)}
                  className="p-2.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  title="Agregar abono"
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={() => onEdit(client)}
                  className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  title="Editar cliente"
                >
                  <Edit2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Phone size={16} className="mr-3 flex-shrink-0" />
                {client.phone}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={16} className="mr-3 flex-shrink-0" />
                {client.destination}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Calendar size={16} className="mr-3 flex-shrink-0" />
                {new Date(client.travel_date).toLocaleDateString('es-ES')}
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Monto</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    ${client.free_amount.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mi Comisión</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">
                    ${client.my_commission.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pagado</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    ${client.monto_pagado.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
