import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import PagesOutlinedIcon from "@mui/icons-material/PagesOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (width < 600) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, [width]);

  return (
    <Box
    
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          // backgroundColor: "#23629e"  ,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          // backgroundColor: "#d5edfc !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          // backgroundColor: "#d5edfc !important",
        },
        
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Accounts Cart
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[700]}
              sx={{ m: "15px 0 5px 30px",fontWeight: "bold" }}
              {...(isCollapsed && { display: "none" })}
            >
              User
            </Typography>

            <Item
              title="Account Information"
              to="/account"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title="Users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{
                color: colors.grey[100],
              }}
            ><Box
            
            sx={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "10px 0 10px 0",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              
             
              
            }}>
              <Item
                title="Add User"
                to="/add-user"
                selected={selected}
                setSelected={setSelected}
                icon={<AddCircleOutlineOutlinedIcon />}
              />
              <Item
                title="User List"
                to="/team"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              </Box>
            </SubMenu>

            <Typography
              variant="h6"
              color={colors.grey[700]}
              sx={{ m: "15px 0 5px 30px",fontWeight: "bold" }}
              {...(isCollapsed && { display: "none" })}
            >
              Products
            </Typography>

            <SubMenu
              title="Products"
              icon={<ShoppingCartOutlinedIcon />}
              style={{
                color: colors.grey[100],
              }}
              selected={selected}
              setSelected={setSelected}
            >
              <Box
            
            sx={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "10px 0 10px 0",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              
             
              
            }}>
              <Item
                title="Add Product"
                to="/add-product"
                selected={selected}
                setSelected={setSelected}
                icon={<AddCircleOutlineOutlinedIcon />}
              />

              <Item
                title="Product List"
                to="/products"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              <Item
                title="Product Categories"
                to="/categories"
                icon={<CategoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /></Box>
            </SubMenu>

            <Item
              title="Product Pricing"
              to="/pricing"
              icon={<AttachMoneyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Coupons"
              to="/coupons"
              icon={<LocalOfferOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/orders"
              icon={<ShoppingCartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[700]}
              sx={{ m: "15px 0 5px 30px",fontWeight: "bold" }}
              {...(isCollapsed && { display: "none" })}
            >
              Interactions
            </Typography>

            
            <SubMenu
              title="Blogs"
              icon={<LibraryBooksOutlinedIcon />}
              style={{
                color: colors.grey[100],
              }}
              selected={selected}
              setSelected={setSelected}
            >
            <Box
            
            sx={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "10px 0 10px 0",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              
             
              
            }}>
              <Item
                title="Add New Blog"
                to="/addblog"
                selected={selected}
                setSelected={setSelected}
                icon={<EditOutlinedIcon />}
                // {...(isCollapsed && { display: "none" })}
                
              />
              <Item
                title="Blog List"
                to="/blogs"
                selected={selected}
                setSelected={setSelected}
                icon={<LibraryBooksOutlinedIcon />}
              />
              <Item
                title="Add Blog Category"
                to="/addblogcategory"
                selected={selected}
                setSelected={setSelected}
                icon={<CategoryOutlinedIcon />}
              />
              <Item
                title="Blog Categories List"
                to="/blogcategories"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              </Box>

            </SubMenu>
            
            <SubMenu
              title="Tickets"
              to="/tickets"
              selected={selected}
              setSelected={setSelected}
              icon={<LiveHelpOutlinedIcon />}
              style={{
                color: colors.grey[100],
              }}
             
            >
              <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: "10px 0 10px 0",
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}>
              <Item
                title="Add New Ticket"
                to="/tickets/createticket"
                selected={selected}
                setSelected={setSelected}
                icon={<EditOutlinedIcon />}
              />
              <Item
                title="Ticket List"
                to="/tickets/ticketslist"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              
              </Box>

            </SubMenu>
            <Item
              title="Pages"
              to="/pages"
              icon={<PagesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Testimonials"
              to="/testimonials"
              icon={<RateReviewOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reviews"
              to="/reviews"
              icon={<RateReviewOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="FAQs"
              to="/faqs"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{
                color: colors.grey[100],
              }}
            >
              <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: "10px 0 10px 0",
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}>
              <Item
                title="Add New FAQ"
                to="/faqs/addfaq"
                selected={selected}
                setSelected={setSelected}
                icon={<EditOutlinedIcon />}
              />
              <Item
                title="FAQ List"
                to="/faqs/faqlist"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              <Item
                title="Add FAQ Category"
                to="/faqs/addfaqcategory"
                selected={selected}
                setSelected={setSelected}
                icon={<CategoryOutlinedIcon />}
              />
              <Item
                title="FAQ Categories List"
                to="/faqs/faqcategorieslist"
                selected={selected}
                setSelected={setSelected}
                icon={<ListAltOutlinedIcon />}
              />
              
              </Box>
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
