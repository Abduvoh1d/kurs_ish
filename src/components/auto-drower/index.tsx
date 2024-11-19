import { ReactNode } from "react"
import { Drawer } from "antd"

interface DrowerProps {
    children?: ReactNode
    title?: string
    width?: number
    open?: boolean
    onClose?: () => void
}

export function AutoDrower({ children, title, onClose, open, width }: DrowerProps) {
    return (
        <Drawer title={title} onClose={onClose} open={open} width={width}>
            {children}
        </Drawer>
    )
}
