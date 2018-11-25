export const formatDate = (dateStr) => {
    if (!dateStr) {
        return null;
    }
    return new Date(dateStr).toDateString();
}

export const getFirstImageLink = (multimedia) => {
    return (multimedia && multimedia[0] && `https://static01.nyt.com/${multimedia[0].url}`) || null;
}

export const requestJSON = async (link, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(link, options);
            const data = response.json();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}