import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

// kiểu props: component con (trang cần bảo vệ)
interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 🔹 Giả sử bạn có logic kiểm tra đăng nhập ở đây:
  const isAuthenticated = localStorage.getItem("token") !== null
  // hoặc dùng context: const { user } = useAuthContext();

  if (!isAuthenticated) {
    // Chưa đăng nhập → chuyển về /login
    return <Navigate to="/login" replace />
  }

  // Đã đăng nhập → cho vào trang
  return <>{children}</>
}

export default ProtectedRoute;