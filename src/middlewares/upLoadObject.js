export default (req, res, next) => {
    const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

    fetch(pcUrl)
        .then(async (res) => {
            req.pc = await res.json();
            return next();
        })
        .catch(err => {
            console.log('Чтото пошло не так:', err);
            return next();
        });

}