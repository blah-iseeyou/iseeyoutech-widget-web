import React, { useState } from 'react'
import { Typography, Layout, Space } from 'tiny-ui'

const { Text } = Typography
const { Header } = Layout

export default function ({ title }) {
    return <Space direction='horizontal' style={{ justifyContent: "space-between",width: "100%" }}>
        <Text strong style={{ fontSize: 14 }}>{title}</Text>
        <Text level={3}>x</Text>
    </Space >
}