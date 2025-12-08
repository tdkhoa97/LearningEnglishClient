import { SidebarTrigger } from "@/components/Layout/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    rightContent?: React.ReactNode;
}

export function PageHeader({ title, subtitle, rightContent }: PageHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b-2 border-orange-200 mb-6">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle Button */}
                    <SidebarTrigger className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-md w-10 h-10 inline-flex items-center justify-center">
                        <Menu className="w-5 h-5" />
                    </SidebarTrigger>

                    {/* Title */}
                    {title && (
                        <div>
                            <h1 className="text-orange-600">{title}</h1>
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