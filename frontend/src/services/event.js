export const getEvents = async () => {
  const res = await axios.get('/events');
  return res.data;
};
export const createEvent = async (data, token) => {
  const res = await axios.post('/events', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
export const registerForEvent = async (eventId, token) => {
  const res = await axios.post(`/events/${eventId}/register`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
