import config from '../config';
const { base_url, base_image_url, api_key } = config;
export const buildSearchURL = (query) => {
    return `${base_url}svc/search/v2/articlesearch.json?api-key=${api_key}${query}`
}
export const formatDate = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    return (new Date(dateStr.replace(/\+.*/g, ''))).toDateString();
}

export const getFirstImageLink = (multimedia) => {
    return (multimedia && multimedia[0] && `${base_image_url}${multimedia[0].url}`) || null;
}

export const requestJSON = async (query, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(buildSearchURL(query), options);
            const data = response.json();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}