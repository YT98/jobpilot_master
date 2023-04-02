import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
      <div className="h-screen">
        <Navbar />
        <main className="h-full">
          {children}
        </main>
      </div>
    )
  }