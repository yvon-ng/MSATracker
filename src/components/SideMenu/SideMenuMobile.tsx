// import {Drawer} from "@mui/material";
// import {collapsedDrawerWidth, drawerWidth} from "./layoutConstants.ts";
//
// interface SideMenuMobileProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
//
// }
//
// export function SideMenuMobile({open, setOpen}: SideMenuMobileProps) {
//     return (
//         <>
//             {/* Mobile drawer */}
//             <Drawer
//                 variant="temporary"
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 sx={{
//                     display: { xs: "block", md: "none" },
//                     "& .MuiDrawer-paper": {
//                         width: drawerWidth,
//                         boxSizing: "border-box",
//                     },
//                 }}
//             >
//                 {/* Reusable drawer content */}
//             </Drawer>
//
//             {/* Desktop drawer */}
//             <Drawer
//                 variant="permanent"
//                 open={open}
//                 sx={{
//                     display: { xs: "none", md: "block" },
//                     width: open ? drawerWidth : collapsedDrawerWidth,
//                     flexShrink: 0,
//                     "& .MuiDrawer-paper": {
//                         width: open ? drawerWidth : collapsedDrawerWidth,
//                         boxSizing: "border-box",
//                         transition: "width 0.2s",
//                         overflowX: "hidden",
//                     },
//                 }}
//             >
//             </Drawer>
//         </>
//     )
// }