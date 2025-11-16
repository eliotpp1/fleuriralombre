export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>

      <style jsx>{`
        .loader-container {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          z-index: 9999;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 5px solid #ccc;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
