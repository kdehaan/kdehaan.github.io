import React from 'react';

function BookClub() {
  const externalURL = 'https://partiful.com/e/HArTqGv380oqMbzd0N7D';

  React.useEffect(() => {
    window.location.href = externalURL;
  }, []);

  return <div>Redirecting...</div>;
}

export default BookClub;