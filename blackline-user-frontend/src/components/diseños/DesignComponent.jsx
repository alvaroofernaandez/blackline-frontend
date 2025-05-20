import CardDiseños from './CardDiseños.jsx';
import { useDiseños } from '../../hooks/useDiseños';

const DesignComponent = () => {
  const { designs, loading, error, hasMore, handleLoadMore } = useDiseños();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-right">
        {designs.map((design) => (
          <CardDiseños
            key={design.id}
            title={design.title}
            price={design.price}
            size={design.size}
            time={design.time}
            imageUrl={design.imageUrl}
          />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-900 transition-all duration-300"
          >
            Ver más...
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignComponent;
