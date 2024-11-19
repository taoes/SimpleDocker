import { Button, Flex, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function NotFoundPage() {
    const navigate = useNavigate()
    let [second, setSecond] = useState(5);


    let id = setInterval(() => {
        if (second >= 1) {
            setSecond(second - 1);
        } else {
            if (id) {
                clearInterval(id)
            }
            navigate("/")
        }
    }, 1000);


    let toIndex = () => {
        if (id) {
            clearInterval(id)
        }
        navigate("/")
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={style}>
            <span>The page does not exist and will return to the homepage in {second} seconds.</span>
            <div style={{ height: 20 }}></div>
            <Button onClick={() => navigate("/")} icon={<ArrowLeftOutlined />}>Now Return !</Button>
        </div>
    )
}