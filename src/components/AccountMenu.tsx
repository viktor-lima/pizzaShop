
import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/getProfile";
import { getManagedRestaurant } from "@/api/getManagedRestaurant";
import { Skeleton } from "./ui/skeleton";



export function AccountMenu() {

  const { data: profile, isLoading: isLoacdingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  console.log(profile);

   const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })
  console.log(managedRestaurant);

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 select-none">
            {
              isLoadingManagedRestaurant ? <Skeleton className="h-4 w-40" /> : managedRestaurant?.name
            }
            <ChevronDown className="w-4 h-4"/>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
            {isLoacdingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Building className="w-4 h-4 mr-2"/>
            <span>Perfil da Loja</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="w-4 h-4 mr-2"/>
            <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}