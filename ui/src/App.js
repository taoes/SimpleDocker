import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import slice from './store/numberSlice'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import ImagePage from "./pages/ImagesPage";
import SummaryPage from "./pages/SummaryPage";
import LoginPage from "./pages/LoginPage";
import HostPage from "./pages/HostPage";
import NotFoundPage from "./pages/NotFoundPage";
import ConstainerPage from "./pages/ConstainerPage";
import VolumnPage from "./pages/VolumnPage";
import NetWorkPage from "./pages/NetWorkPage";


function App() {
  const { count, step, list, code, img } = useSelector(state => state.number);
  let { add, sub, load } = slice.actions


  return (
    <BrowserRouter>
      < Routes>
        <Route path="/" element={<Navigate replace to="/login" />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<AdminLayout />}>
          <Route path="/summary" element={<SummaryPage />}></Route>
          <Route path="/host" element={<HostPage />}></Route>
          <Route path="/images" element={<ImagePage />}></Route>
          <Route path="/container" element={<ConstainerPage />}></Route>
          <Route path="/network" element={<NetWorkPage />}></Route>
          <Route path="/volumn" element={<VolumnPage />}></Route>
          <Route path="/about" element={<span>关于系统</span>}></Route>
          <Route path="/safe" element={<span>安全设置</span>}></Route>
          <Route path="/feedback" element={<span>问题反馈</span>}></Route>
          <Route path="/log" element={<span>运行日志</span>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
