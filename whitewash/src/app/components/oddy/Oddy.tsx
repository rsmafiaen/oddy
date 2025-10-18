"use client"

import Image from "next/image"
import oddy from "@/assets/images/oddy.png"
import frog from "@/assets/images/frog.png"
import styles from "./Oddy.module.css"
import * as React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

export const Oddy = ({
  message = "Hei! Jeg er Oddy, kan jeg hjelpe deg med noe?",
}: {
  message?: string
}) => {
  const [isFrog, setIsFrog] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<typeof frog | typeof oddy>(oddy)
  const [name, setName] = useState<"Froggy" | "Oddy">("Oddy")

  useEffect(() => {
    const shouldBeFrog = Math.random() < 1 / 20
    setIsFrog(shouldBeFrog)
    if (shouldBeFrog) {
      setAvatar(frog)
      setName("Froggy")
    }
  }, []) 
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    if(isFrog){
      
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <div>
      <div
        id="chat-container"
        className="flex flex-col items-end space-x-3 z-
        +50"
      >
        <Image
          src={avatar}
          alt={`${name} avatar`}
          width={80}
          height={80}
          className={`rounded-full ${isFrog ? styles.spinSlow : ""}`}
        />
        <div>
          <div id="oddy_container" className="relative px-4 py-3 rounded-lg ">
            <div
              id="oddy_pic"
              className="relative bg-gray-200 px-4 py-3 rounded-lg text-gray-900 shadow"
            >
              {isFrog ? message.replace(/\bOddy\b/g, "Froggy") : message}
              <div className="absolute -left-2 bottom-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200" />
            </div>
            <button
              id="open-chat-button"
              onClick={handleClick}
              type="button"
              className="bg-white w-full rounded text-black p-3 placeholder-gray-600 mt-6"
            >
              Ask {name}
            </button>
            <Popover
              className="mt-6"
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Typography sx={{ p: 2 }}>Bruh momento.</Typography>
            </Popover>
          </div>

        </div>
      </div>
    </div>
  )
}
