import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import Masonry from 'react-masonry-css';
import Slider from 'react-slick'; // Still needed for the grid's embedded carousels
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import Lightbox from '../components/Lightbox.jsx'; // Import the Lightbox component
import { Link } from 'react-router-dom'; // <-- NEW: Import Link for navigation

// 1) Put your published CSV link here (no trailing spaces)
const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSfiDIcpHZeyXD7nbtKwrte9mE0IdjCEyeFhGFfooanMLLuPnOKHysLRmmQ7pm01GexCKtRfnZ6IT-1/pub?gid=0&single=true&output=csv';

// Helper: split a cell into URLs (supports |, newline, or comma if needed)
function splitUrls(cell = '') {
  return cell
    .split(/[\n|,]/g)
    .map(s => s.trim())
    .filter(Boolean);
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  // Masonry breakpoints (for columns)
  const breakpoints = useMemo(
    () => ({
      default: 4, // 4 columns on large screens
      1200: 3,    // 3 columns on medium screens
      900: 2,     // 2 columns on tablets
      600: 1,     // 1 column on mobile
    }),
    []
  );

  // Slider (carousel) settings for the embedded grid carousels
  const embeddedSliderSettings = useMemo(
    () => ({
      dots: true,
      arrows: false, // No arrows on embedded sliders to keep clean
      infinite: false,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      beforeChange: (oldIndex, newIndex) => {
        // When user changes slide in embedded carousel, update start index for lightbox
        // This is a bit advanced; for simplicity, we could just always open at 0
        setLightboxStartIndex(newIndex);
      },
    }),
    []
  );

  const loadData = () => {
    setStatus('loading');
    setErrorMsg('');
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = (results.data || []).filter(r => r.imageUrl);
          const mapped = rows.map((row, i) => {
            const images = splitUrls(row.imageUrl);
            const order = Number(row.order) || Number.MAX_SAFE_INTEGER;
            const caption = (row.caption || '').toString().trim();
            return { id: i, images, caption, order };
          });
          // Sort by order asc, then stable by id
          mapped.sort((a, b) => (a.order - b.order) || (a.id - b.id));
          setItems(mapped);
          setStatus('ready');
        } catch (err) {
          console.error("Parsing error:", err);
          setErrorMsg('Problem parsing your sheet. Ensure headers are `imageUrl`, `caption`, `order`.');
          setStatus('error');
        }
      },
      error: (err) => {
        console.error("Fetch error:", err);
        setErrorMsg('Could not fetch the sheet. Check the CSV link and sharing settings.');
        setStatus('error');
      },
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images);
    setLightboxStartIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setLightboxStartIndex(0);
  };

  return (
    <div className="screen">
      <div className="gallery-wrap">
        <h1 className="gallery-title">A Walk Down Memory Lane 📸</h1>
        <p className="subtitle" style={{ textAlign: 'center', marginBottom: 22 }}>
          {status === 'loading' ? 'Loading memories...' : 'Click any photo to enlarge!'}
        </p>

        {status === 'error' && (
          <div className="error-box">
            <p>{errorMsg}</p>
            <button className="btn" onClick={loadData}>Retry</button>
          </div>
        )}

        {status === 'ready' && (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items.map((item, idx) => (
              <div className="pin" key={idx}>
                <div
                  className="pinterest-card"
                  onClick={() => openLightbox(item.images, 0)} // Open lightbox on card click
                >
                  {item.images.length > 1 ? (
                    <Slider {...embeddedSliderSettings} className="pinterest-slider">
                      {item.images.map((url, i) => (
                        <div key={i} className="slide">
                          <img loading="lazy" src={url} alt={`memory-${idx}-${i}`} />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <img loading="lazy" src={item.images[0]} alt={`memory-${idx}`} />
                  )}
                  {item.caption && (
                    <div className="pinterest-caption">
                      {item.caption}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Masonry>
        )}

        {/* --- CAKE BUTTON ADDED HERE --- */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '20px' }}>
          <Link to="/cake">
            <button className="btn">CAKE!!! 🎂</button>
          </Link>
        </div>
        {/* --- END CAKE BUTTON --- */}

      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxStartIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}