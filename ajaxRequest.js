export async function ajaxRequest(path) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = xhr.response;
                // console.log(data);
                resolve(data);
            } else {
                console.log(`Error: ${xhr.status}`);
                reject(`Error: ${xhr.status}`);
            }
        };
    })
}