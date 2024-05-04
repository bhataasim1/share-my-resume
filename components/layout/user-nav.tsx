import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  USER_DASHBOARD,
  USER_EDUCATION,
  USER_EXPERIENCE,
  USER_RESUME,
} from "@/constant";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRoute = (url: string) => {
    router.push(url);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || "Share My Resume profile"}
            />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleRoute(USER_DASHBOARD)}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoute(USER_EDUCATION)}>
            Education
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoute(USER_EXPERIENCE)}>
            Experience
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoute(USER_RESUME)}>
            Resume
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
