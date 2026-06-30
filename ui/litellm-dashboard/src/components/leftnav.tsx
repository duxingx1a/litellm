import {
  ApiOutlined,
  BarChartOutlined,
  BlockOutlined,
  ExportOutlined,
  KeyOutlined,
  LineChartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu } from "antd";
import { MIGRATED_PAGES, migratedHref, legacyPageHref } from "@/utils/migratedPages";
const { Sider } = Layout;

// Define the props type
interface SidebarProps {
  setPage: (page: string) => void;
  defaultSelectedKey: string;
  collapsed?: boolean;
}

// Menu item configuration
interface MenuItem {
  key: string;
  page: string;
  label: string | React.ReactNode;
  roles?: string[];
  children?: MenuItem[];
  icon?: React.ReactNode;
  external_url?: string;
}

// Group configuration
interface MenuGroup {
  groupLabel: string;
  items: MenuItem[];
  roles?: string[];
}

// 精简后的菜单组 — 仅保留个人使用需要的功能
const menuGroups: MenuGroup[] = [
  {
    groupLabel: "AI 网关",
    items: [
      {
        key: "api-keys",
        page: "api-keys",
        label: "API 密钥",
        icon: <KeyOutlined />,
      },
      {
        key: "llm-playground",
        page: "llm-playground",
        label: "模型调试",
        icon: <PlayCircleOutlined />,
      },
      {
        key: "models",
        page: "models",
        label: "模型与端点",
        icon: <BlockOutlined />,
      },
    ],
  },
  {
    groupLabel: "可观测性",
    items: [
      {
        key: "new_usage",
        page: "new_usage",
        icon: <BarChartOutlined />,
        label: "用量",
      },
      {
        key: "logs",
        page: "logs",
        label: "日志",
        icon: <LineChartOutlined />,
      },
    ],
  },
  {
    groupLabel: "开发者工具",
    items: [
      {
        key: "api_ref",
        page: "api_ref",
        label: "API 参考",
        icon: <ApiOutlined />,
      },
    ],
  },
];

// 精简后的 Sidebar — 个人使用，无需角色/权限检查
const Sidebar: React.FC<SidebarProps> = ({
  setPage,
  defaultSelectedKey,
  collapsed = false,
}) => {
  const navigateToPage = (page: string) => setPage(page);

  const renderNavLink = (label: React.ReactNode, page: string, externalUrl?: string): React.ReactNode => {
    if (externalUrl) {
      return (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {label} <ExportOutlined style={{ fontSize: 10, marginLeft: 4 }} />
        </a>
      );
    }
    const migratedRoute = MIGRATED_PAGES[page];
    const href = migratedRoute ? migratedHref(migratedRoute) : legacyPageHref(page);
    return (
      <a
        href={href}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
            e.stopPropagation();
            return;
          }
          e.preventDefault();
        }}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {label}
      </a>
    );
  };

  // 直接构建菜单，无需角色过滤
  const buildMenuItems = (): MenuProps["items"] => {
    const items: MenuProps["items"] = [];

    menuGroups.forEach((group) => {
      items.push({
        type: "group",
        label: collapsed ? null : (
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#6b7280",
              letterSpacing: "0.05em",
              padding: "12px 0 4px 12px",
              display: "block",
              marginBottom: "2px",
            }}
          >
            {group.groupLabel}
          </span>
        ),
        children: group.items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: renderNavLink(item.label, item.page, item.external_url),
          onClick: !item.children
            ? () => {
                if (item.external_url) {
                  window.open(item.external_url, "_blank");
                } else {
                  navigateToPage(item.page);
                }
              }
            : undefined,
        })),
      });
    });

    return items;
  };

  const findMenuItemKey = (page: string): string => {
    for (const group of menuGroups) {
      for (const item of group.items) {
        if (item.page === page) return item.key;
      }
    }
    return "api-keys";
  };

  const selectedMenuKey = findMenuItemKey(defaultSelectedKey);

  return (
    <Layout>
      <Sider
        theme="light"
        width={220}
        collapsed={collapsed}
        collapsedWidth={80}
        collapsible
        trigger={null}
        style={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                iconSize: 15,
                fontSize: 13,
                itemMarginInline: 4,
                itemPaddingInline: 8,
                itemHeight: 30,
                itemBorderRadius: 6,
                subMenuItemBorderRadius: 6,
                groupTitleFontSize: 10,
                groupTitleLineHeight: 1.5,
              },
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuKey]}
            defaultOpenKeys={[]}
            inlineCollapsed={collapsed}
            className="custom-sidebar-menu"
            style={{
              borderRight: 0,
              backgroundColor: "transparent",
              fontSize: "13px",
              paddingTop: "4px",
            }}
            items={buildMenuItems()}
          />
        </ConfigProvider>
      </Sider>
    </Layout>
  );
};

export default Sidebar;

// Also export menuGroups for advanced use cases
export { menuGroups };
