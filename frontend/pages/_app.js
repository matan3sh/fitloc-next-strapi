import { AuthProvider } from 'context/AuthContext';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
