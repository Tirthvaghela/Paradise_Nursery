import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import { Leaf } from 'lucide-react';

const CATALOG = [
  {
    category: 'Air Purifying',
    description: 'Natural oxygenators for the modern home.',
    plants: [
      { id: 1, name: 'Snake Plant Zeylanica', price: 28, species: 'Dracaena trifasciata', thumbnail: 'https://images.unsplash.com/photo-1593482892290-f54927ae1cdc?auto=format&fit=crop&q=80&w=800' },
      { id: 2, name: 'Spider Plant', price: 22, species: 'Chlorophytum comosum', thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d445?auto=format&fit=crop&q=80&w=800' },
      { id: 3, name: 'Peace Lily', price: 35, species: 'Spathiphyllum', thumbnail: 'https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=800' },
      { id: 4, name: 'Aloe Vera', price: 18, species: 'Aloe barbadensis', thumbnail: 'https://images.unsplash.com/photo-1567331711402-509c13ee4911?auto=format&fit=crop&q=80&w=800' },
      { id: 5, name: 'Rubber Tree', price: 42, species: 'Ficus elastica', thumbnail: 'https://images.unsplash.com/photo-1598592232741-f74302c24716?auto=format&fit=crop&q=80&w=800' },
      { id: 6, name: 'Boston Fern', price: 30, species: 'Nephrolepis exaltata', thumbnail: 'https://images.unsplash.com/photo-1592150621344-22d5ef81f9a2?auto=format&fit=crop&q=80&w=800' },
    ],
  },
  {
    category: 'Low Maintenance',
    description: 'Resilient specimens for the busy collector.',
    plants: [
      { id: 7, name: 'ZZ Plant', price: 40, species: 'Zamioculcas zamiifolia', thumbnail: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800' },
      { id: 8, name: 'Golden Pothos', price: 15, species: 'Epipremnum aureum', thumbnail: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=800' },
      { id: 9, name: 'Cast Iron Plant', price: 45, species: 'Aspidistra elatior', thumbnail: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800' },
      { id: 10, name: 'Jade Plant', price: 25, species: 'Crassula ovata', thumbnail: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800' },
      { id: 11, name: 'Succulent Trio', price: 32, species: 'Echeveria spp.', thumbnail: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=800' },
      { id: 12, name: 'Ponytail Palm', price: 55, species: 'Beaucarnea recurvata', thumbnail: 'https://images.unsplash.com/photo-1621250269550-6d4f40f994f8?auto=format&fit=crop&q=80&w=800' },
    ],
  },
  {
    category: 'Fragrant',
    description: 'Scented varieties that delight the senses.',
    plants: [
      { id: 13, name: 'French Lavender', price: 24, species: 'Lavandula dentata', thumbnail: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&q=80&w=800' },
      { id: 14, name: 'Rosemary', price: 20, species: 'Salvia rosmarinus', thumbnail: 'https://images.unsplash.com/photo-1594313054118-4729d8d69766?auto=format&fit=crop&q=80&w=800' },
      { id: 15, name: 'Mint', price: 12, species: 'Mentha', thumbnail: 'https://images.unsplash.com/photo-1603072875302-7ef53b3e737d?auto=format&fit=crop&q=80&w=800' },
      { id: 16, name: 'Lemon Balm', price: 18, species: 'Melissa officinalis', thumbnail: 'https://images.unsplash.com/photo-1596701062351-be5f8a42f39d?auto=format&fit=crop&q=80&w=800' },
      { id: 17, name: 'Hyacinth', price: 28, species: 'Hyacinthus', thumbnail: 'https://images.unsplash.com/photo-1534063227918-05047f63118a?auto=format&fit=crop&q=80&w=800' },
      { id: 18, name: 'Scented Geranium', price: 32, species: 'Pelargonium', thumbnail: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&q=80&w=800' },
    ],
  },
];

const FALLBACK = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800';

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === plant.id);

  return (
    <div className="plant-card">
      <div className="plant-card-img-wrap">
        <img
          src={plant.thumbnail}
          alt={plant.name}
          className="plant-card-img"
          onError={(e) => { e.target.src = FALLBACK; }}
        />
        <span className="plant-price-tag">₹{plant.price}</span>
      </div>
      <div className="plant-card-body">
        <h4 className="plant-name">{plant.name}</h4>
        <p className="plant-species">{plant.species}</p>
        <button
          onClick={() => dispatch(addItem(plant))}
          disabled={isInCart}
          className={`acquire-btn ${isInCart ? 'acquired' : ''}`}
          aria-label={isInCart ? `${plant.name} in cart` : `Add ${plant.name} to cart`}
        >
          {isInCart ? 'In Collection' : 'Acquire Specimen'}
        </button>
      </div>
    </div>
  );
}

function ProductList() {
  return (
    <div className="catalog-page">
      <div className="catalog-container">
        {CATALOG.map((group) => (
          <section key={group.category} className="catalog-section">
            <div className="section-header">
              <h3 className="section-title">
                <Leaf size={20} className="section-leaf" />
                {group.category}
              </h3>
              <p className="section-subtitle">{group.description}</p>
              <div className="section-rule" />
            </div>
            <div className="plants-grid">
              {group.plants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
