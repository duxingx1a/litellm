"use client";

import { useLogin } from "@/app/(dashboard)/hooks/login/useLogin";
import { consumeReturnUrl } from "@/utils/returnUrlUtils";
import LoadingScreen from "@/components/common_components/LoadingScreen";
import { Alert, Button, Card, Form, Input, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LoginPageContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const loginMutation = useLogin();
  const router = useRouter();
  useEffect(() => { setTimeout(() => setLoading(false), 300); }, []);
  if (loading) return <LoadingScreen />;

  const handleSubmit = () => {
    loginMutation.mutate(
      { username, password, useV3: false },
      {
        onSuccess: (data) => {
          const returnUrl = consumeReturnUrl();
          router.push(returnUrl || data.redirect_url || "/ui/");
        },
      },
    );
  };

  const error = loginMutation.error instanceof Error ? loginMutation.error.message : null;
  const isLoginLoading = loginMutation.isPending;
  const { Title, Text, Paragraph } = Typography;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <Card style={{ width: "100%", maxWidth: 420, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>🚅 LiteLLM 个人版</Title>
          </div>
          <div style={{ textAlign: "center" }}>
            <Title level={3}>登录</Title>
            <Text type="secondary">请输入你的 API 密钥</Text>
          </div>
          <Alert
            message="提示"
            description={<Paragraph style={{ margin: 0 }}>用户名任意填写，密码填写 <code>LITELLM_MASTER_KEY</code></Paragraph>}
            type="info" showIcon
          />
          {error && <Alert message={error} type="error" showIcon />}
          <Form onFinish={handleSubmit} layout="vertical" requiredMark={false}>
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
              <Input placeholder="任意填写" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoginLoading} size="large" />
            </Form.Item>
            <Form.Item label="密钥" name="password" rules={[{ required: true, message: "请输入密钥" }]}>
              <Input.Password placeholder="输入 LITELLM_MASTER_KEY" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoginLoading} size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoginLoading} disabled={isLoginLoading} block size="large">
                {isLoginLoading ? "登录中..." : "登 录"}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}
