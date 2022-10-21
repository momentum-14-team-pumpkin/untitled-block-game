function submitTime (time, level) {
    axios
    .post(`https://young-plateau-94674.herokuapp.com/levels/${level}/times/`, {
        time
    }, {
        headers: {
            Authorization: `Token ${config.userToken}`
        },
    }) .then(console.log)

}