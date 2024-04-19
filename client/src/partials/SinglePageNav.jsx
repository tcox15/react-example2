import { Link, useLocation, useParams } from "react-router-dom";

const SinglePageNav = () => {

    const { id: bookId } = useParams();

    const location = useLocation();
    const pathName = location.pathname;
    const pathNameList = pathName.split('/');

    const linkClasses = (path) => {
        let classes = 'text-2xl font-bold px-4 py-1 rounded-full mr-4';
        if (pathNameList.includes(path)) {
            classes += ' bg-primary text-background border-2 border-background';
        } else {
            classes += ' bg-background text-primary border-2 border-primary transition-all duraction-200 hover:bg-secondary hover:text-background hover:border-secondary';
        }
        return classes;
    }
    return (
        <nav className="mt-3">
            <Link to={`/books/${bookId}/edit`} className={linkClasses('edit')}>
                Book info
            </Link>
            <Link to={`/books/${bookId}/chapters`} className={linkClasses('chapters')}>
                Chapters
            </Link>
            <Link to={`/books/${bookId}/outlines`} className={linkClasses('outlines')}>
                Outlines
            </Link>
            <Link to={`/books/${bookId}/characters`} className={linkClasses('characters')}>
                Characters
            </Link>
            <Link to={`/books/${bookId}/world-building`} className={linkClasses('world-building')}>
                World Building
            </Link>
        </nav>
    );
}
 
export default SinglePageNav;