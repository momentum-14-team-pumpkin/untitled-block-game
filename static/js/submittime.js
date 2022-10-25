function submitTime (time, level) {
    axios
    .post(level
        ? `https://blocks-of-time.herokuapp.com/levels/${level}/times/`
        : 'https://blocks-of-time.herokuapp.com/full-run-times/', {
        time
    }, {
        headers: {
            Authorization: `Token ${config.userToken}`
        },
    })
}