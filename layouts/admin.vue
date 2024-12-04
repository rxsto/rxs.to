<template>
  <div>
    <UiSidebarProvider>
      <UiSidebar>
        <UiSidebarHeader>
          <UiSidebarMenu>
            <UiSidebarMenuItem>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiSidebarMenuButton>
                    Select Workspace
                    <Icon name="lucide:chevron-down" class="ml-auto" />
                  </UiSidebarMenuButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent class="w-[--radix-popper-anchor-width]">
                  <UiDropdownMenuItem>
                    <span>Acme Inc</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem>
                    <span>Acme Corp.</span>
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarHeader>
        <UiSidebarContent>
          <UiSidebarGroup>
            <UiSidebarGroupLabel>Settings</UiSidebarGroupLabel>
            <UiSidebarGroupContent>
              <UiSidebarMenu>
                <UiSidebarMenuItem v-for="item in items" :key="item.title">
                  <UiSidebarMenuButton as-child>
                    <a :href="item.url">
                      <Icon :name="item.icon" />
                      <span>{{ item.title }}</span>
                    </a>
                  </UiSidebarMenuButton>
                </UiSidebarMenuItem>
              </UiSidebarMenu>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </UiSidebarContent>
      </UiSidebar>
      <UiSidebarInset>
        <UiNavbar sticky>
          <UiContainer class="flex h-12 items-center">
            <UiSidebarTrigger />
          </UiContainer>
        </UiNavbar>
        <div class="p-4">
          <slot />
        </div>
      </UiSidebarInset>
    </UiSidebarProvider>
    <UiVueSonner />
  </div>
</template>

<script lang="ts" setup>
const items = [
  { title: "General", url: "/admin", icon: "i-lucide-blocks" },
  { title: "Projects", url: "/admin/projects", icon: "i-lucide-folders" },
  { title: "Skills", url: "/admin/skills", icon: "i-lucide-badge-check" },
  { title: "Technologies", url: "/admin/technologies", icon: "i-lucide-monitor-smartphone" },
]
</script>
