import axios from 'axios';

export async function reverseGeocode(lat: number, lng: number) {
  const apiKey = process.env.OPENCAGE_API_KEY; // Use OpenCage key
  if (!apiKey) {
    throw new Error('Missing OPENCAGE_API_KEY in environment variables.');
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data.results?.length) return {};

    const components = data.results[0].components;
    console.log(components)

    return {
      pincode: components.postcode ? parseInt(components.postcode) : null,
      city: components.city || components.town || components.village || '',
      state: components.state || '',
      country: components.country || '',
      street: components.road || components.neighbourhood || '',
      landmark: [components.road, components.neighbourhood, components.suburb]
        .filter(Boolean)
        .join(', ')
    };
    
  } catch (error) {
    throw new Error('Reverse geocoding failed:', error);
    
  }
}
