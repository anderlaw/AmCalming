import headerStyles from "./header.module.css";
import {FC} from "react";

export type TabType = string
const Tabs: Array<TabType> = [
    '资源库',
    '配置'
]

interface IProps {
    curTab: TabType
    onTabChange: (newTag: TabType) => void
}

export const Header: FC<IProps> = (props) => {
    return <div className={headerStyles.headerContainer}>
        {
            Tabs.map(tabName => {
                return <div onClick={() => {
                    if (tabName !== props.curTab) {
                        props.onTabChange(tabName)
                    }
                }} key={tabName}
                            className={`${headerStyles.headerItem} ${tabName === props.curTab ? headerStyles.active : ''}`}>
                    <div><span>{tabName}</span></div>
                </div>
            })
        }
    </div>
}