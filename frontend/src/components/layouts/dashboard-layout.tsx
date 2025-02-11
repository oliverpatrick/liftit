import { User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';
import { cn } from '@/utils/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown';
// import { Navigation } from '../ui/navigation';

// type SideNavigationItem = {
//   name: string;
//   to: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// };

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-red-500 px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Progress />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
                noMargin
              >
                <span className="sr-only">Open user menu</span>
                {user.data?.avatar ? (
                  <img
                    src={user.data.avatar}
                    alt="profile"
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <User2 className="size-6 rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(paths.app.profile.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => logout.mutate({})}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="box-content grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
