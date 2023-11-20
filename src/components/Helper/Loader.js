import { FaSpinner } from 'react-icons/fa';


function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-backdrop"></div>
      <FaSpinner className="loader-spinner" size={50} />
    </div>
  );
}

export default Loader