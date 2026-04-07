import { useState, useEffect } from "react";
import "./index.css";

import { INITIAL_TEACHERS, INITIAL_STUDENTS, INITIAL_ADMINS, INITIAL_ATTENDANCE } from "./constants";

// Shared components
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";

// Direktor pages
import Payment from "./components/direktor/Payment";
import AdminControl from "./components/direktor/AdminControl";

// Admin pages
import AdminDash from "./components/admin/AdminDash";
import AttPage from "./components/admin/AttPage";
import RepPage from "./components/admin/RepPage";
import TeachersPage from "./components/admin/TeachersPage";
import StudentsPage from "./components/admin/StudentsPage";

// Teacher pages
import TDash from "./components/teacher/TDash";
import MarkAtt from "./components/teacher/MarkAtt";
import MyClass from "./components/teacher/MyClass";

// Student pages
import SDash from "./components/student/SDash";
import SMyAtt from "./components/student/SMyAtt";
import PreLoader from "./components/PreLoader.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [complating, setComplating] = useState(false)
  const [admins, setAdmins] = useState(INITIAL_ADMINS)
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [page, setPage] = useState("dash");
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [att, setAtt] = useState(INITIAL_ATTENDANCE);
  const [complains, setComplains] = useState([]);
  const [toast, setToast] = useState({});


  // ── Theme ──
  const [theme, setTheme] = useState(
    () => localStorage.getItem("edutrack-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("edutrack-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => t === "dark" ? "light" : "dark")
  }

  function showToast(msg, type = "ok") { setToast({ msg, type }); }
  function login(u) {
    setUser(u);
    setPage("dash");
    showToast("Muvofaqiyatli kirildi");
  }
  function logout() { setUser(null); setPage("dash"); }

  if (!user) {
    return <Login onLogin={login} admins={admins} teachers={teachers} students={students} setComplating={setComplating}/>;
  }

  const props = { att, setAtt, complains, setComplains, admins, setAdmins, teachers, setTeachers, students, setStudents, toast: showToast, user };
  function renderPage() {
    if (user.role === 'direktor') {
      if (page === 'dash') return  <AdminControl {...props}/>
      if (page === 'payment') return <Payment {...props}/>
      return <AdminControl {...props}/>
    }
    if (user.role === "admin") {
      if (page === "dash") return <AdminDash {...props} />;
      if (page === "att") return <AttPage {...props} />;
      if (page === "rep") return <RepPage {...props} />;
      if (page === "students") return <StudentsPage {...props} />;
      if (page === "teachers") return <TeachersPage {...props} />;
      return <AdminDash {...props} />;
    }
    if (user.role === "teacher") {
      if (page === "dash") return <TDash {...props} />;
      if (page === "mark") return <MarkAtt {...props} />;
      if (page === "myclass") return <MyClass {...props} />;
      return <TDash {...props} />;
    }
    if (user.role === "student") {
      if (page === "dash") return <SDash {...props} />;
      if (page === "myatt") return <SMyAtt {...props} />;
      return <SDash {...props}/>
    }
  }

  return (
      <>
        {complating ?
        (<div className="shell">
          <Sidebar
              user={user}
              page={page}
              setPage={setPage}
              onLogout={logout}
              theme={theme}
              onToggleTheme={toggleTheme}
              admins={admins}
              teachers={teachers}
              students={students}
              setComplains={setComplains}
              complains={complains}
              toast={showToast}
          />
          <main className="main">{renderPage()}</main>
          {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)}/>}
        </div>) : <PreLoader setComplating={setComplating} complating={complating} />}
      </>
  );
}
