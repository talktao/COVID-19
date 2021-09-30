import React from "react";
import {
    AppstoreAddOutlined,
    UserOutlined,
    TeamOutlined,
    FireOutlined,
    SettingOutlined,
    DropboxOutlined,
    SafetyOutlined,
    LayoutOutlined,
    ReconciliationOutlined,
    FileProtectOutlined,
    ProjectOutlined,
    RocketOutlined
} from "@ant-design/icons";
export default (fontSize = 20) => {
    const props = { style: { fontSize } };
    return {
        AppstoreAddOutlined: <AppstoreAddOutlined {...props} />,
        UserOutlined: <UserOutlined {...props} />,
        TeamOutlined: <TeamOutlined {...props} />,
        FireOutlined: <FireOutlined {...props} />,
        SettingOutlined: <SettingOutlined {...props} />,
        DropboxOutlined: <DropboxOutlined {...props} />,
        SafetyOutlined: <SafetyOutlined {...props} />,
        LayoutOutlined: <LayoutOutlined {...props} />,
        ReconciliationOutlined: <ReconciliationOutlined {...props} />,
        FileProtectOutlined: <FileProtectOutlined {...props} />,
        ProjectOutlined: <ProjectOutlined {...props} />,
        RocketOutlined: <RocketOutlined {...props} />,
        
    };
};
