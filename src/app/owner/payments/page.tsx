'use client'

import React, { useState } from 'react'
import { OwnerPortalLayout } from '@/components/owner-portal-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Download, FileText } from 'lucide-react'

export default function OwnerPaymentsPage() {
  const [filterStatus, setFilterStatus] = useState('ALL')

  // Mock data
  const payments = [
    {
      id: 1,
      date: '2026-06-05',
      property: '2-Bedroom Apartment in Kahawa Sukari',
      tenant: 'John Doe',
      amount: 35000,
      status: 'CLEARED',
      reference: 'PAY-001',
    },
    {
      id: 2,
      date: '2026-06-03',
      property: 'Modern Studio in Westlands',
      tenant: 'Jane Smith',
      amount: 38000,
      status: 'CLEARED',
      reference: 'PAY-002',
    },
    {
      id: 3,
      date: '2026-05-28',
      property: '2-Bedroom Apartment in Kahawa Sukari',
      tenant: 'John Doe',
      amount: 35000,
      status: 'CLEARED',
      reference: 'PAY-003',
    },
    {
      id: 4,
      date: '2026-05-25',
      property: 'Modern Studio in Westlands',
      tenant: 'Jane Smith',
      amount: 38000,
      status: 'CLEARED',
      reference: 'PAY-004',
    },
    {
      id: 5,
      date: '2026-05-20',
      property: '3-Bedroom Townhouse in Kilimani',
      tenant: 'Sarah Johnson',
      amount: 65000,
      status: 'PENDING',
      reference: 'PAY-005',
    },
  ]

  const filteredPayments = payments.filter(
    (p) => filterStatus === 'ALL' || p.status === filterStatus
  )

  const totalCleared = payments
    .filter((p) => p.status === 'CLEARED')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <OwnerPortalLayout title="Payment History" subtitle="Track all rental income payments">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Received</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(totalCleared)}</p>
          <p className="text-xs text-muted-foreground mt-2">Across all payments</p>
        </div>

        <div className="glass rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Cleared This Month</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(73000)}</p>
          <p className="text-xs text-muted-foreground mt-2">2 properties</p>
        </div>

        <div className="glass rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-yellow-600">{formatCurrency(65000)}</p>
          <p className="text-xs text-muted-foreground mt-2">1 property awaiting</p>
        </div>
      </div>

      {/* Filters & Export */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['ALL', 'CLEARED', 'PENDING'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <Button variant="secondary" className="gap-2 sm:ml-auto">
          <Download size={16} />
          <span className="hidden sm:inline">Download Statement</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Payments Table */}
      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Property</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Tenant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {payment.property}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {payment.tenant}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge
                        className={
                          payment.status === 'CLEARED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText size={16} />
                        <span className="hidden sm:inline">Receipt</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline" size="sm">Previous</Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </OwnerPortalLayout>
  )
}
