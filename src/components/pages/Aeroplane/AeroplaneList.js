import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirplanes } from '../../../store/aeroplane/aeroplanelist';
import { deleteAeroplane } from '../../../store/aeroplane/aeroplane';

const AeroplaneList = () => {
  const dispatch = useDispatch();
  const airplanes = useSelector((state) => state.aeroplaneslist.airplanes);
  const status = useSelector((state) => state.aeroplaneslist.status);

  useEffect(() => {
    dispatch(fetchAirplanes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const deleteResult = await dispatch(deleteAeroplane(id));
    if (deleteAeroplane.fulfilled.match(deleteResult)) {
      dispatch(fetchAirplanes());
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Unable to fetch airplanes</div>;
  }

  return (
    <div>
      <h2>Aeroplane List</h2>
      <ul>
        {airplanes.map((airplane) => (
          <li key={airplane.id}>
            {airplane.name}
            <button type="submit" onClick={() => handleDelete(airplane.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AeroplaneList;
