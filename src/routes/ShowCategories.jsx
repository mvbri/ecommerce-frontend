import { useParams  } from "react-router";
import CategorySectionProducts from "../components/CategorySectionProducts";
import HomeLayout from "../layout/HomeLayout";


const ShowCategories = () => {
    const params = useParams();
    console.log(params)
    return (
        <HomeLayout>
            <CategorySectionProducts slug={params.slug} />
        </HomeLayout>
    )
}

export default ShowCategories