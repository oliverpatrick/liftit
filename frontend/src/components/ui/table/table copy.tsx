import { ChangeEvent, FC, useState } from "react";

interface RowData {
  set: string;
  previous: string;
  kg: string;
  reps: string;
  completed: boolean;
}

export const Table: FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    { set: "", previous: "", kg: "", reps: "", completed: false },
  ]);

  const handleChange = (
    index: number,
    field: keyof RowData,
    value: string | boolean
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value as never;
    setRows(newRows);
  };

  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    const previous =
      lastRow.kg && lastRow.reps ? `${lastRow.kg}kg x ${lastRow.reps}` : "";
    setRows([
      ...rows,
      { set: "", previous, kg: "", reps: "", completed: false },
    ]);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Set</th>
            <th className="border p-2">Previous</th>
            <th className="border p-2">KG</th>
            <th className="border p-2">Reps</th>
            <th className="border p-2">Completed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={row.completed ? "bg-gray-200" : ""}>
              {(["set", "previous", "kg", "reps"] as (keyof RowData)[]).map(
                (field) => (
                  <td key={field} className="border p-2">
                    <input
                      type="text"
                      value={row[field] as string}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(index, field, e.target.value)
                      }
                      disabled={row.completed}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                )
              )}
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={row.completed}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, "completed", e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="border-t border-gray-400 text-center py-2 cursor-pointer hover:bg-gray-100"
        onClick={addRow}
      >
        + Add Row
      </div>
    </div>
  );
};
