"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseGeocode = reverseGeocode;
const axios_1 = require("axios");
async function reverseGeocode(lat, lng) {
    const apiKey = process.env.OPENCAGE_API_KEY;
    if (!apiKey) {
        throw new Error('Missing OPENCAGE_API_KEY in environment variables.');
    }
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (!data.results?.length)
            return {};
        const components = data.results[0].components;
        console.log(components);
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
    }
    catch (error) {
        throw new Error('Reverse geocoding failed:', error);
    }
}
//# sourceMappingURL=reverseGeocode.js.map