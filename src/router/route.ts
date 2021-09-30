//此文件和路由配置、导航面包屑关联
import createIcons from "utils/icons";
import {subset} from "utils/index"

const icons = createIcons(14);
let route = [
    {
        key: "/page",
        title: "页面管理",
        icon: "LayoutOutlined",
        children: [
            {key: "/page/list",title:"页面列表"},
            {key: "/page/setting",title:"页面设置"},
        ]
    },
    {
        key: "/bizs",
        title: "商户管理",
        icon: "AppstoreAddOutlined",
        children: [
            {
                key: "/bizs/list",
                title: "订单列表",
            },
            {
                key: "/bizs/datastats",
                title: "数据统计",
            },
        ],
    },
    {
        key: "/products",
        title: "商品管理",
        icon: "FireOutlined",
        children: [
            {
                key: "/products/productsList",
                title: "商品列表",
                        },
            {
                key: "/products/attribute",
                title: "属性管理",
            },
            {
                key: "/products/category",
                title: "分类管理",
            },
            {
                key: "/products/productaudit",
                title: "商品审核",
            },		
        ],
    },
    {
        key: "/orders",
        title: "订单管理",
        icon: "DropboxOutlined",
        children: [
            {
                key: "/orders/list",
                title: "订单列表",
            },
        ],
    },
    {
        key: "/afterSale",
        title: "售后管理",
        icon: "FileProtectOutlined",
        children: [
            {
                key: "/afterSale/list",
                title: "售后列表",
            },
        ],
    },
    {
        key: "/shopowners",
        title: "店主管理",
        icon: "UserOutlined",
        children: [
            {
                key: "/shopowners/list",
                title: "店主列表",
            },
            {
                key: "/shopowners/withdrawal",
                title: "提现审核",
            },
        ],
    },
    {
        key: "/power",
        title: "权限管理",
        icon: "SafetyOutlined",
        children: [
            {
                key: "/power/roles",
                title: "角色管理",
            },
            {
                key: "/power/users",
                title: "用户管理",
            },
            {
                key: "/power/mymenu",
                title: "菜单管理",
            }
        ],
    },
    {
        key: "/changepassword",
        title: "修改密码"
    },
    
    {
        key: "/logManage",
        title: "日志管理",
        icon: "ReconciliationOutlined",
    },
    {
        key: "/params",
        title: "参数管理",
        icon: "ProjectOutlined",
    },
    {
        key: "/upgrade",
        title: "升级中心",
        icon: "RocketOutlined",
        children: [
            {
                key: "/upgrade/systemUpgrade",
                title: "系统升级",
            },
            {
                key: "/upgrade/params",
                title: "参数配置",
            },
            {
                key: "/upgrade/operationRecord",
                title: "操作记录",
                // icon: "FileProtectOutlined",
            },
            {
                key: "/upgrade/log",
                title: "升级日志",
            },
            {
                key: "/upgrade/backup",
                title: "备份管理",
            },
        ],
    },
];
const ForRoute = (arg: any[]) => {
    console.log(arg,'arg');
    
    return arg.map(item => {
        console.log(item,'item');
        
        if (item.children) {
            ForRoute(item.children);
        }
        return { ...item};
    });
};
export const iconRoute = ForRoute(route);
export default route;
