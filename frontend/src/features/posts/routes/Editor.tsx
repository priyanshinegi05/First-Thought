import { CustomContainer } from "../../../components/Layout/CustomContainer";
import EditorTabs from "../components/EditorTabs";
import Header from "../../../components/Layout/Header";

const Editor = () => {
    return (
        <>
            <Header />
            <CustomContainer>
                <EditorTabs />
            </CustomContainer>
        </>
    );
};

export default Editor;
