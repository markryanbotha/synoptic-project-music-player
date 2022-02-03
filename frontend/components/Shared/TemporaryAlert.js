import { useEffect, useState, useRef } from "react"
import { Alert, Modal } from "@mui/material"

const TemporaryAlert = ({ children, open, delay }) => {
    const [_, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(open)
    }, [open])

    return (
        <Modal
            open={open}
            onClose={() => {
                setIsVisible(false)
            }}
        >
            <Alert
                severity="error"
                style={{
                    top: "50%",
                    left: "25%",
                    width: "50%",
                    position: "absolute",
                }}
            >
                {children}
            </Alert>
        </Modal>
    )
}

export default TemporaryAlert
