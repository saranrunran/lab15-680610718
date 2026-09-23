import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

import { currentUser } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  // { title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  // { title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ✅ แก้ไข: Base UI ใช้ `render={<Link />}` แทน `asChild` */}
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.nickname}/>
            <AvatarFallback>{currentUser.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-medium">{currentUser.nickname}</p>
            <Badge variant="outline">{currentUser.role}</Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
