import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Blogs from "./scenes/blogs";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AccountDetails from "./scenes/AccountInfo";
import AddBlog from "./scenes/blogs/addBlog";
import EditBlog from "./scenes/blogs/editBlog";
import Roles from "./scenes/roles";
import { SnackbarProvider } from "notistack";
import LoginPage from "./scenes/auth/LoginPage";
import AddUser from "./scenes/team/addUser";
import EditUser from "./scenes/team/editUser";
import AddBlogCategory from "./scenes/blogs/AddBlogCategory";
import BlogCateList from "./scenes/blogs/BlogCateList";
import TicketsList from "./scenes/tickets/TicketsList";
import CreateTicket from "./scenes/tickets/createTicket";
import ViewTicket from "./scenes/tickets/ViewTicket";
import EditFaq from "./scenes/faq/EditFaq";
import FAQList from "./scenes/faq/faqCategoryList";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/" ;

  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    window.onpopstate = () => {
      if (!isAuthenticated && window.location.pathname !== "/") {
        alert("You must be logged in to access this page");
        window.history.pushState(null, "", "/");

      }
    
    };
  }, [isAuthenticated]);

  return (
    <SnackbarProvider maxSnack={3}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {!isLoginPage  && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isLoginPage  && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/" replace />)}/>
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                {/* <Route path="/form" element={<Form />} /> */}
                <Route path="add-user" element={<AddUser />} />
                {/* <Route path="/bar" element={<Bar />} /> */}
                {/* <Route path="/pie" element={<Pie />} /> */}
                {/* <Route path="/line" element={<Line />} /> */}
                {/* FAQ Routes */}
                <Route path="/faqs/editfaq/:id" element={<EditFaq />} />
                <Route path="/faqs/faqlist" element={<FAQ />} />
                <Route path="/faqs/faqcategorieslist" element={<FAQList/>} />
                {/* <Route path="/calendar" element={<Calendar />} /> */}

                {/* Blogs Routes */}
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/addblogcategory" element={<AddBlogCategory />} />
                <Route path="/blogcategories" element={<BlogCateList/>}/>

                {/* Tickets Routes */}
                <Route path="/tickets/createticket" element={<CreateTicket />} />
                <Route path="/tickets/viewticket/:id" element={<ViewTicket />} />
                <Route path="/tickets/ticketslist" element={<TicketsList />} />
                {/* <Route path="/geography" element={<Geography />} /> */}
                <Route path="/account/:_id" element={<AccountDetails />} />
                <Route path="/editblog/:id" element={<EditBlog />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/user/update/:id" element={<EditUser />} />
                <Route path="*" element={<h1>404: Not Found</h1>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
