import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import AppProvider from "@/providers/AppProvider";
import { House } from "lucide-react";

const navLinks = [
    {
        title: "Home",
        href: "/",
        icon: <House />
    },
    {
        title: "Courses",
        href: "/#courses",
    },
    // {
    //     title: "About Us",
    //     href: "/#about_us",
    // },
    // {
    //     title: "Our Services",
    //     href: "/#services",
    // },
];

const MainLayout = ({ children }) => {

    return (
        <div className="flex min-h-screen flex-col">
            <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b ">
                <AppProvider>
                    <div className="container flex h-20 items-center justify-between py-6">
                        <MainNav navLinks={navLinks} />
                    </div>
                </AppProvider>
            </header>
            <main className="flex-1 pt-20 flex flex-col">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
};

export default MainLayout;
