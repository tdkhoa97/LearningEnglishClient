import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { AgeGroup } from "./AgeSelectorPage";
import {
    User,
    Sparkles,
    GraduationCap,
    Briefcase,
    ChevronRight,
    Bell,
    Globe,
    Moon,
    Volume2,
    Map
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsPageProps {
    ageGroup: AgeGroup;
    onChangeAgeGroup: () => void;
    useLeafletMap?: boolean;
    onToggleMapType?: (useLeaflet: boolean) => void;
}

const ageGroupLabels = {
    elementary: { label: "Tiểu Học", icon: Sparkles, desc: "6-11 tuổi", color: "pink" },
    middle: { label: "Trung Học", icon: GraduationCap, desc: "12-17 tuổi", color: "orange" },
    adult: { label: "Người Lớn", icon: Briefcase, desc: "18+ tuổi", color: "blue" }
};

export function SettingsPage({ ageGroup, onChangeAgeGroup, useLeafletMap, onToggleMapType }: SettingsPageProps) {
    const currentAgeGroup = ageGroupLabels[ageGroup];
    const Icon = currentAgeGroup.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <PageHeader
                title="Cài Đặt ⚙️"
                subtitle="Tùy chỉnh trải nghiệm học tập của bạn"
            />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Current Age Group */}
                <div className="mb-8">
                    <h3 className="text-gray-800 mb-4">Nhóm Học Hiện Tại</h3>
                    <Card className={`p-6 bg-gradient-to-br from-${currentAgeGroup.color}-50 to-${currentAgeGroup.color}-100 border-2 border-${currentAgeGroup.color}-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 bg-${currentAgeGroup.color}-500 rounded-2xl flex items-center justify-center`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h4 className={`text-${currentAgeGroup.color}-900 mb-1`}>
                                        {currentAgeGroup.label}
                                    </h4>
                                    <p className={`text-${currentAgeGroup.color}-700 text-sm`}>
                                        {currentAgeGroup.desc}
                                    </p>
                                    <Badge className={`mt-2 bg-${currentAgeGroup.color}-600 text-white`}>
                                        Đang hoạt động
                                    </Badge>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={onChangeAgeGroup}
                                className="border-2 border-gray-300 hover:bg-gray-50"
                            >
                                Đổi Nhóm <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Preferences */}
                <div className="space-y-6">
                    <h3 className="text-gray-800">Tùy Chọn</h3>

                    <Card className="p-6 bg-white border-2 border-gray-200">
                        <div className="space-y-6">
                            {/* Notifications */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900">Thông Báo</p>
                                        <p className="text-sm text-gray-600">Nhận nhắc nhở học tập hàng ngày</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>

                            {/* Sound Effects */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                                        <Volume2 className="w-5 h-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900">Âm Thanh</p>
                                        <p className="text-sm text-gray-600">Hiệu ứng âm thanh trong game</p>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            {/* Dark Mode */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                        <Moon className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900">Chế Độ Tối</p>
                                        <p className="text-sm text-gray-600">Bảo vệ mắt khi học ban đêm</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900">Ngôn Ngữ Giao Diện</p>
                                        <p className="text-sm text-gray-600">Tiếng Việt</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Đổi
                                </Button>
                            </div>

                            {/* Map Type */}
                            {onToggleMapType && (
                                <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Map className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900">Loại Bản Đồ</p>
                                            <p className="text-sm text-gray-600">Chuyển đổi giữa bản đồ thông thường và bản đồ lá cây</p>
                                        </div>
                                    </div>
                                    <Switch checked={useLeafletMap} onChange={() => onToggleMapType(!useLeafletMap)} />
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Account */}
                    <Card className="p-6 bg-white border-2 border-gray-200">
                        <h4 className="text-gray-800 mb-4">Tài Khoản</h4>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-between">
                                Đổi Mật Khẩu
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                                Quản Lý Dữ Liệu
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between text-red-600 border-red-300 hover:bg-red-50">
                                Đăng Xuất
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>

                    {/* About */}
                    <Card className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 text-center">
                        <div className="flex justify-center mb-3">
                            <div className="text-5xl">🐱</div>
                        </div>
                        <h4 className="text-orange-800 mb-2">FunLingo v1.0</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            Học tiếng Anh vui nhộn cùng Kitty the Cat!
                        </p>
                        <div className="flex gap-2 justify-center flex-wrap">
                            <Button variant="link" size="sm">Điều Khoản</Button>
                            <Button variant="link" size="sm">Bảo Mật</Button>
                            <Button variant="link" size="sm">Trợ Giúp</Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}