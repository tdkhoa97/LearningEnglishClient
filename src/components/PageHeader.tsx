import { SidebarTrigger } from "@/components/Layout/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    rightContent?: React.ReactNode;
}

export function PageHeader({ title, subtitle, rightContent }: PageHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 mb-6 shadow-sm">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle Button */}
                    <SidebarTrigger className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg w-10 h-10 inline-flex items-center justify-center transition-colors">
                        <Menu className="w-5 h-5" />
                    </SidebarTrigger>

                    {/* Title */}
                    {title && (
                        <div>
                            <h1 className="text-gray-800">{title}</h1>
                            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
                        </div>
                    )}
                </div>

                {/* Right content (optional) */}
                {rightContent && <div>{rightContent}</div>}
            </div>
        </div>
    );
}