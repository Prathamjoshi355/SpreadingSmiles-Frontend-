import { Trash2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any) => string | ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => void;
}

export default function DataTable({ columns, data, onDelete }: DataTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
            {onDelete && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                  {column.render ? column.render(row[column.key]) : row[column.key]}
                </td>
              ))}
              {onDelete && (
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(row._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
