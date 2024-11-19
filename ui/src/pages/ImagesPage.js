import ImageRunModal from "../component/ImageRunModal";
import ImageSerchForm from "../component/ImageSearchForm";
import ImageTables from "../component/ImageTables";


export default function ImagePage() {

    return (
        <div id="imagePage">
            <ImageSerchForm />
            <div className="mt-10">
                <ImageTables/>
            </div>
            <ImageRunModal/>
        </div>
    )

}