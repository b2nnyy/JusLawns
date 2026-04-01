import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { neighborhoods, serviceAreaCenter, serviceNeighborhoods } from '../data/siteData';

export default function ServiceArea({ openModal }) {
  const pinIcon = useMemo(
    () =>
      L.divIcon({
        className: 'service-area__pin-icon',
        html: '<span class="service-area__pin-dot"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    [],
  );

  return (
    <section className="service-area section-padding" id="service-area">
      <div className="container service-area__grid">
        <div className="service-area__text">
          <p className="section-label">Service Area</p>
          <h2>Serving Philadelphia &amp; Surrounding Neighborhoods</h2>
          <p className="service-area__intro">
            We proudly serve homeowners across Philadelphia. If your neighborhood is listed
            below, we've likely already mowed a lawn near you.
          </p>

          <div className="service-area__list">
            {neighborhoods.map((n, i) => (
              <div key={i} className="service-area__item">
                <span className="service-area__arrow">→</span> {n}
              </div>
            ))}
          </div>

          <button className="btn btn-gold" onClick={openModal}>
            Check My Neighborhood
          </button>
        </div>

        <div className="service-area__map-col">
          <div className="service-area__map-frame">
            <MapContainer center={serviceAreaCenter} zoom={11} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceNeighborhoods.map((neighborhood) => (
                <Marker
                  key={neighborhood.name}
                  position={[neighborhood.lat, neighborhood.lng]}
                  icon={pinIcon}
                >
                  <Popup>
                    <strong>{neighborhood.name}</strong>
                    <br />
                    Active service neighborhood
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <p className="service-area__map-note">
            Pin locations show approximate neighborhood centers across our active service area.
          </p>
        </div>
      </div>

      <style>{`
        .service-area {
          background: var(--cream);
        }
        .service-area__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .service-area__text h2 {
          margin-bottom: 16px;
        }
        .service-area__intro {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .service-area__list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
          margin-bottom: 32px;
        }
        .service-area__item {
          font-size: 0.9rem;
          color: var(--text-body);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .service-area__arrow {
          color: var(--green-accent);
          font-weight: 700;
        }
        .service-area__map-frame {
          overflow: hidden;
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          aspect-ratio: 1;
        }
        .service-area__map-frame .leaflet-container {
          width: 100%;
          height: 100%;
        }
        .service-area__pin-dot {
          width: 18px;
          height: 18px;
          display: block;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: var(--gold);
          border: 2px solid #fff;
          box-shadow: 0 6px 18px rgba(26, 58, 31, 0.25);
        }
        .service-area__map-note {
          margin-top: 12px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .service-area__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .service-area__map-frame {
            aspect-ratio: 16 / 9;
          }
        }
        @media (max-width: 640px) {
          .service-area__list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
