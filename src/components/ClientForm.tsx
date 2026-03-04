import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Client } from '../lib/supabase';

interface ClientFormProps {
  client?: Client | null;
  onSave: (clientData: Partial<Client>) => void;
  onClose: () => void;
}

export default function ClientForm({ client, onSave, onClose }: ClientFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    destino: '',
    fecha_de_viaje: '',
    notas: '',
    precio_cotizado: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        nombre: client.nombre || '',
        telefono: client.telefono || '',
        destino: client.destino || '',
        fecha_de_viaje: client.fecha_de_viaje || '',
        notas: client.notas || '',
        precio_cotizado: client.precio_cotizado?.toString() || '',
      });
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: Partial<Client> = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      destino: formData.destino,
      fecha_de_viaje: formData.fecha_de_viaje,
      notas: formData.notas,
      precio_cotizado: formData.precio_cotizado ? parseFloat(formData.precio_cotizado) : undefined,
      estado: 'pendiente',
    };
    onSave(submitData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {client ? 'Edit Client' : 'Add Client'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              required
              placeholder="Enter client name"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              required
              placeholder="Enter phone number"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destino
            </label>
            <input
              type="text"
              required
              placeholder="Enter destination"
              value={formData.destino}
              onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fecha de Viaje
            </label>
            <input
              type="date"
              required
              value={formData.fecha_de_viaje}
              onChange={(e) => setFormData({ ...formData, fecha_de_viaje: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Precio Cotizado
            </label>
            <input
              type="number"
              placeholder="Enter quoted price"
              step="0.01"
              value={formData.precio_cotizado}
              onChange={(e) => setFormData({ ...formData, precio_cotizado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notas
            </label>
            <textarea
              placeholder="Add any notes"
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            />
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
              <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-600 dark:text-green-400">Client saved successfully</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
