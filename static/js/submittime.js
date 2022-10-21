console.log("connected")
function submitTime (time, isFullGame) {
    axios
    .post(`https://young-plateau-94674.herokuapp.com/levels/${level}/times/`, {
        time
    }, {
        headers: {
            Authorization: `Token ${token}`
        },
    })

}