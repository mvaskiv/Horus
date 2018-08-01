export function PostData(type, data) {
    let BaseURL = '/Matcha/public/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
