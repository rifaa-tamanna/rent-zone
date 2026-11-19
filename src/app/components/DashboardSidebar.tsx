import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const menuItemsByRole = {
    customer: [

    ],
    admin: [

    ],
    owner: [

    ]
}

export function DashboardSidebar() {
    const {data: session, isPending} = useSession()
    const role = session?.user?.role || "customer"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {menuItemsByRole[role].map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton render={<a href={item.url} />}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
