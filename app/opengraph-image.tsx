import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RateKaro PK - Freelancer Rate Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0,245,196,0.15) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111118',
            border: '2px solid rgba(0,245,196,0.3)',
            borderRadius: '24px',
            padding: '60px 80px',
            boxShadow: '0 0 80px rgba(0,245,196,0.15)',
          }}
        >
          <h1 style={{ fontSize: '80px', fontWeight: 900, color: '#00F5C4', margin: 0, letterSpacing: '-0.05em' }}>
            RateKaro PK
          </h1>
          <p style={{ fontSize: '32px', color: '#8B8B9E', marginTop: '20px', textAlign: 'center', maxWidth: '800px' }}>
            Pakistan&apos;s First Freelancer Rate Intelligence Tool. Stop Guessing. Start Charging Right.
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
