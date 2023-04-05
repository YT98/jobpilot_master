import Navbar from "./Navbar";
import { useRouter } from "next/router";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    const router = useRouter();
    const showNavbar = router.pathname !== '/signin' && router.pathname !== '/register';

    return (
      <div className="h-screen">
        {showNavbar && <Navbar />}
        <main className="h-full">
          {children}
        </main>
      </div>
    )
  }