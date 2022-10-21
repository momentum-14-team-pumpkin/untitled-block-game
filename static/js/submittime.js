function submitTime (time, isFullGame) {
    axios
    .get(`https://young-plateau-94674.herokuapp.com/user/level/${level}/times/`, {
        headers: {
            Authorization: `Token ${token}`
        },
    })
    .then((res) =>
    setUserBestTimesTotal(res.data.sort((a,b,c,d)=> {
        let timeTotal = a.time + b.time + c.time + d.time
        if (timeTotal != 0){
            return timeTotal
        }
        return 0   //TODO: use created time ??
    } 
    )))
}