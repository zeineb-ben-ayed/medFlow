"use client";
import {
  navItems,
  appointmentData,
  revenueData,
  metrics,
  charts,
  quickActions,
  departmentOverview,
  recentActivity,
} from "@/src/lib/constants";
import {
  Users,
  UserCircle,
  ClipboardList,
  DollarSign,
  UserPlus,
  FileText,
  Settings,
  Building2,
} from "lucide-react";
import QuickAction from "@/src/components/dashboard/admin/quickAction";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import MetricCard from "@/src/components/dashboard/admin/metricCard";
import ChartCard from "@/src/components/dashboard/admin/chartCard";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of clinic operations and management
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <ChartCard key={index} {...chart} />
          ))}
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </div>
          <Card className="lg:col-span-2 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((act: any, i: any) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{act.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Overview */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {departmentOverview.map((d) => (
                <div
                  key={d.dept}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <p className="font-medium text-sm">{d.dept}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <UserCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {d.doctors}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">
                        {d.patients}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
