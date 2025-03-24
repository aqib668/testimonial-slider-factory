
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Initialize the slider when component mounts
    const initSlider = () => {
      const sliderItems = document.querySelectorAll('.testimonial-item');
      const sliderImages = document.querySelectorAll('.slider-image');
      const paginationItems = document.querySelectorAll('.pagination-item');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      let currentIndex = 0;

      // Function to update the slider
      const updateSlider = (index: number) => {
        // Update active states
        sliderItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
        });
        
        sliderImages.forEach((image, i) => {
          if (i === index) {
            image.classList.add('active');
            image.classList.remove('inactive');
          } else {
            image.classList.remove('active');
            image.classList.add('inactive');
          }
        });
        
        paginationItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
        });
        
        // Update current index
        currentIndex = index;
        
        // Update pagination numbers
        const paginationNumber = document.querySelector('.pagination-number');
        if (paginationNumber) {
          paginationNumber.textContent = String(currentIndex + 1).padStart(2, '0');
        }
      };

      // Add event listeners to pagination
      paginationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          updateSlider(index);
        });
      });

      // Add event listeners to buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const newIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
          updateSlider(newIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const newIndex = (currentIndex + 1) % sliderItems.length;
          updateSlider(newIndex);
        });
      }

      // Initialize slider
      updateSlider(0);
    };

    // Run the initialization after the component is mounted
    const timer = setTimeout(() => {
      initSlider();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="testimonial-container">
      <div className="testimonial-section">
        <div className="testimonial-content">
          <h2 className="headline">WHAT <span className="block">OUR</span></h2>
          <h2 className="headline outline">CUSTOMERS SAY</h2>
          
          <div className="testimonial-slider">
            <div className="testimonial-item active">
              <p className="testimonial-text">
                I was definitely thrilled to visit your store and would love to take time
                and visit it again. I was fascinated with the large collection of women's
                clothing that you have in store, and the various kinds of dresses are
                really lucrative and affordable on my pockets.
              </p>
              <div className="testimonial-author">
                <h4>Olive Yew</h4>
                <p>Fashion Model</p>
              </div>
            </div>
            
            <div className="testimonial-item">
              <p className="testimonial-text">
                The selection of clothing is outstanding. The staff was incredibly helpful and made my shopping experience so pleasant. I'll definitely be returning and recommending your store to all my friends.
              </p>
              <div className="testimonial-author">
                <h4>Maya Johnson</h4>
                <p>Interior Designer</p>
              </div>
            </div>
            
            <div className="testimonial-item">
              <p className="testimonial-text">
                What impressed me most was the quality of the materials and craftsmanship. Each piece feels luxurious yet the prices are surprisingly reasonable. The store atmosphere is also very inviting.
              </p>
              <div className="testimonial-author">
                <h4>Leila Chen</h4>
                <p>Marketing Executive</p>
              </div>
            </div>
            
            <div className="slider-controls">
              <div className="pagination">
                <span className="pagination-number">01</span>
                <span className="pagination-line"></span>
                <div className="pagination-indicators">
                  <span className="pagination-item active"></span>
                  <span className="pagination-item"></span>
                  <span className="pagination-item"></span>
                </div>
              </div>
              <div className="slider-buttons">
                <button className="slider-prev">←</button>
                <button className="slider-next">→</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="slider-images">
          <div className="slider-image active">
            <img src="/lovable-uploads/5d666cfc-89b7-4fb9-bdbe-d9e4fa483022.png" alt="Olive Yew" />
          </div>
          <div className="slider-image inactive">
            <img src="/lovable-uploads/39441fa8-0ac3-4417-935b-864df7f9c617.png" alt="Maya Johnson" />
          </div>
          <div className="slider-image inactive">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop" alt="Leila Chen" />
          </div>
        </div>
      </div>
      
      <style>{`
        .testimonial-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FAF9F6;
          padding: 4rem 1rem;
        }
        
        .testimonial-section {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin: 0 auto;
        }
        
        @media (max-width: 991px) {
          .testimonial-section {
            grid-template-columns: 1fr;
          }
        }
        
        .testimonial-content {
          max-width: 570px;
        }
        
        .headline {
          font-size: 3.25rem;
          font-weight: 700;
          color: #1A2942;
          line-height: 1;
          margin: 0;
        }
        
        .headline.outline {
          -webkit-text-stroke: 1px #1A2942;
          -webkit-text-fill-color: transparent;
          letter-spacing: 2px;
          margin-bottom: 2rem;
        }
        
        .block {
          display: block;
        }
        
        .testimonial-slider {
          position: relative;
          margin-top: 2rem;
        }
        
        .testimonial-item {
          display: none;
        }
        
        .testimonial-item.active {
          display: block;
        }
        
        .testimonial-text {
          color: #4A5568;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 90%;
        }
        
        .testimonial-author h4 {
          font-weight: 600;
          color: #1A2942;
          margin: 0 0 0.25rem 0;
        }
        
        .testimonial-author p {
          color: #718096;
          font-size: 0.875rem;
          margin: 0;
        }
        
        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .pagination {
          display: flex;
          align-items: center;
        }
        
        .pagination-number {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A2942;
          margin-right: 1rem;
        }
        
        .pagination-line {
          width: 3rem;
          height: 1px;
          background-color: #E2E8F0;
          margin-right: 1rem;
        }
        
        .pagination-indicators {
          display: flex;
          gap: 1rem;
        }
        
        .pagination-item {
          width: 2rem;
          height: 1px;
          background-color: #E2E8F0;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .pagination-item.active {
          background-color: #1A2942;
        }
        
        .slider-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .slider-prev,
        .slider-next {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E2E8F0;
          background-color: transparent;
          color: #1A2942;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .slider-prev:hover,
        .slider-next:hover {
          background-color: #F7FAFC;
        }
        
        .slider-images {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          position: relative;
        }
        
        .slider-image {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: opacity 0.3s ease;
        }
        
        .slider-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .slider-image.active {
          opacity: 1;
          z-index: 2;
        }
        
        .slider-image.inactive {
          opacity: 0.3;
          z-index: 1;
        }

        @media (max-width: 767px) {
          .headline {
            font-size: 2.5rem;
          }
          
          .testimonial-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
