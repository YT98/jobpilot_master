import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
    )
  }