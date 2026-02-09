//import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import TOC from "./TOC";


export default function LabsLayout({
 children,
}: Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td valign="top" width="100px">
           <TOC />
         </td>
         <td valign="top" className="p-4">{children}</td>
       </tr>
     </tbody>
   </table>
);}

