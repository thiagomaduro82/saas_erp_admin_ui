import { ToolbarDetail, ToolbarList } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";


export const Home = () => {
    return (
        <BaseLayout title="Home page" toolsBar={(
            <ToolbarList pageSizeList={[15, 25, 50, 100]} fieldsList={['campo1', 'campo2']} orderList={['asc', 'desc']} />
        )}>
            <ToolbarDetail />
            Testando!
        </BaseLayout>
    );
}
