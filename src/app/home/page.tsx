import { Activity, Bell, LogOut, MessageSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

const stats = [
  {
    title: "Active Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Messages",
    value: "456",
    change: "+5%",
    icon: MessageSquare,
  },
  {
    title: "Activity",
    value: "89%",
    change: "+2%",
    icon: Activity,
  },
  {
    title: "Notifications",
    value: "23",
    change: "-8%",
    icon: Bell,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}