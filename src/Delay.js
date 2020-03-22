const Delay = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, timeout)
  })

export default Delay
