import type { PropsWithChildren, ReactNode } from 'react'

interface DataTableProps extends PropsWithChildren {
  columns: ReactNode[]
  className?: string
}

export const DataTable = ({ columns, className = '', children }: DataTableProps) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="data-table min-w-full">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)
