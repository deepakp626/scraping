"use client"

import { useParams,usePathname } from "next/navigation"
import Contact from "../contact/page"

const ConditionalContact = () => {
    const params = useParams()
    const pathname = usePathname()
    // console.log(params)
    // console.log(pathname)

    if (pathname === "/contact") return null

    return <Contact />
}

export default ConditionalContact