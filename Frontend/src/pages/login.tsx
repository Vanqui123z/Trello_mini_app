import React, { useState } from "react";
import { useNavigate} from "react-router-dom"
import authService from "../services/authService"

const Login:React.FC =()=>{

    const [email,setEmail]= useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendEmail = async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
    try {
        await authService.sendEmail(email);
        localStorage.setItem("email", email)
         alert("Mã xác thực đã được gửi. Vui lòng kiểm tra email!");
         navigate("/auth/signin");
    } catch (error) {
         alert(error.message);
    } finally {
        setLoading(false);
    }  
    }  

   return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Đăng nhập bằng Email</h3>
        <form onSubmit={handleSendEmail}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi mã xác thực"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

