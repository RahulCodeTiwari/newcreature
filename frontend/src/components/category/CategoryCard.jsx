import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <div className="w-full bg-white rounded-2xl border-2 border-gray-300 p-2 shadow-sm hover:shadow-md transition">
        <div className=" flex items-center gap-4">

          {/* LEFT – Image Box */}
          <div className="w-[100px] h-[120px]  rounded-2xl flex items-center justify-center">
            <img
              src={category.image?.url}
              alt={category.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
      
          <div className=" flex-1">
            <h3 className="text-xl font-bold text-black">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

