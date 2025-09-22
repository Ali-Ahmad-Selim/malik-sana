"use client";

export default function ProductCard() {
  return (
    <div className="p-6 flex items-center justify-center">
      {/* Card Container */}
      <div className="group relative w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
        
        {/* Card Image */}
        <img 
          src="https://images.unsplash.com/photo-1610275515329-197e4c9354e2?auto=format&fit=crop&w=774&q=80"
          alt="Elegant traditional attire" 
          className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => { 
            e.currentTarget.src = "https://placehold.co/400x600/111827/ffffff?text=Image+Not+Found"; 
          }}
        />
        
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
            
            {/* Card Content */}
            <h3 className="text-2xl font-bold text-white">Shairwani Elegance</h3>
            <p className="mt-2 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              Crafted for royalty. This exquisite piece combines traditional artistry with modern tailoring.
            </p>
            
            {/* Button */}
            <button className="mt-4 w-full bg-purple-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-purple-700 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-300">
              Explore Collection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
