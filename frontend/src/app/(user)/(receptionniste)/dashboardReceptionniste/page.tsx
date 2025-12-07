// app/receptionist/page.tsx
"use client";

import {
  Calendar,
  Users,
  DollarSign,
  UserPlus,
  CheckCircle2,
  Receipt,
  Clock,
  Phone,
  FileText,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import MetricCard from "@/src/components/dashboard/admin/metricCard";
import QuickAction from "@/src/components/dashboard/admin/quickAction";
import {
  metricCards,
  pendingPayments,
  quickActionsR,
  todayAppointments,
} from "@/src/lib/constants";

export default function ReceptionistDashboard() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "checked-in": "bg-success/20 text-success border-success/30",
      "in-progress": "bg-primary/20 text-primary border-primary/30",
      waiting: "bg-warning/20 text-warning border-warning/30",
      confirmed: "bg-info/20 text-info border-info/30",
      pending: "bg-muted text-muted-foreground border-border",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Receptionist Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage appointments and patient check-ins
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Thursday, December 7, 2024</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <MetricCard
            key={i}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            variant={card.variant}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActionsR.map((action, i) => (
          <QuickAction
            key={i}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}
      </div>

      {/* Appointments Table */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Today's Appointments</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">Doctor</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {appointment.time}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {appointment.patient}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            {appointment.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {appointment.doctor}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="font-normal">
                        {appointment.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadge(appointment.status)}
                      >
                        {appointment.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3"
                        >
                          Check In
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-warning/5 border border-warning/20"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-warning/20 text-warning text-sm">
                        {payment.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{payment.patient}</p>
                      <p className="text-xs text-muted-foreground">
                        {payment.invoice} • {payment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-warning">
                      {payment.amount}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-primary"
                    >
                      Send Reminder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-info" />
              Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      Unconfirmed Appointments
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 appointments for tomorrow need confirmation
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Waiting Room Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Michael Brown has been waiting for 25 minutes
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-info/10 border border-info/20">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      New Patient Registrations
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 new patient forms need to be processed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
