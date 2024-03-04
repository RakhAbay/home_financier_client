import { useState } from "react"
import { ChatBot } from "./ChatBot"
import { Button } from "antd"

export const ChatBotContainer = (): JSX.Element => {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="pinned">
            <div style={{ display: isOpened ? 'block' : 'none' }}>
                <ChatBot />
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row-reverse' }}>
                {isOpened ? 
                <Button onClick={() => setIsOpened(false)} danger type="primary">Close</Button>
                :
                <Button onClick={() => setIsOpened(true)} type="primary">ChatBot</Button>}
            </div>
        </div>
    )
}
