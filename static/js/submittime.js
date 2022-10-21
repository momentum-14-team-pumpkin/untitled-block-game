function submitTime (time, level) {
    axios
    .post(level
        ? `https://young-plateau-94674.herokuapp.com/levels/${level}/times/`
        : 'https://young-plateau-94674.herokuapp.com/full-run-times/', {
        time
    }, {
        headers: {
            Authorization: `Token ${config.userToken}`
        },
    })
}